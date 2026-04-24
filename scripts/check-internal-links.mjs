import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIST_DIR = 'dist';
const URL_MAP_PATH = 'url-map.json';
const REPORT_PATH = 'link-check-report.md';

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function htmlPathToRoute(filePath) {
  const rel = filePath.replace(`${DIST_DIR}/`, '');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.replace(/\/index\.html$/, '/')}`;
  return `/${rel}`;
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function internalUrl(rawUrl) {
  const value = decode(rawUrl).trim();
  if (!value || value.startsWith('#')) return null;
  if (/^(https?:)?\/\//i.test(value)) return null;
  if (/^(mailto|tel|javascript):/i.test(value)) return null;
  if (!value.startsWith('/')) return null;

  try {
    const parsed = new URL(value, 'https://www.allemandbercher.ch');
    return {
      pathname: decodeURIComponent(parsed.pathname),
      hash: parsed.hash ? decodeURIComponent(parsed.hash.slice(1)) : '',
      original: value,
    };
  } catch {
    return {
      pathname: value.split('#')[0].split('?')[0],
      hash: value.includes('#') ? value.split('#').at(-1) : '',
      original: value,
    };
  }
}

function distPathFor(pathname) {
  const cleanPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '');
  if (cleanPath === '/') return path.join(DIST_DIR, 'index.html');

  const withoutLeadingSlash = cleanPath.replace(/^\//, '');
  const directFile = path.join(DIST_DIR, withoutLeadingSlash);
  if (path.extname(withoutLeadingSlash)) return directFile;
  return path.join(DIST_DIR, withoutLeadingSlash, 'index.html');
}

function pageExists(pathname) {
  return existsSync(distPathFor(pathname));
}

function extractIds(html) {
  const ids = new Set();
  for (const match of html.matchAll(/\sid=["']([^"']+)["']/g)) {
    ids.add(decode(match[1]));
  }
  return ids;
}

function extractInternalLinks(html) {
  const links = [];
  for (const match of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    const link = internalUrl(match[1]);
    if (link) links.push(link);
  }
  return links;
}

const htmlFiles = walk(DIST_DIR).filter((file) => file.endsWith('.html'));
const pages = new Map();
const brokenLinks = [];
const checkedLinks = [];

for (const filePath of htmlFiles) {
  const html = readFileSync(filePath, 'utf8');
  pages.set(htmlPathToRoute(filePath), {
    filePath,
    ids: extractIds(html),
    links: extractInternalLinks(html),
  });
}

for (const [route, page] of pages) {
  for (const link of page.links) {
    const exists = pageExists(link.pathname);
    const targetPath = distPathFor(link.pathname);
    const targetRoute = link.pathname.endsWith('/') ? link.pathname : `${link.pathname}/`;
    const targetIds = pages.get(targetRoute)?.ids || pages.get(link.pathname)?.ids;
    const anchorOk = !link.hash || link.hash.length === 0 || targetIds?.has(link.hash);
    const ok = exists && anchorOk;

    checkedLinks.push({ from: route, to: link.original, ok });
    if (!ok) {
      brokenLinks.push({
        from: route,
        to: link.original,
        reason: exists ? `ancre #${link.hash} introuvable` : `cible absente (${targetPath})`,
      });
    }
  }
}

const urlMap = JSON.parse(readFileSync(URL_MAP_PATH, 'utf8'));
const brokenMappedTargets = urlMap.redirects
  .filter((entry) => !pageExists(entry.targetPath))
  .map((entry) => ({
    sourcePath: entry.sourcePath,
    targetPath: entry.targetPath,
    title: entry.title,
  }));

const report = `# Rapport de vérification des liens

Rapport généré le ${new Date().toISOString()}.

## Résumé

- Pages HTML vérifiées : ${htmlFiles.length}
- Liens internes vérifiés : ${checkedLinks.length}
- Liens internes cassés : ${brokenLinks.length}
- Cibles manquantes dans \`url-map.json\` : ${brokenMappedTargets.length}

## Liens internes cassés

${brokenLinks.length ? brokenLinks.map((link) => `- ${link.from} -> ${link.to} : ${link.reason}`).join('\n') : '- Aucun lien interne cassé détecté.'}

## Cibles de redirection manquantes

${brokenMappedTargets.length ? brokenMappedTargets.map((entry) => `- ${entry.sourcePath} -> ${entry.targetPath} (${entry.title})`).join('\n') : '- Toutes les cibles de \`url-map.json\` existent dans le build.'}

## Notes

- Les liens externes pédagogiques ne sont pas testés ici.
- Les anciennes URLs source sont sécurisées par \`url-map.json\` et la page \`404.html\`.
`;

await writeFile(REPORT_PATH, report);

console.log(`Checked ${checkedLinks.length} internal links across ${htmlFiles.length} HTML pages.`);
console.log(`Broken internal links: ${brokenLinks.length}.`);
console.log(`Missing mapped targets: ${brokenMappedTargets.length}.`);

if (brokenLinks.length || brokenMappedTargets.length) {
  process.exitCode = 1;
}
