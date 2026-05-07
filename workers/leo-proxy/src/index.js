const LEO_ENDPOINT = 'https://dict.leo.org/dictQuery/m-vocab/frde/query.xml';
const MAX_RESULTS = 8;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...corsHeaders,
      ...(init.headers ?? {}),
    },
  });
}

function getAttribute(source, name) {
  const match = source.match(new RegExp(`${name}="([^"]*)"`, 'u'));
  return match ? decodeXml(match[1]) : '';
}

function decodeXml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/giu, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/gu, (_, number) => String.fromCodePoint(Number.parseInt(number, 10)))
    .replace(/&quot;/gu, '"')
    .replace(/&apos;/gu, "'")
    .replace(/&amp;/gu, '&')
    .replace(/&lt;/gu, '<')
    .replace(/&gt;/gu, '>')
    .replace(/\u00a0/gu, ' ');
}

function normalizeText(value) {
  return decodeXml(value.replace(/<[^>]+>/gu, ' '))
    .replace(/\s+/gu, ' ')
    .trim();
}

function unique(values) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))];
}

function wordsFromSide(entryXml, lang) {
  const sideMatch = entryXml.match(new RegExp(`<side\\b[^>]*lang="${lang}"[^>]*>([\\s\\S]*?)<\\/side>`, 'u'));
  if (!sideMatch) return [];

  const sideXml = sideMatch[1];
  const wordsBlock = sideXml.match(/<words>([\s\S]*?)<\/words>/u)?.[1] ?? '';
  const words = [...wordsBlock.matchAll(/<word\b[^>]*>([\s\S]*?)<\/word>/gu)].map((match) => normalizeText(match[1]));

  if (words.length > 0) return unique(words);

  const repr = sideXml.match(/<repr\b[^>]*>([\s\S]*?)<\/repr>/u)?.[1] ?? '';
  return unique([normalizeText(repr)]);
}

function parseSimilar(xml) {
  const similar = [];
  const similarBlock = xml.match(/<similar\b[^>]*>([\s\S]*?)<\/similar>/u)?.[1] ?? '';

  for (const sideMatch of similarBlock.matchAll(/<side\b[^>]*lang="([^"]+)"[^>]*>([\s\S]*?)<\/side>/gu)) {
    const lang = sideMatch[1];
    const words = [...sideMatch[2].matchAll(/<word\b[^>]*>([\s\S]*?)<\/word>/gu)]
      .map((match) => normalizeText(match[1]))
      .filter(Boolean);
    if (words.length > 0) similar.push({ lang, words: unique(words).slice(0, 8) });
  }

  return similar;
}

export function parseLeoXml(xml, query) {
  const searchMatch = xml.match(/<search\b([^>]*)\/>/u);
  const hitCount = searchMatch ? Number.parseInt(getAttribute(searchMatch[1], 'hitcount'), 10) || 0 : 0;
  const canonicalSearch = searchMatch ? getAttribute(searchMatch[1], 'canonicalSearch') : query;
  const results = [];

  for (const sectionMatch of xml.matchAll(/<section\b([^>]*)>([\s\S]*?)<\/section>/gu)) {
    const sectionTitle = getAttribute(sectionMatch[1], 'sctTitle') || getAttribute(sectionMatch[1], 'sctName');

    for (const entryMatch of sectionMatch[2].matchAll(/<entry\b[^>]*>([\s\S]*?)<\/entry>/gu)) {
      const entryXml = entryMatch[1];
      const fr = wordsFromSide(entryXml, 'fr');
      const de = wordsFromSide(entryXml, 'de');

      if (fr.length === 0 || de.length === 0) continue;

      results.push({
        category: sectionTitle,
        de: de.slice(0, 3),
        fr: fr.slice(0, 3),
      });

      if (results.length >= MAX_RESULTS) break;
    }

    if (results.length >= MAX_RESULTS) break;
  }

  return {
    query,
    canonicalSearch,
    hitCount,
    results,
    similar: parseSimilar(xml),
    sourceUrl: `https://dict.leo.org/allemand-fran%C3%A7ais/${encodeURIComponent(query)}`,
  };
}

export default {
  async fetch(request) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'GET') {
      return jsonResponse({ error: 'Méthode non autorisée.' }, { status: 405 });
    }

    const url = new URL(request.url);
    const query = (url.searchParams.get('q') ?? '').trim();

    if (!query) {
      return jsonResponse({
        query,
        hitCount: 0,
        results: [],
        similar: [],
        sourceUrl: 'https://dict.leo.org/allemand-fran%C3%A7ais/',
      });
    }

    if (query.length > 80) {
      return jsonResponse({ error: 'Recherche trop longue.' }, { status: 400 });
    }

    const leoUrl = new URL(LEO_ENDPOINT);
    leoUrl.searchParams.set('tolerMode', 'nof');
    leoUrl.searchParams.set('lp', 'frde');
    leoUrl.searchParams.set('lang', 'fr');
    leoUrl.searchParams.set('search', query);

    const leoResponse = await fetch(leoUrl.toString(), {
      headers: {
        Accept: 'text/xml,application/xml',
        'User-Agent': 'allemandbercher.ch classroom lookup',
      },
    });

    if (!leoResponse.ok) {
      return jsonResponse({ error: 'LEO ne répond pas pour le moment.' }, { status: 502 });
    }

    const xml = await leoResponse.text();
    return jsonResponse(parseLeoXml(xml, query));
  },
};
