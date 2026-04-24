import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const START_URL = 'https://www.allemandbercher.ch/';
const ORIGIN = new URL(START_URL).origin;
const RAW_DIR = 'raw/source-site';
const HTML_DIR = path.join(RAW_DIR, 'html');
const OUT_JSON = 'data/source-site-map.json';
const OUT_REPORT = 'migration-audit.md';
const MAX_PAGES = 250;
const REQUEST_DELAY_MS = 650;
const USER_AGENT = 'allemandbercher-migration-audit/1.0 (+https://www.allemandbercher.ch)';

const PARASITE_TEXT = [
  'Google Sites',
  'Report abuse',
  'This site uses cookies from Google to deliver its services and to analyze traffic.',
  'Information about your use of this site is shared with Google.',
  'Cookie Policy',
  'Reject',
  'Accept',
  'Open search bar',
  'Site actions',
  'The page you have entered does not exist',
  'Go to site home',
];

const PARASITE_HOSTS = [
  'accounts.google.com',
  'csp.withgoogle.com',
  'policies.google.com',
  'support.google.com',
  'www.google.com',
  'sites.google.com',
  'ssl.gstatic.com',
  'www.gstatic.com',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

function stripTags(html) {
  return decodeEntities(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/(p|div|li|h[1-6]|section|article)>/gi, '\n')
      .replace(/<[^>]+>/g, ' ')
  );
}

function normalizeLines(text) {
  const lines = stripTags(text)
    .split('\n')
    .map((line) => line.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .filter((line) => !PARASITE_TEXT.some((phrase) => line.includes(phrase)));

  return [...new Set(lines)].join('\n');
}

function extractMainHtml(html) {
  const start = html.search(/<div[^>]+jsname="ZBtY8b"/i);
  if (start === -1) return html;

  const afterMain = html.slice(start);
  const endMatch = afterMain.search(/<div[^>]+data-is-preview="false"|<div[^>]+class="Xpil1b/i);
  if (endMatch === -1) return afterMain;
  return afterMain.slice(0, endMatch);
}

function extractTitle(html, mainHtml) {
  const h1 = mainHtml.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1) return normalizeLines(h1[1]).split('\n')[0] || '';

  const docTitle = html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i);
  if (!docTitle) return '';

  return normalizeLines(docTitle[1])
    .replace(/^Allemand\s*[-–]\s*/i, '')
    .trim();
}

function extractAttributes(tagHtml) {
  const attrs = {};
  for (const match of tagHtml.matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/g)) {
    attrs[match[1].toLowerCase()] = decodeEntities(match[3] ?? match[4] ?? match[5] ?? '');
  }
  return attrs;
}

function normalizeInternalUrl(rawUrl, baseUrl) {
  try {
    const parsed = new URL(rawUrl, baseUrl);
    if (parsed.origin !== ORIGIN) return null;
    if (parsed.pathname.startsWith('/_/')) return null;
    if (/\.(css|js|png|jpg|jpeg|gif|svg|webp|ico|pdf|zip)$/i.test(parsed.pathname)) return null;
    parsed.hash = '';
    parsed.search = '';
    const pathname = parsed.pathname === '/' ? '/' : parsed.pathname.replace(/\/+$/, '');
    return `${ORIGIN}${pathname}`;
  } catch {
    return null;
  }
}

function isExternalContentUrl(rawUrl, baseUrl) {
  try {
    const parsed = new URL(rawUrl, baseUrl);
    if (parsed.origin === ORIGIN) return false;
    if (PARASITE_HOSTS.some((host) => parsed.hostname === host || parsed.hostname.endsWith(`.${host}`))) {
      return false;
    }
    if (/^javascript:|^mailto:|^tel:/i.test(rawUrl)) return false;
    return true;
  } catch {
    return false;
  }
}

function extractLinks(html, baseUrl, scopeHtml = html) {
  const internal = new Set();
  const external = new Map();

  for (const match of scopeHtml.matchAll(/<(a|iframe)\b[^>]*>/gi)) {
    const tag = match[0];
    const attrs = extractAttributes(tag);
    const raw = attrs.href || attrs.src;
    if (!raw) continue;

    const internalUrl = normalizeInternalUrl(raw, baseUrl);
    if (internalUrl) {
      internal.add(internalUrl);
      continue;
    }

    if (isExternalContentUrl(raw, baseUrl)) {
      const parsed = new URL(raw, baseUrl);
      parsed.hash = '';
      const url = parsed.toString();
      const label = normalizeLines(tag).replace(/\n/g, ' ').trim();
      if (!external.has(url)) {
        external.set(url, {
          url,
          label,
          sourceTag: match[1].toLowerCase(),
        });
      }
    }
  }

  return {
    internal: [...internal].sort(),
    external: [...external.values()].sort((a, b) => a.url.localeCompare(b.url)),
  };
}

function extractImages(mainHtml, baseUrl) {
  const images = new Map();

  for (const match of mainHtml.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = extractAttributes(match[0]);
    const raw = attrs.src || attrs['data-src'];
    if (!raw) continue;
    try {
      const url = new URL(raw, baseUrl).toString();
      images.set(url, {
        url,
        alt: attrs.alt || '',
        title: attrs.title || '',
        width: attrs.width || '',
        height: attrs.height || '',
      });
    } catch {
      // Ignore malformed image references from generated Google markup.
    }
  }

  for (const match of mainHtml.matchAll(/url\((['"]?)(.*?)\1\)/gi)) {
    const raw = match[2];
    if (!raw || raw.startsWith('data:')) continue;
    try {
      const url = new URL(raw, baseUrl).toString();
      if (!images.has(url)) {
        images.set(url, {
          url,
          alt: '',
          title: '',
          width: '',
          height: '',
        });
      }
    } catch {
      // Ignore malformed CSS image references.
    }
  }

  return [...images.values()].sort((a, b) => a.url.localeCompare(b.url));
}

function wordsFromSlug(slug) {
  const text = decodeURIComponent(slug)
    .replace(/[-_]+/g, ' ')
    .trim()
    .toLocaleLowerCase('fr');

  if (!text) return '';
  return `${text.charAt(0).toLocaleUpperCase('fr')}${text.slice(1)}`;
}

function classify(url, title) {
  const pathname = decodeURIComponent(new URL(url).pathname).replace(/^\/+|\/+$/g, '');
  const parts = pathname ? pathname.split('/') : [];
  const first = parts[0] || '';
  const second = parts[1] || '';

  let sectionPrincipale = 'Autre';
  let sousSection = '';
  let typePage = 'autre';

  if (first === 'accueil') {
    sectionPrincipale = 'Accueil';
    typePage = 'accueil';
  } else if (!first) {
    sectionPrincipale = 'Accueil';
    typePage = 'accueil';
  } else if (first === 'conseils') {
    sectionPrincipale = 'Conseils';
    sousSection = second ? wordsFromSlug(second) : '';
    typePage = second ? 'autre' : 'index';
  } else if (first === 'exercices') {
    sectionPrincipale = 'Exercices';
    sousSection = second ? second.toUpperCase() : '';
    typePage = parts.length >= 3 ? 'chapitre' : 'index';
  } else if (first === 'théorie' || first === 'theorie') {
    sectionPrincipale = 'Théorie';
    sousSection = second ? wordsFromSlug(second) : '';
    typePage = 'théorie';
  } else if (first === 'vocabulaire') {
    sectionPrincipale = 'Vocabulaire';
    sousSection = second ? second.toUpperCase() : '';
    typePage = 'vocabulaire';
  } else if (first === 'outils-en-ligne') {
    sectionPrincipale = 'Outils en ligne';
    typePage = 'outils';
  } else if (first === 'nad-maschine') {
    sectionPrincipale = 'Outils en ligne';
    sousSection = 'NAD-Maschine';
    typePage = 'outils';
  }

  if (!sousSection && typePage === 'chapitre') {
    sousSection = title;
  }

  return { sectionPrincipale, sousSection, typePage };
}

function safeName(url) {
  const parsed = new URL(url);
  const name = parsed.pathname === '/' ? 'root' : decodeURIComponent(parsed.pathname).replace(/^\/+/, '').replace(/\/+/g, '__');
  return `${name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-')}.html`;
}

async function fetchPage(url) {
  const response = await fetch(url, {
    headers: {
      'user-agent': USER_AGENT,
      accept: 'text/html,application/xhtml+xml',
    },
    redirect: 'follow',
  });
  const html = await response.text();
  return {
    finalUrl: response.url,
    status: response.status,
    contentType: response.headers.get('content-type') || '',
    html,
  };
}

function buildReport(siteMap, fetchLog) {
  const pages = siteMap.pages;
  const allExternal = new Map();
  const allImages = new Map();

  for (const page of pages) {
    for (const link of page.liensExternesDetectes) {
      if (!allExternal.has(link.url)) allExternal.set(link.url, { ...link, pages: [] });
      allExternal.get(link.url).pages.push(page.url);
    }
    for (const image of page.imagesDetectees) {
      if (!allImages.has(image.url)) allImages.set(image.url, { ...image, pages: [] });
      allImages.get(image.url).pages.push(page.url);
    }
  }

  const difficultPages = pages.filter((page) => page.extraction.alertes.length > 0);
  const pageRows = pages.map((page) => {
    return `| ${page.titre || '(sans titre)'} | ${page.sectionPrincipale} | ${page.sousSection || '-'} | ${page.typePageEstime} | ${page.textePrincipalNettoye.length} | ${page.imagesDetectees.length} | ${page.liensExternesDetectes.length} | ${page.url} |`;
  });

  const externalRows = [...allExternal.values()].map((link) => {
    return `- ${link.url}${link.label ? ` (${link.label})` : ''} - pages: ${link.pages.join(', ')}`;
  });

  const imageRows = [...allImages.values()].map((image) => {
    return `- ${image.url}${image.alt ? ` - alt: ${image.alt}` : ''} - pages: ${image.pages.join(', ')}`;
  });

  const difficultRows = difficultPages.map((page) => {
    return `- ${page.url}: ${page.extraction.alertes.join('; ')}`;
  });

  const failedFetches = fetchLog.filter((entry) => entry.status >= 400);
  const failedRows = failedFetches.map((entry) => {
    return `- ${entry.url}: HTTP ${entry.status}, capture ${entry.rawPath}`;
  });

  return `# Audit de migration - allemandbercher.ch

Audit généré le ${siteMap.generatedAt}.

## Méthode

- Crawler simple, séquentiel, limité à ${ORIGIN}.
- Pause de ${REQUEST_DELAY_MS} ms entre deux requêtes.
- Départ depuis ${START_URL}, puis suivi des liens internes trouvés dans la navigation et les pages.
- Les éléments parasites Google Sites sont filtrés du texte et des liens utiles : cookie banner, Google Sites, Report abuse, scripts et actions Google.
- Les captures HTML brutes sont conservées dans \`${RAW_DIR}/html/\`.

## Pages trouvées

${pages.length} pages internes utiles ont été inventoriées.

| Titre | Section | Sous-section | Type | Texte | Images | Liens externes | URL |
| --- | --- | --- | --- | ---: | ---: | ---: | --- |
${pageRows.join('\n')}

## Contenus manquants ou difficiles à extraire

${difficultRows.length ? difficultRows.join('\n') : '- Aucun contenu manifestement vide ou erreur d’extraction détecté par le script.'}

${failedRows.length ? `\n## Captures non intégrées à l’inventaire\n\n${failedRows.join('\n')}\n` : ''}

## Liens externes à conserver

${externalRows.length ? externalRows.join('\n') : '- Aucun lien externe utile détecté après filtrage des liens Google parasites.'}

## Images à télécharger

${imageRows.length ? imageRows.join('\n') : '- Aucune image de contenu détectée dans le HTML principal.'}

## Points à traiter manuellement

- Vérifier visuellement les pages où le texte extrait est court : Google Sites peut rendre certains blocs via scripts ou intégrations.
- Contrôler chaque lien externe avant migration : certains liens pédagogiques peuvent avoir changé ou nécessiter un remplacement.
- Télécharger et renommer les images utiles avec des noms stables avant intégration dans \`public/\`.
- Convertir les URLs accentuées du site source vers des slugs propres sans accents, par exemple \`/théorie/\` vers \`/theorie/\`.
- Décider si \`/nad-maschine\` doit rester une page indépendante ou devenir une sous-page de \`/outils-en-ligne/\`.
`;
}

async function main() {
  await mkdir(HTML_DIR, { recursive: true });
  await mkdir('data', { recursive: true });

  const queue = [START_URL];
  const seen = new Set();
  const discovered = new Set(queue);
  const fetchLog = [];
  const pages = [];

  while (queue.length > 0 && seen.size < MAX_PAGES) {
    const url = queue.shift();
    if (!url || seen.has(url)) continue;
    seen.add(url);

    const fetched = await fetchPage(url);
    const rawPath = path.join(HTML_DIR, safeName(url));
    await writeFile(rawPath, fetched.html);

    fetchLog.push({
      url,
      finalUrl: fetched.finalUrl,
      status: fetched.status,
      contentType: fetched.contentType,
      rawPath,
      bytes: Buffer.byteLength(fetched.html),
    });

    const mainHtml = extractMainHtml(fetched.html);
    const allLinks = extractLinks(fetched.html, fetched.finalUrl);
    const mainLinks = extractLinks(fetched.html, fetched.finalUrl, mainHtml);

    for (const nextUrl of allLinks.internal) {
      if (!discovered.has(nextUrl) && seen.size + queue.length < MAX_PAGES) {
        discovered.add(nextUrl);
        queue.push(nextUrl);
      }
    }

    if (fetched.status >= 400) {
      await sleep(REQUEST_DELAY_MS);
      continue;
    }

    const title = extractTitle(fetched.html, mainHtml);
    const text = normalizeLines(mainHtml);
    const classification = classify(fetched.finalUrl, title);
    const images = extractImages(mainHtml, fetched.finalUrl);
    const alerts = [];

    if (!title) alerts.push('titre non détecté');
    if (text.length < 80) alerts.push('texte principal très court');
    if (/The page you have entered does not exist/i.test(text) || /^404$/.test(title)) {
      alerts.push('contenu de type 404 détecté');
    }

    pages.push({
      url: fetched.finalUrl,
      titre: title,
      sectionPrincipale: classification.sectionPrincipale,
      sousSection: classification.sousSection,
      textePrincipalNettoye: text,
      imagesDetectees: images,
      liensExternesDetectes: mainLinks.external,
      typePageEstime: classification.typePage,
      extraction: {
        status: fetched.status,
        rawPath,
        textLength: text.length,
        alertes: alerts,
      },
    });

    await sleep(REQUEST_DELAY_MS);
  }

  pages.sort((a, b) => new URL(a.url).pathname.localeCompare(new URL(b.url).pathname, 'fr'));

  const siteMap = {
    generatedAt: new Date().toISOString(),
    source: ORIGIN,
    startUrl: START_URL,
    crawler: {
      maxPages: MAX_PAGES,
      requestDelayMs: REQUEST_DELAY_MS,
      userAgent: USER_AGENT,
      aggressive: false,
      fetchedUrls: fetchLog.length,
      remainingQueueWhenStopped: queue.length,
    },
    pages,
  };

  await writeFile(OUT_JSON, `${JSON.stringify(siteMap, null, 2)}\n`);
  await writeFile(path.join(RAW_DIR, 'fetch-log.json'), `${JSON.stringify(fetchLog, null, 2)}\n`);
  await writeFile(OUT_REPORT, buildReport(siteMap, fetchLog));

  console.log(`Fetched ${fetchLog.length} URLs.`);
  console.log(`Inventoried ${pages.length} pages.`);
  console.log(`Wrote ${OUT_JSON}, ${OUT_REPORT}, and ${RAW_DIR}/.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
