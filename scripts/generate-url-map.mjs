import { readFileSync, readdirSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const SOURCE_BASE = 'https://www.allemandbercher.ch';
const TARGET_BASE = 'https://www.allemandbercher.ch';
const AUDIT_PATH = 'data/source-site-map.json';
const OUT_PATH = 'url-map.json';

const audit = JSON.parse(readFileSync(AUDIT_PATH, 'utf8'));

function frontmatter(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([A-Za-z][A-Za-z0-9]*):\s*(.*)$/);
    if (!field) continue;
    const [, key, rawValue] = field;
    if (!rawValue || rawValue === '[]') continue;
    try {
      data[key] = JSON.parse(rawValue);
    } catch {
      data[key] = rawValue;
    }
  }
  return data;
}

function walkFiles(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walkFiles(fullPath));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(fullPath);
  }
  return files;
}

function normalizeSourcePath(url) {
  const parsed = new URL(url, SOURCE_BASE);
  const decoded = decodeURIComponent(parsed.pathname);
  return decoded === '' ? '/' : decoded.replace(/\/+$/, '') || '/';
}

function targetFromContentFile(filePath) {
  const rel = filePath.replace(/^src\/content\//, '').replace(/\.md$/, '');
  const parts = rel.split(path.sep);
  const collection = parts[0];
  const slug = parts.at(-1);

  if (collection === 'conseils') return `/conseils/${slug}/`;
  if (collection === 'exercices') return `/exercices/${parts[1]}/${slug}/`;
  if (collection === 'theorie') return `/theorie/${parts[1]}/${slug}/`;
  if (collection === 'vocabulaire') return `/vocabulaire/${parts[1]}/${slug}/`;
  if (collection === 'outils') return `/outils-en-ligne/${slug}/`;
  return null;
}

function indexTarget(sourcePath) {
  if (sourcePath === '/') return '/';
  if (sourcePath === '/accueil') return '/';
  if (sourcePath === '/conseils') return '/conseils/';
  if (sourcePath === '/exercices') return '/exercices/';
  if (/^\/exercices\/(9h|10h|11h)$/i.test(sourcePath)) return `${sourcePath.toLowerCase()}/`;
  if (sourcePath === '/outils-en-ligne') return '/outils-en-ligne/';
  if (sourcePath === '/théorie') return '/theorie/';
  if (sourcePath === '/théorie/grammaire') return '/theorie/grammaire/';
  if (sourcePath === '/théorie/syntaxe') return '/theorie/syntaxe/';
  if (sourcePath === '/théorie/conjugaison') return '/theorie/conjugaison/';
  if (sourcePath === '/vocabulaire') return '/vocabulaire/';
  if (/^\/vocabulaire\/(9h|10h|11h)$/i.test(sourcePath)) return `${sourcePath.toLowerCase()}/`;
  return null;
}

function equivalentWithoutSlash(a, b) {
  return a.replace(/\/+$/, '') === b.replace(/\/+$/, '');
}

function notesFor(sourcePath, targetPath) {
  const notes = [];
  if (sourcePath === '/accueil' && targetPath === '/') {
    notes.push('ancienne page accueil fusionnée avec la racine');
  }
  if (sourcePath.includes('é') || sourcePath.includes('è') || sourcePath.includes('ä') || sourcePath.includes('ü')) {
    notes.push('slug simplifié sans accents pour URL propre');
  }
  if (!equivalentWithoutSlash(sourcePath, targetPath)) {
    notes.push('chemin cible différent documenté');
  }
  if (targetPath.endsWith('/')) notes.push('slash final normalisé par Astro');
  return [...new Set(notes)];
}

const contentBySource = new Map();
for (const filePath of walkFiles('src/content')) {
  const data = frontmatter(filePath);
  if (!data.sourceUrl) continue;
  contentBySource.set(normalizeSourcePath(data.sourceUrl), {
    targetPath: targetFromContentFile(filePath),
    filePath,
  });
}

const redirects = [];
const unmappedSourceUrls = [];
const seenTargets = new Set();

for (const page of audit.pages) {
  const sourcePath = normalizeSourcePath(page.url);
  const contentMatch = contentBySource.get(sourcePath);
  const targetPath = contentMatch?.targetPath || indexTarget(sourcePath);

  if (!targetPath) {
    unmappedSourceUrls.push({
      sourceUrl: page.url,
      sourcePath,
      title: page.titre,
      reason: 'aucune cible déterminée automatiquement',
    });
    continue;
  }

  seenTargets.add(targetPath);
  redirects.push({
    sourceUrl: page.url,
    sourcePath,
    title: page.titre,
    targetPath,
    targetUrl: `${TARGET_BASE}${targetPath}`,
    status: equivalentWithoutSlash(sourcePath, targetPath) ? 200 : 301,
    action: equivalentWithoutSlash(sourcePath, targetPath) ? 'keep' : 'redirect',
    notes: notesFor(sourcePath, targetPath),
  });
}

redirects.sort((a, b) => a.sourcePath.localeCompare(b.sourcePath, 'fr'));

const urlMap = {
  generatedAt: new Date().toISOString(),
  sourceBase: SOURCE_BASE,
  targetBase: TARGET_BASE,
  summary: {
    sourceUrls: audit.pages.length,
    mappedUrls: redirects.length,
    unmappedUrls: unmappedSourceUrls.length,
    keptUrls: redirects.filter((entry) => entry.action === 'keep').length,
    redirectedUrls: redirects.filter((entry) => entry.action === 'redirect').length,
    simplifiedSlugs: redirects.filter((entry) => entry.notes.includes('slug simplifié sans accents pour URL propre')).length,
  },
  strategy: {
    hosting: 'GitHub Pages static site',
    redirectMechanism: 'La page 404 Astro embarque cette carte et redirige côté client les anciennes URLs connues.',
    slugPolicy: 'Conserver les slugs source quand ils sont déjà propres; supprimer les accents quand une URL doit être simplifiée; ajouter le slash final Astro.',
    duplicatePolicy: 'Les pages index sont générées une seule fois dans leur catégorie; les anciennes pages /chapitres ont été supprimées car elles ne viennent pas du site source.',
  },
  redirects,
  unmappedSourceUrls,
  mappedTargetPaths: [...seenTargets].sort(),
};

await writeFile(OUT_PATH, `${JSON.stringify(urlMap, null, 2)}\n`);
console.log(`Wrote ${OUT_PATH}: ${redirects.length} mapped URLs, ${unmappedSourceUrls.length} unmapped.`);
