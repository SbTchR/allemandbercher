import type { CollectionEntry } from 'astro:content';
import { withBase } from './paths';

export type ExerciseEntry = CollectionEntry<'exercices'>;
export type AdviceEntry = CollectionEntry<'conseils'>;
export type TheoryEntry = CollectionEntry<'theorie'>;
export type VocabularyEntry = CollectionEntry<'vocabulaire'>;
export type ToolEntry = CollectionEntry<'outils'>;
export type ResourceEntry = AdviceEntry | ExerciseEntry | TheoryEntry | VocabularyEntry | ToolEntry;

const levelRank = { '9H': 1, '10H': 2, '11H': 3 };
const categoryRank = { general: 0, grammaire: 1, syntaxe: 2, conjugaison: 3 };

export function byOrderThenTitle<T extends ResourceEntry>(a: T, b: T) {
  const orderA = a.data.order ?? 999;
  const orderB = b.data.order ?? 999;

  if (orderA !== orderB) return orderA - orderB;
  return a.data.title.localeCompare(b.data.title, 'fr');
}

export function byLevelThenOrder<T extends ResourceEntry>(a: T, b: T) {
  const levelA = a.data.level ? levelRank[a.data.level] : 99;
  const levelB = b.data.level ? levelRank[b.data.level] : 99;

  if (levelA !== levelB) return levelA - levelB;
  return byOrderThenTitle(a, b);
}

export function byCategoryThenOrder<T extends ResourceEntry>(a: T, b: T) {
  const categoryA = categoryRank[a.data.category ?? 'general'] ?? 99;
  const categoryB = categoryRank[b.data.category ?? 'general'] ?? 99;

  if (categoryA !== categoryB) return categoryA - categoryB;
  return byOrderThenTitle(a, b);
}

export function resourceUrl(entry: ResourceEntry) {
  const slug = entry.id.split('/').pop()?.replace(/\.md$/, '');

  if (entry.collection === 'exercices') {
    return withBase(`/exercices/${entry.data.level.toLowerCase()}/${slug}/`);
  }

  if (entry.collection === 'conseils') {
    return withBase(`/conseils/${slug}/`);
  }

  if (entry.collection === 'theorie') {
    const category = entry.data.category === 'general' ? '' : `${entry.data.category}/`;
    return withBase(`/theorie/${category}${slug}/`);
  }

  if (entry.collection === 'vocabulaire') {
    const level = entry.data.level ? `${entry.data.level.toLowerCase()}/` : '';
    return withBase(`/vocabulaire/${level}${slug}/`);
  }

  return withBase(`/outils-en-ligne/${slug}/`);
}

export function excerptFromBody(body: string, maxLength = 170) {
  const text = body.replace(/^---[\s\S]*?---/, '').replace(/\s+/g, ' ').trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}
