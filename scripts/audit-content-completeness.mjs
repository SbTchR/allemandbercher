import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SOURCE_PATH = 'data/source-site-map.json';
const URL_MAP_PATH = 'url-map.json';
const DIST_DIR = 'dist';
const REPORT_PATH = 'site-content-audit.md';

const sourceAudit = JSON.parse(readFileSync(SOURCE_PATH, 'utf8'));
const urlMap = JSON.parse(readFileSync(URL_MAP_PATH, 'utf8'));

const redirects = new Map(urlMap.redirects.map((entry) => [entry.sourceUrl, entry]));
const sourceImageCounts = new Map();

for (const page of sourceAudit.pages) {
  for (const image of page.imagesDetectees ?? []) {
    const url = image.url ?? '';
    if (!isRelevantSourceImage(url)) continue;
    sourceImageCounts.set(url, (sourceImageCounts.get(url) ?? 0) + 1);
  }
}

const results = sourceAudit.pages.map((page) => auditPage(page));
const blockingResults = results.filter((result) => result.blockers.length > 0);
const imageWarningResults = results.filter((result) => result.imageWarnings.length > 0);
const sections = new Map();

for (const result of results) {
  const section = result.section || 'Sans section';
  const item = sections.get(section) ?? { total: 0, ok: 0, blockers: 0, imageWarnings: 0 };
  item.total += 1;
  if (result.blockers.length === 0) item.ok += 1;
  if (result.blockers.length > 0) item.blockers += 1;
  if (result.imageWarnings.length > 0) item.imageWarnings += 1;
  sections.set(section, item);
}

const lines = [
  '# Audit contenu site complet',
  '',
  `Généré le ${new Date().toISOString()}.`,
  '',
  '## Résumé',
  '',
  `- Pages source vérifiées : ${results.length}`,
  `- Alertes bloquantes de contenu : ${blockingResults.length}`,
  `- Avertissements images à revoir visuellement : ${imageWarningResults.length}`,
  '- Contrôle bloquant : existence des pages cibles, couverture du texte principal, iframes/embeds intégrés et liens externes conservés.',
  '- Contrôle image : les images Google Sites récurrentes ou décoratives sont traitées comme avertissements, pas comme manque de contenu textuel.',
  '',
  '## Par section',
  '',
];

for (const [section, item] of [...sections.entries()].sort(([a], [b]) => a.localeCompare(b, 'fr'))) {
  lines.push(
    `- ${section}: ${item.ok}/${item.total} sans alerte bloquante, ${item.imageWarnings} avec avertissement image`,
  );
}

lines.push('', '## Alertes bloquantes', '');
if (blockingResults.length === 0) {
  lines.push('Aucune alerte bloquante détectée.');
} else {
  for (const result of blockingResults) {
    appendResult(lines, result, result.blockers);
  }
}

lines.push('', '## Avertissements images', '');
if (imageWarningResults.length === 0) {
  lines.push('Aucun avertissement image.');
} else {
  lines.push(
    'Ces points ne signalent pas un manque de texte, de lien ou d’exercice interactif. Ils indiquent seulement que la source Google Sites contient des images qui devront être arbitrées lors de la phase de finition visuelle.',
    '',
  );
  for (const result of imageWarningResults) {
    appendResult(lines, result, result.imageWarnings);
  }
}

lines.push('', '## Pages vérifiées', '');
for (const result of results) {
  const status = result.blockers.length > 0 ? 'À corriger' : 'OK';
  const imageSuffix = result.imageWarnings.length > 0 ? ' + image à revoir' : '';
  lines.push(`- [${status}${imageSuffix}] ${result.section} - ${result.title} -> ${result.targetPath ?? '(cible inconnue)'}`);
}

writeFileSync(REPORT_PATH, `${lines.join('\n')}\n`);
console.log(
  `wrote ${REPORT_PATH}: ${results.length} pages, ${blockingResults.length} blocking alerts, ${imageWarningResults.length} image warnings`,
);

function auditPage(page) {
  const redirect = redirects.get(page.url);
  const targetPath = redirect?.targetPath;
  const distPath = targetPath ? routeToDistPath(targetPath) : null;
  const result = {
    title: page.titre,
    section: page.sectionPrincipale,
    sourceUrl: page.url,
    targetPath,
    blockers: [],
    imageWarnings: [],
    coverage: null,
    uncoveredLines: [],
  };

  if (!targetPath || !distPath || !existsSync(distPath)) {
    result.blockers.push('page cible absente');
    return result;
  }

  const html = readFileSync(distPath, 'utf8');
  const localText = htmlToText(html);
  const coverage = computeCoverage(page.textePrincipalNettoye ?? '', localText);
  result.coverage = coverage;
  result.uncoveredLines = coverage.uncovered.slice(0, 4);

  if (coverage.total > 0 && coverage.ratio < 0.9) {
    result.blockers.push(`couverture texte ${Math.round(coverage.ratio * 100)}%`);
  }

  const missingEmbeds = getSourceEmbedUrls(page).filter((url) => !containsCanonicalUrl(html, url));
  if (missingEmbeds.length > 0) {
    result.blockers.push(`embeds manquants ${missingEmbeds.length}`);
  }

  const missingLinks = getRelevantExternalLinks(page).filter((url) => !containsCanonicalUrl(html, url));
  if (missingLinks.length > 0) {
    result.blockers.push(`liens externes manquants ${missingLinks.length}`);
  }

  const sourceImages = getRelevantSourceImages(page);
  const localImages = countLocalPedagogicalImages(html);
  const missingImageCount = Math.max(0, sourceImages.length - localImages);
  if (missingImageCount > 0) {
    result.imageWarnings.push(`images Google Sites possibles à arbitrer ${missingImageCount}`);
  }

  return result;
}

function appendResult(lines, result, alerts) {
  lines.push(`### ${result.title} (${result.section})`, '');
  lines.push(`- Source : ${result.sourceUrl}`);
  lines.push(`- Cible : ${result.targetPath ?? '(cible inconnue)'}`);
  lines.push(`- Alertes : ${alerts.join('; ')}`);
  if (result.coverage) {
    lines.push(`- Couverture texte : ${Math.round(result.coverage.ratio * 100)}% (${result.coverage.total} lignes source)`);
    if (result.uncoveredLines.length > 0) {
      lines.push(`- Exemples de lignes non retrouvées : ${result.uncoveredLines.map((line) => `\`${line}\``).join(' ; ')}`);
    }
  }
  lines.push('');
}

function routeToDistPath(route) {
  const cleanRoute = route === '/' ? '/' : route.replace(/\/$/, '');
  if (cleanRoute === '/') return path.join(DIST_DIR, 'index.html');
  return path.join(DIST_DIR, cleanRoute, 'index.html');
}

function htmlToText(html) {
  return normalizeText(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  );
}

function normalizeText(value) {
  return value
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[’]/g, "'")
    .replace(/[«»“”]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeForTokens(value) {
  return normalizeText(value)
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/www\.\S+/g, ' ')
    .replace(/[^\p{Letter}\p{Number}]+/gu, ' ')
    .trim();
}

function computeCoverage(sourceText, localText) {
  const lines = sourceText
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const local = normalizeText(localText);
  const localTokens = new Set(normalizeForTokens(localText).split(/\s+/).filter(Boolean));
  const covered = [];
  const uncovered = [];

  for (const line of lines) {
    const normalizedLine = normalizeText(line);
    if (!normalizedLine) continue;
    if (local.includes(normalizedLine)) {
      covered.push(line);
      continue;
    }

    const tokens = normalizeForTokens(line)
      .split(/\s+/)
      .filter((token) => token.length > 2);
    const present = tokens.filter((token) => localTokens.has(token)).length;
    const ratio = tokens.length === 0 ? 1 : present / tokens.length;
    if (ratio >= 0.78) covered.push(line);
    else uncovered.push(line);
  }

  const total = covered.length + uncovered.length;
  return {
    total,
    covered: covered.length,
    uncovered,
    ratio: total === 0 ? 1 : covered.length / total,
  };
}

function getSourceEmbedUrls(page) {
  const rawPath = page.extraction?.rawPath;
  if (!rawPath || !existsSync(rawPath)) return [];
  const raw = readFileSync(rawPath, 'utf8');
  return [...raw.matchAll(/<iframe[^>]+src=["']([^"']+)["']/gi)]
    .map((match) => match[1])
    .filter((url) => !url.includes('google.com/maps'))
    .filter((url) => !url.includes('gstatic.com/atari/embeds'));
}

function getRelevantExternalLinks(page) {
  return [...new Set((page.liensExternesDetectes ?? []).map((link) => link.url).filter(isRelevantExternalLink))];
}

function isRelevantExternalLink(url) {
  if (!url || url.includes('fonts.googleapis.com') || url.includes('Cookie Policy')) return false;
  try {
    const parsed = new URL(url.replace(/&amp;/g, '&'));
    if (parsed.hostname.includes('allemandbercher.ch')) return false;
    if (parsed.hostname.includes('google.com') && parsed.pathname.includes('reportabuse')) return false;
    return true;
  } catch {
    return false;
  }
}

function getRelevantSourceImages(page) {
  const images = (page.imagesDetectees ?? [])
    .map((image) => image.url ?? '')
    .filter(isRelevantSourceImage)
    .filter((url) => (sourceImageCounts.get(url) ?? 0) <= 4);
  return images.slice(1);
}

function isRelevantSourceImage(url) {
  if (!url) return false;
  if (url.includes('fonts.googleapis.com')) return false;
  if (!url.includes('googleusercontent.com')) return false;
  return true;
}

function countLocalPedagogicalImages(html) {
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((match) => match[1]);
  return matches.filter((src) => src.includes('/assets/source-site/') || src.includes('googleusercontent.com')).length;
}

function containsCanonicalUrl(html, url) {
  const canonical = canonicalizeUrl(url);
  if (!canonical) return false;
  const urls = [
    ...html.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi),
    ...html.matchAll(/\b(?:href|src)=&quot;([^&]+)&quot;/gi),
  ].map((match) => canonicalizeUrl(match[1]));
  return urls.includes(canonical);
}

function canonicalizeUrl(value) {
  if (!value) return null;
  const decoded = value
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&#x26;/gi, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
  try {
    const parsed = new URL(decoded);
    parsed.hash = '';
    if ((parsed.protocol === 'https:' || parsed.protocol === 'http:') && parsed.hostname.startsWith('www.')) {
      parsed.hostname = parsed.hostname.slice(4);
    }
    if ((parsed.protocol === 'https:' || parsed.protocol === 'http:') && parsed.pathname !== '/') {
      parsed.pathname = parsed.pathname.replace(/\/$/, '');
    }
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      parsed.search = '';
    }
    return parsed.toString();
  } catch {
    return decoded;
  }
}
