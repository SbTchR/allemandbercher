import { mkdir, rm, writeFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const audit = JSON.parse(readFileSync('data/source-site-map.json', 'utf8'));
const CONTENT_ROOT = 'src/content';

const SECTION_MAP = {
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

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' et ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
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
      const lines = [`${indent}- url: ${quoteYaml(value.url)}`];
      if (value.label) lines.push(`${indent}  label: ${quoteYaml(value.label)}`);
      if (value.src) lines[0] = `${indent}- src: ${quoteYaml(value.src)}`;
      if (value.alt) lines.push(`${indent}  alt: ${quoteYaml(value.alt)}`);
      return lines.join('\n');
    })
    .join('\n')}`;
}

function description(page) {
  const firstLine = page.textePrincipalNettoye.split('\n').find((line) => line.length > 20);
  if (!firstLine) return '';
  return firstLine.length > 180 ? `${firstLine.slice(0, 177).trim()}...` : firstLine;
}

function bodyText(page) {
  const text = page.textePrincipalNettoye.trim();
  if (!text) return 'Contenu à reprendre manuellement depuis la page source.';
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => (line.startsWith('#') ? line.replace(/^#+\s*/, '') : line))
    .join('\n\n');
}

function orderFor(page) {
  const pathName = decodeURIComponent(new URL(page.url).pathname);
  const kMatch = pathName.match(/(?:kap-|k|kapitel-)(\d+)/i);
  if (kMatch) return Number(kMatch[1]);
  const levelMatch = pathName.match(/\/(9h|10h|11h)(?:\/)?$/i);
  if (levelMatch) return 0;
  return undefined;
}

function pageTypeFor(page) {
  if (page.sectionPrincipale === 'Théorie') return 'theorie';
  return page.typePageEstime;
}

function usefulImages(page) {
  return page.imagesDetectees
    .filter((image) => {
      return (
        image.url.includes('lh3.googleusercontent.com') &&
        !image.url.includes('fonts.googleapis.com') &&
        !image.url.includes('&#39;')
      );
    })
    .map(({ alt, url }) => ({ src: url, alt }));
}

function pathFor(page) {
  const section = SECTION_MAP[page.sectionPrincipale];
  if (!section) return null;

  if (section === 'exercices') {
    if (!page.sousSection || !['9H', '10H', '11H'].includes(page.sousSection)) return null;
    return path.join(CONTENT_ROOT, 'exercices', page.sousSection.toLowerCase(), `${basenameFromUrl(page.url)}.md`);
  }

  if (section === 'theorie') {
    const category = CATEGORY_MAP[page.sousSection] || 'general';
    return path.join(CONTENT_ROOT, 'theorie', category, `${basenameFromUrl(page.url)}.md`);
  }

  if (section === 'vocabulaire') {
    const level = ['9H', '10H', '11H'].includes(page.sousSection) ? page.sousSection.toLowerCase() : 'general';
    return path.join(CONTENT_ROOT, 'vocabulaire', level, `${basenameFromUrl(page.url)}.md`);
  }

  return path.join(CONTENT_ROOT, 'outils', `${basenameFromUrl(page.url)}.md`);
}

function frontmatter(page) {
  const section = SECTION_MAP[page.sectionPrincipale];
  const category = section === 'theorie' ? CATEGORY_MAP[page.sousSection] || 'general' : 'general';
  const level = ['9H', '10H', '11H'].includes(page.sousSection) ? page.sousSection : undefined;
  const notes = page.extraction.alertes ?? [];
  const order = orderFor(page);
  const links = page.liensExternesDetectes.map(({ label, url }) => ({ label, url }));
  const images = usefulImages(page);

  const lines = [
    '---',
    `title: ${quoteYaml(page.titre)}`,
    `description: ${quoteYaml(description(page))}`,
    `section: ${quoteYaml(section)}`,
  ];

  if (level) lines.push(`level: ${quoteYaml(level)}`);
  lines.push(`category: ${quoteYaml(category)}`);
  lines.push(`sourceUrl: ${quoteYaml(page.url)}`);
  lines.push(`pageType: ${quoteYaml(pageTypeFor(page))}`);
  if (order !== undefined) lines.push(`order: ${order}`);
  lines.push(`objectives: ${yamlList([], '  ')}`);
  lines.push(`externalLinks: ${yamlObjects(links, '  ')}`);
  lines.push(`images: ${yamlObjects(images, '  ')}`);
  lines.push(`migrationNotes: ${yamlList(notes, '  ')}`);
  lines.push('---');

  return lines.join('\n');
}

await rm(CONTENT_ROOT, { recursive: true, force: true });

let count = 0;
for (const page of audit.pages) {
  if (page.sectionPrincipale === 'Accueil' || page.sectionPrincipale === 'Conseils') continue;
  if (page.typePageEstime === 'index') continue;
  const sourceParts = decodeURIComponent(new URL(page.url).pathname).split('/').filter(Boolean);
  if (['/théorie', '/vocabulaire', '/outils-en-ligne'].includes(decodeURIComponent(new URL(page.url).pathname))) {
    continue;
  }
  if (page.sectionPrincipale === 'Théorie' && sourceParts.length <= 2) continue;
  if (page.sectionPrincipale === 'Vocabulaire' && sourceParts.length <= 2) continue;

  const filePath = pathFor(page);
  if (!filePath) continue;

  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${frontmatter(page)}\n\n${bodyText(page)}\n`);
  count += 1;
}

console.log(`Generated ${count} content files in ${CONTENT_ROOT}.`);
