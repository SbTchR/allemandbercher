export type ChapterLevel = {
  level: '9H' | '10H' | '11H';
  href: string;
  description: string;
  chapters: string[];
};

export const chapterLevels: ChapterLevel[] = [
  {
    level: '9H',
    href: '/chapitres/9h/',
    description: 'Ressources de base pour commencer et consolider les premières notions.',
    chapters: [],
  },
  {
    level: '10H',
    href: '/chapitres/10h/',
    description: 'Ressources organisées par chapitre pour poursuivre la progression.',
    chapters: [],
  },
  {
    level: '11H',
    href: '/chapitres/11h/',
    description: 'Ressources de révision et d’approfondissement pour la dernière année.',
    chapters: [],
  },
];
