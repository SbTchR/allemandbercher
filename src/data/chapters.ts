export type ChapterLevel = {
  level: '9H' | '10H' | '11H';
  href: string;
  exerciseHref: string;
  vocabularyHref: string;
  description: string;
  chapters: ChapterItem[];
};

export type ChapterItem = {
  order: number;
  label: string;
  title: string;
  exerciseSlug: string;
  vocabularySlug: string;
};

export const chapterLevels: ChapterLevel[] = [
  {
    level: '9H',
    href: '/chapitres/9h/',
    exerciseHref: '/exercices/9h/',
    vocabularyHref: '/vocabulaire/9h/',
    description: 'Ressources de base pour commencer et consolider les premières notions.',
    chapters: [
      {
        order: 1,
        label: 'K1',
        title: 'Die neue Schule',
        exerciseSlug: 'kap-1-die-neue-schule',
        vocabularySlug: 'gk9-kapitel-1',
      },
      {
        order: 2,
        label: 'K2',
        title: 'Meine Stadt',
        exerciseSlug: 'kap-2-meine-stadt',
        vocabularySlug: 'gk9-kapitel-2',
      },
      {
        order: 3,
        label: 'K3',
        title: 'Meine Familie',
        exerciseSlug: 'kap-3-meine-familie',
        vocabularySlug: 'gk9-kapitel-3',
      },
      {
        order: 4,
        label: 'K4',
        title: 'Alles Gute',
        exerciseSlug: 'kap-4-alles-gute',
        vocabularySlug: 'gk9-kapitel-4',
      },
      {
        order: 5,
        label: 'K5',
        title: 'Wir fahren weg!',
        exerciseSlug: 'kap-5-wir-fahren-weg',
        vocabularySlug: 'gk9-kapitel-5',
      },
      {
        order: 6,
        label: 'K6',
        title: 'Klassenfahrt nach Basel',
        exerciseSlug: 'kap-6-klassenfahrt-nach-basel',
        vocabularySlug: 'gk9-kapitel-6',
      },
      {
        order: 7,
        label: 'K7',
        title: 'Freunde haben - Freunde finden',
        exerciseSlug: 'kap-7-freunde-haben-freunde-finden',
        vocabularySlug: 'gk9-kapitel-7',
      },
      {
        order: 8,
        label: 'K8',
        title: 'Bei uns zu Hause',
        exerciseSlug: 'kap-8-bei-uns-zu-hause',
        vocabularySlug: 'gk9-kapitel-8',
      },
    ],
  },
  {
    level: '10H',
    href: '/chapitres/10h/',
    exerciseHref: '/exercices/10h/',
    vocabularyHref: '/vocabulaire/10h/',
    description: 'Ressources organisées par chapitre pour poursuivre la progression.',
    chapters: [
      {
        order: 1,
        label: 'K1',
        title: "Los geht's",
        exerciseSlug: 'k1-los-gehts',
        vocabularySlug: 'gk1011-kapitel-1',
      },
      {
        order: 2,
        label: 'K2',
        title: 'Fit und sportlich!',
        exerciseSlug: 'k2-fit-und-sportlich',
        vocabularySlug: 'gk1011-kapitel-2',
      },
      {
        order: 3,
        label: 'K3',
        title: "Wie geht's denn so?",
        exerciseSlug: 'k3-wie-gehts-denn-so',
        vocabularySlug: 'gk1011-kapitel-3',
      },
      {
        order: 4,
        label: 'K4',
        title: 'Kaufen, verkaufen, leihen',
        exerciseSlug: 'k4-kaufen-verkaufen-leihen',
        vocabularySlug: 'gk1011-kapitel-4',
      },
      {
        order: 5,
        label: 'K5',
        title: "Schmeckt's?",
        exerciseSlug: 'k5-schmeckts',
        vocabularySlug: 'gk1011-kapitel-5',
      },
      {
        order: 6,
        label: 'K6',
        title: 'Lies mal wieder!',
        exerciseSlug: 'k6-lies-mal-wieder',
        vocabularySlug: 'gk1011-kapitel-6',
      },
      {
        order: 7,
        label: 'K7',
        title: 'Geld allein macht nicht glücklich',
        exerciseSlug: 'k7-geld-allein-macht-nicht-glucklich',
        vocabularySlug: 'gk1011-kapitel-7',
      },
      {
        order: 8,
        label: 'K8',
        title: 'Talente gesucht',
        exerciseSlug: 'k8-talente-gesucht',
        vocabularySlug: 'gk1011-kapitel-8',
      },
    ],
  },
  {
    level: '11H',
    href: '/chapitres/11h/',
    exerciseHref: '/exercices/11h/',
    vocabularyHref: '/vocabulaire/11h/',
    description: 'Ressources de révision et d’approfondissement pour la dernière année.',
    chapters: [
      {
        order: 1,
        label: 'K1',
        title: 'Meine Stärken, meine Schwächen',
        exerciseSlug: 'k1-meine-starken-meine-schwachen',
        vocabularySlug: 'gk11-kapitel-1',
      },
      {
        order: 2,
        label: 'K2',
        title: 'Wir und die Medien',
        exerciseSlug: 'k2-wir-und-die-medien',
        vocabularySlug: 'gk11-kapitel-2',
      },
      {
        order: 3,
        label: 'K3',
        title: 'Für die Umwelt',
        exerciseSlug: 'k3-fur-die-umwelt',
        vocabularySlug: 'gk11-kapitel-3',
      },
      {
        order: 4,
        label: 'K4',
        title: 'Ich, du, wir',
        exerciseSlug: 'k4-ich-du-wir',
        vocabularySlug: 'gk11-kapitel-4',
      },
      {
        order: 5,
        label: 'K5',
        title: 'Ich wünsche mir...',
        exerciseSlug: 'k5-ich-wunsche-mir',
        vocabularySlug: 'gk11-kapitel-5',
      },
      {
        order: 6,
        label: 'K6',
        title: 'Wir tun was!',
        exerciseSlug: 'k6-wir-tun-was',
        vocabularySlug: 'gk11-kapitel-6',
      },
      {
        order: 7,
        label: 'K7',
        title: 'So war es - so ist es jetzt',
        exerciseSlug: 'k7-so-war-es-so-ist-es-jetzt',
        vocabularySlug: 'gk11-kapitel-7',
      },
      {
        order: 8,
        label: 'K8',
        title: "Wie geht's weiter?",
        exerciseSlug: 'k8-wie-gehts-weiter',
        vocabularySlug: 'gk11-kapitel-8',
      },
    ],
  },
];
