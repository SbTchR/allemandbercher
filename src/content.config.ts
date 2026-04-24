import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const externalLinkSchema = z.object({
  label: z.string().optional(),
  url: z.url(),
});

const imageSchema = z.object({
  src: z.url(),
  alt: z.string().optional(),
});

const resourceSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  section: z.enum(['exercices', 'theorie', 'vocabulaire', 'outils']),
  level: z.enum(['9H', '10H', '11H']).optional(),
  category: z.enum(['grammaire', 'syntaxe', 'conjugaison', 'general']).default('general'),
  sourceUrl: z.url().optional(),
  pageType: z.enum(['index', 'chapitre', 'theorie', 'vocabulaire', 'outils', 'autre']),
  order: z.number().optional(),
  objectives: z.array(z.string()).default([]),
  externalLinks: z.array(externalLinkSchema).default([]),
  images: z.array(imageSchema).default([]),
  migrationNotes: z.array(z.string()).default([]),
});

const exercices = defineCollection({
  loader: glob({ base: './src/content/exercices', pattern: '**/*.md' }),
  schema: resourceSchema.extend({
    section: z.literal('exercices'),
    level: z.enum(['9H', '10H', '11H']),
    pageType: z.enum(['index', 'chapitre']),
  }),
});

const theorie = defineCollection({
  loader: glob({ base: './src/content/theorie', pattern: '**/*.md' }),
  schema: resourceSchema.extend({
    section: z.literal('theorie'),
    category: z.enum(['grammaire', 'syntaxe', 'conjugaison', 'general']),
    pageType: z.literal('theorie'),
  }),
});

const vocabulaire = defineCollection({
  loader: glob({ base: './src/content/vocabulaire', pattern: '**/*.md' }),
  schema: resourceSchema.extend({
    section: z.literal('vocabulaire'),
    level: z.enum(['9H', '10H', '11H']).optional(),
    pageType: z.literal('vocabulaire'),
  }),
});

const outils = defineCollection({
  loader: glob({ base: './src/content/outils', pattern: '**/*.md' }),
  schema: resourceSchema.extend({
    section: z.literal('outils'),
    pageType: z.literal('outils'),
  }),
});

export const collections = {
  exercices,
  theorie,
  vocabulaire,
  outils,
};
