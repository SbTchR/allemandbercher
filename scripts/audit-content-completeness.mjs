import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const SOURCE_PATH = 'data/source-site-map.json';
const URL_MAP_PATH = 'url-map.json';
const DIST_DIR = 'dist';
const REPORT_PATH = 'site-content-audit.md';
const SOURCE_CORRECTION_EXCLUSIONS = new Map([
  [
    'https://www.allemandbercher.ch/th%C3%A9orie/syntaxe/trotzdem-deshalb',
    [
      'Subordonnées',
      'trotzdem = malgré que',
      "Une subordonnée est une phrase qui se trouve à l'intérieur d'une autre phrase. Elle est liée à la phrase principale par un subordonnant.",
      'Contrairement à « und, aber, denn et also », ces subordonnant comptent pour une place dans la phrase. Ils sont donc suivi d’une inversion sujet-verbe pour respecter la la règle du verbe en 2ème position.',
    ],
  ],
  [
    'https://www.allemandbercher.ch/th%C3%A9orie/syntaxe/und-oder-aber-denn-also',
    [
      'Subordonnées',
      "Une subordonnée est une phrase qui se trouve à l'intérieur d'une autre phrase. Elle est liée à la phrase principale par un subordonnant.",
      'Les subordonnants suivants sont très utiles :',
      'Ils sont aussi très simples à utiliser car ils fonctionnent comme des points, ils ne comptent donc pas pour une position dans la phrase.',
      '⚠️ Les subordonnants « aber, denn et also » sont précédés d’une virgule !',
    ],
  ],
  [
    'https://www.allemandbercher.ch/th%C3%A9orie/grammaire/les-pr%C3%A9positions',
    [
      'Les autres prépositions sont mixtes, c’est-à-dire qu’elles sont parfois suivies du datif et parfois de l’accusatif.',
      'Il s’agit de toutes les autres prépositions. Dans ce tableau se trouvent les plus importantes, soit celles que tu dois connaître.',
      'Pour savoir s’il faut accorder le groupe nominal qui suit une de ces préposition à l’accusatif ou au datif, il faut se demander si le verbe implique un déplacement ou non.',
      'Elles sont suivies de l’accusatif quand elles sont utilisées avec un verbe de déplacement .',
      'Elles sont suivies du datif quand elles sont utilisées avec un verbe de position .',
      'être capable de définir si un verbe implique un déplacement ou non.',
    ],
  ],
]);

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
const sourceCorrectionResults = results.filter((result) => result.correctedSourceLines.length > 0);
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
  `- Pages avec correction pédagogique assumée du site source : ${sourceCorrectionResults.length}`,
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

lines.push('', '## Corrections pédagogiques du site source', '');
if (sourceCorrectionResults.length === 0) {
  lines.push('Aucune correction explicite du contenu source.');
} else {
  lines.push(
    'Ces lignes du site source ne sont pas attendues dans la nouvelle version, car elles contiennent une terminologie ou une règle grammaticale erronée. La page locale fournit la règle corrigée.',
    '',
  );
  for (const result of sourceCorrectionResults) {
    lines.push(`### ${result.title} (${result.section})`, '');
    lines.push(`- Source : ${result.sourceUrl}`);
    lines.push(`- Lignes volontairement remplacées : ${result.correctedSourceLines.map((line) => `\`${line}\``).join(' ; ')}`);
    lines.push('');
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
    correctedSourceLines: [],
    coverage: null,
    uncoveredLines: [],
  };

  if (!targetPath || !distPath || !existsSync(distPath)) {
    result.blockers.push('page cible absente');
    return result;
  }

  const html = readFileSync(distPath, 'utf8');
  const localText = htmlToText(html);
  const correctedSource = excludeCorrectedSourceLines(page.url, page.textePrincipalNettoye ?? '');
  result.correctedSourceLines = correctedSource.excluded;
  const coverage = computeCoverage(correctedSource.text, localText);
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

function excludeCorrectedSourceLines(sourceUrl, sourceText) {
  const excludedLines = SOURCE_CORRECTION_EXCLUSIONS.get(sourceUrl) ?? [];
  const excludedNormalized = new Set(excludedLines.map(normalizeText));
  const kept = [];
  const excluded = [];

  for (const line of sourceText.split('\n')) {
    if (excludedNormalized.has(normalizeText(line))) excluded.push(line.trim());
    else kept.push(line);
  }

  return { text: kept.join('\n'), excluded };
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
    const isSourceSite = parsed.hostname === 'allemandbercher.ch' || parsed.hostname.endsWith('.allemandbercher.ch');
    const isGoogle = parsed.hostname === 'google.com' || parsed.hostname.endsWith('.google.com');
    if (isSourceSite) return false;
    if (isGoogle && parsed.pathname.includes('reportabuse')) return false;
    return true;
  } catch {
    return false;
  }
}

function getRelevantSourceImages(page) {
  return (page.imagesDetectees ?? [])
    .map((image) => image.url ?? '')
    .filter(isRelevantSourceImage)
    .filter((url) => (sourceImageCounts.get(url) ?? 0) <= 4);
}

function isRelevantSourceImage(url) {
  if (!url) return false;
  if (url.includes('fonts.googleapis.com')) return false;
  if (!url.includes('googleusercontent.com')) return false;
  if (/=w16383(?:$|[&#])/.test(url)) return false;
  return true;
}

function countLocalPedagogicalImages(html) {
  const matches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)].map((match) => match[1]);
  const localImages = matches.filter(
    (src) => src.includes('/assets/source-site/') || src.includes('googleusercontent.com'),
  ).length;
  const markedReplacements = [...html.matchAll(/\bdata-source-image-replacement\b/gi)].length;
  return localImages + markedReplacements;
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

    if (
      (parsed.hostname === 'google.com' || parsed.hostname.endsWith('.google.com'))
      && parsed.pathname === '/url'
      && parsed.searchParams.get('q')
    ) {
      return canonicalizeUrl(parsed.searchParams.get('q'));
    }

    const isYouTube = parsed.hostname === 'youtube.com' || parsed.hostname.endsWith('.youtube.com');
    const isYouTuBe = parsed.hostname === 'youtu.be' || parsed.hostname.endsWith('.youtu.be');
    if (isYouTube || isYouTuBe) {
      const playlistId = parsed.searchParams.get('list');
      if (parsed.pathname === '/playlist' && playlistId) {
        return `https://youtube.com/playlist?list=${playlistId}`;
      }
      const videoId = isYouTuBe
        ? parsed.pathname.split('/').filter(Boolean)[0]
        : parsed.pathname.match(/^\/embed\/([^/]+)/)?.[1] ?? parsed.searchParams.get('v');
      return videoId ? `https://youtube.com/watch?v=${videoId}` : `${parsed.origin}${parsed.pathname}`;
    }

    if (parsed.hostname === 'drive.google.com') {
      const fileId = parsed.pathname.match(/^\/file\/d\/([^/]+)/)?.[1];
      if (fileId) return `https://drive.google.com/file/d/${fileId}`;
    }

    parsed.hash = '';
    if ((parsed.protocol === 'https:' || parsed.protocol === 'http:') && parsed.hostname.startsWith('www.')) {
      parsed.hostname = parsed.hostname.slice(4);
    }
    if ((parsed.protocol === 'https:' || parsed.protocol === 'http:') && parsed.pathname !== '/') {
      parsed.pathname = parsed.pathname.replace(/\/$/, '');
    }
    return parsed.toString();
  } catch {
    return decoded;
  }
}
