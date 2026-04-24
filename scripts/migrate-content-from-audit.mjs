import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const audit = JSON.parse(readFileSync('data/source-site-map.json', 'utf8'));
const CONTENT_ROOT = 'src/content';
const IMAGE_ROOT = 'public/assets/source-site/images';
const IMAGE_PUBLIC_ROOT = '/assets/source-site/images';
const LOG_PATH = 'migration-log.md';

const SECTION_MAP = {
  Conseils: 'conseils',
  Exercices: 'exercices',
  Théorie: 'theorie',
  Vocabulaire: 'vocabulaire',
  'Outils en ligne': 'outils',
};

const CATEGORY_MAP = {
  Grammaire: 'grammaire',
  Syntaxe: 'syntaxe',
  Conjugaison: 'conjugaison',
};

const headingLevel2 = new Set([
  'Objectifs',
  'Communication',
  'Langue',
  'Expression',
  'Exercice',
  'Exercices',
  'Grammaire',
  'Syntaxe',
  'Conjugaison',
  'Vocabulaire',
  'Quizlet',
  'Gimkit',
  'Blooket',
  'Contact',
  'Echanges linguistiques cantonaux (hors partenariat avec Brugg)',
  'Échanges linguistiques cantonaux (hors partenariat avec Brugg)',
]);

const headingPrefixes = [
  'Théorie ',
  'Quelques ',
  'Nouvelle application',
  'Am ',
  'Sich ',
  'Les ',
  'Le ',
  'La ',
];

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' et ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function sourceParts(page) {
  return decodeURIComponent(new URL(page.url).pathname).split('/').filter(Boolean);
}

function basenameFromUrl(url) {
  const parts = decodeURIComponent(new URL(url).pathname).split('/').filter(Boolean);
  return slugify(parts.at(-1) || 'accueil');
}

function quoteYaml(value) {
  return JSON.stringify(value ?? '');
}

function yamlList(values, indent = '') {
  if (!values || values.length === 0) return '[]';
  return `\n${values.map((value) => `${indent}- ${quoteYaml(value)}`).join('\n')}`;
}

function yamlObjects(values, indent = '') {
  if (!values || values.length === 0) return '[]';
  return `\n${values
    .map((value) => {
      const primaryKey = value.src ? 'src' : 'url';
      const lines = [`${indent}- ${primaryKey}: ${quoteYaml(value[primaryKey])}`];
      if (value.label) lines.push(`${indent}  label: ${quoteYaml(value.label)}`);
      if (value.alt) lines.push(`${indent}  alt: ${quoteYaml(value.alt)}`);
      return lines.join('\n');
    })
    .join('\n')}`;
}

function isPlainUrl(line) {
  return /^https?:\/\/\S+$/i.test(line.trim()) || /^www\.[^\s]+$/i.test(line.trim());
}

function usefulImages(page) {
  return page.imagesDetectees.filter((image) => {
    return (
      image.url.includes('lh3.googleusercontent.com') &&
      !image.url.includes('fonts.googleapis.com') &&
      !image.url.includes('&#39;')
    );
  });
}

function pageTypeFor(page) {
  if (page.sectionPrincipale === 'Théorie') return 'theorie';
  return page.typePageEstime;
}

function orderFor(page) {
  const pathName = decodeURIComponent(new URL(page.url).pathname);
  const kMatch = pathName.match(/(?:kap-|k|kapitel-)(\d+)/i);
  if (kMatch) return Number(kMatch[1]);
  return undefined;
}

function collectionFor(page) {
  return SECTION_MAP[page.sectionPrincipale] || null;
}

function shouldCreateContentPage(page) {
  const collection = collectionFor(page);
  if (!collection) return false;
  if (page.sectionPrincipale === 'Accueil') return false;
  if (page.typePageEstime === 'index') return false;

  const parts = sourceParts(page);
  if (page.sectionPrincipale === 'Théorie' && parts.length <= 2) return false;
  if (page.sectionPrincipale === 'Vocabulaire' && parts.length <= 2) return false;
  if (page.sectionPrincipale === 'Outils en ligne' && parts[0] === 'outils-en-ligne') return false;
  return true;
}

function pathFor(page) {
  const collection = collectionFor(page);
  if (!collection) return null;

  if (collection === 'conseils') {
    return path.join(CONTENT_ROOT, 'conseils', `${basenameFromUrl(page.url)}.md`);
  }

  if (collection === 'exercices') {
    const level = page.sousSection;
    if (!['9H', '10H', '11H'].includes(level)) return null;
    return path.join(CONTENT_ROOT, 'exercices', level.toLowerCase(), `${basenameFromUrl(page.url)}.md`);
  }

  if (collection === 'theorie') {
    const category = CATEGORY_MAP[page.sousSection] || 'general';
    return path.join(CONTENT_ROOT, 'theorie', category, `${basenameFromUrl(page.url)}.md`);
  }

  if (collection === 'vocabulaire') {
    const level = ['9H', '10H', '11H'].includes(page.sousSection) ? page.sousSection.toLowerCase() : 'general';
    return path.join(CONTENT_ROOT, 'vocabulaire', level, `${basenameFromUrl(page.url)}.md`);
  }

  return path.join(CONTENT_ROOT, 'outils', `${basenameFromUrl(page.url)}.md`);
}

function description(page) {
  const lines = page.textePrincipalNettoye
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && line !== page.titre && !isPlainUrl(line));
  const firstLine = lines.find((line) => line.length > 18) || '';
  return firstLine.length > 180 ? `${firstLine.slice(0, 177).trim()}...` : firstLine;
}

function extractObjectives(lines, page) {
  if (page.sectionPrincipale !== 'Exercices') return [];
  const start = lines.findIndex((line) => line.toLowerCase().includes("l'élève est capable"));
  if (start === -1) return [];

  const objectives = [];
  for (let index = start + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line || isPlainUrl(line)) continue;
    if (['Expression', 'Exercice', 'Exercices'].includes(line)) break;
    if (headingLevel2.has(line) && !['Communication', 'Langue'].includes(line)) break;
    if (line.length > 140) break;
    if (!['Communication', 'Langue'].includes(line)) objectives.push(line.replace(/\.$/, ''));
  }
  return [...new Set(objectives)].slice(0, 10);
}

function isHeading(line) {
  if (headingLevel2.has(line)) return true;
  if (headingPrefixes.some((prefix) => line.startsWith(prefix)) && line.length <= 90) return true;
  return false;
}

function markdownBody(page) {
  const lines = page.textePrincipalNettoye
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const body = [];
  let listMode = false;

  for (const line of lines) {
    if (line === page.titre || line === 'Allemandbercher.ch') continue;
    if (isPlainUrl(line)) continue;

    if (isHeading(line)) {
      body.push(`\n## ${line}`);
      listMode = false;
      continue;
    }

    if (line.toLowerCase().includes("l'élève est capable")) {
      body.push(line);
      listMode = true;
      continue;
    }

    if (listMode && line.length <= 140 && !line.endsWith(':')) {
      body.push(`- ${line.replace(/\.$/, '')}`);
      continue;
    }

    listMode = false;
    body.push(line);
  }

  const cleaned = body.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();
  return cleaned || 'Contenu à reprendre manuellement depuis la page source.';
}

function requestSizedImage(url) {
  return url.replace(/=w\d+(?:-h\d+)?(?:-[a-z]+)?$/i, '=w1400');
}

async function downloadImage(image, page, index, cache, logEntry) {
  const hash = createHash('sha1').update(image.url).digest('hex').slice(0, 10);
  if (cache.has(image.url)) return cache.get(image.url);

  const baseName = `${slugify(page.titre || basenameFromUrl(page.url))}-${index + 1}-${hash}.webp`;
  const outputPath = path.join(IMAGE_ROOT, baseName);
  const publicPath = `${IMAGE_PUBLIC_ROOT}/${baseName}`;

  if (existsSync(outputPath)) {
    cache.set(image.url, publicPath);
    return publicPath;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    const response = await fetch(requestSizedImage(image.url), {
      headers: { 'user-agent': 'allemandbercher-migration/1.0' },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    await sharp(buffer)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    cache.set(image.url, publicPath);
    return publicPath;
  } catch (error) {
    logEntry.imageFailures.push(`${image.url} (${error.message})`);
    return null;
  }
}

async function migratedImages(page, cache, logEntry) {
  const images = [];
  for (const [index, image] of usefulImages(page).entries()) {
    const src = await downloadImage(image, page, index, cache, logEntry);
    if (src) {
      images.push({
        src,
        alt: image.alt || `Image issue de la page ${page.titre}`,
      });
    }
  }
  return images;
}

function externalLinks(page) {
  const fromAudit = page.liensExternesDetectes.map(({ label, url }) => ({ label, url }));
  const urlsInText = page.textePrincipalNettoye
    .split('\n')
    .map((line) => line.trim())
    .filter(isPlainUrl)
    .map((line) => ({ url: line.startsWith('www.') ? `https://${line}` : line }));

  const links = new Map();
  for (const link of [...fromAudit, ...urlsInText]) {
    if (!link.url.startsWith('http')) continue;
    if (!links.has(link.url)) links.set(link.url, link);
  }
  return [...links.values()].sort((a, b) => a.url.localeCompare(b.url));
}

function migrationNotes(page, body) {
  const notes = [...(page.extraction.alertes || [])];
  if (body.length < 180) notes.push('à vérifier: contenu extrait très court ou probablement incomplet');
  return [...new Set(notes)];
}

function frontmatter(page, images, objectives, notes) {
  const collection = collectionFor(page);
  const category = collection === 'theorie' ? CATEGORY_MAP[page.sousSection] || 'general' : 'general';
  const level = ['9H', '10H', '11H'].includes(page.sousSection) ? page.sousSection : undefined;
  const order = orderFor(page);

  const lines = [
    '---',
    `title: ${quoteYaml(page.titre)}`,
    `description: ${quoteYaml(description(page))}`,
    `section: ${quoteYaml(collection)}`,
  ];

  if (level) lines.push(`level: ${quoteYaml(level)}`);
  lines.push(`category: ${quoteYaml(category)}`);
  lines.push(`sourceUrl: ${quoteYaml(page.url)}`);
  lines.push(`pageType: ${quoteYaml(pageTypeFor(page))}`);
  if (order !== undefined) lines.push(`order: ${order}`);
  lines.push(`objectives: ${yamlList(objectives, '  ')}`);
  lines.push(`externalLinks: ${yamlObjects(externalLinks(page), '  ')}`);
  lines.push(`images: ${yamlObjects(images, '  ')}`);
  lines.push(`migrationNotes: ${yamlList(notes, '  ')}`);
  lines.push('---');

  return lines.join('\n');
}

function finalUrlFor(filePath) {
  const rel = filePath.replace(`${CONTENT_ROOT}/`, '').replace(/\.md$/, '');
  const [collection, ...rest] = rel.split(path.sep);
  const slug = rest.at(-1);

  if (collection === 'conseils') return `/conseils/${slug}/`;
  if (collection === 'exercices') return `/exercices/${rest[0]}/${slug}/`;
  if (collection === 'theorie') return `/theorie/${rest[0]}/${slug}/`;
  if (collection === 'vocabulaire') return `/vocabulaire/${rest[0]}/${slug}/`;
  if (collection === 'outils') return `/outils-en-ligne/${slug}/`;
  return '';
}

function logMarkdown(records, skipped, imageCount, imageFailures) {
  const finalized = records.filter((record) => record.status === 'finalisée');
  const review = records.filter((record) => record.status === 'à vérifier');

  return `# Journal de migration

Migration générée le ${new Date().toISOString()} à partir de \`data/source-site-map.json\`.

## Résumé

- Pages migrées en Markdown : ${records.length}
- Pages finalisées automatiquement : ${finalized.length}
- Pages à revoir manuellement : ${review.length}
- Images téléchargées ou réutilisées localement : ${imageCount}
- Téléchargements d’images à vérifier : ${imageFailures}
- Pages source non migrées comme fiches : ${skipped.length}

## Pages finalisées

${finalized.length ? finalized.map((record) => `- ${record.title} - ${record.targetUrl} (source: ${record.sourceUrl})`).join('\n') : '- Aucune page finalisée automatiquement.'}

## Pages à revoir manuellement

${review.length ? review.map((record) => `- ${record.title} - ${record.targetUrl} : ${record.notes.join('; ')}`).join('\n') : '- Aucune page marquée à vérifier.'}

## Images à télécharger manuellement

${records
  .filter((record) => record.imageFailures.length > 0)
  .map((record) => `- ${record.title} - ${record.targetUrl} : ${record.imageFailures.length} image(s) non récupérée(s)`)
  .join('\n') || '- Aucune image manquante.'}

## Pages non migrées comme fiches

${skipped.map((record) => `- ${record.title} - ${record.sourceUrl} : ${record.reason}`).join('\n')}

## Détails page par page

${records
  .map((record) => {
    return `### ${record.title}

- Source : ${record.sourceUrl}
- Page Astro : ${record.targetUrl}
- Statut : ${record.status}
- Fichier : \`${record.filePath}\`
- Liens externes : ${record.externalLinks}
- Images locales : ${record.images}
- Images non récupérées : ${record.imageFailures.length}
${record.imageFailures.length ? record.imageFailures.map((failure) => `  - ${failure}`).join('\n') : ''}
- Notes : ${record.notes.length ? record.notes.join('; ') : 'aucune'}
`;
  })
  .join('\n')}
`;
}

await rm(CONTENT_ROOT, { recursive: true, force: true });
await rm(IMAGE_ROOT, { recursive: true, force: true });
await mkdir(IMAGE_ROOT, { recursive: true });

const imageCache = new Map();
const records = [];
const skipped = [];
let imageCount = 0;
let imageFailures = 0;

for (const page of audit.pages) {
  if (!shouldCreateContentPage(page)) {
    skipped.push({
      title: page.titre || '(sans titre)',
      sourceUrl: page.url,
      reason: page.sectionPrincipale === 'Accueil' ? 'accueil traité dans la page Astro principale' : 'page index traitée par une route Astro',
    });
    continue;
  }

  const filePath = pathFor(page);
  if (!filePath) continue;

  const logEntry = { imageFailures: [] };
  const lines = page.textePrincipalNettoye.split('\n').map((line) => line.trim()).filter(Boolean);
  const body = markdownBody(page);
  const objectives = extractObjectives(lines, page);
  const images = await migratedImages(page, imageCache, logEntry);
  const notes = migrationNotes(page, body);
  const status = notes.length ? 'à vérifier' : 'finalisée';

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${frontmatter(page, images, objectives, notes)}\n\n${body}\n`);

  imageCount += images.filter((image) => image.src.startsWith(IMAGE_PUBLIC_ROOT)).length;
  imageFailures += logEntry.imageFailures.length;

  records.push({
    title: page.titre || '(sans titre)',
    sourceUrl: page.url,
    targetUrl: finalUrlFor(filePath),
    filePath,
    status,
    notes,
    externalLinks: externalLinks(page).length,
    images: images.length,
    imageFailures: logEntry.imageFailures,
  });
}

await writeFile(LOG_PATH, logMarkdown(records, skipped, imageCount, imageFailures));

console.log(`Migrated ${records.length} pages.`);
console.log(`Finalized ${records.filter((record) => record.status === 'finalisée').length} pages.`);
console.log(`Marked ${records.filter((record) => record.status === 'à vérifier').length} pages for review.`);
console.log(`Downloaded or reused ${imageCount} local images.`);
