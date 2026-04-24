export type NavigationItem = {
  label: string;
  href: string;
  description: string;
};

export const navigationItems: NavigationItem[] = [
  {
    label: 'Accueil',
    href: '/',
    description: 'Point de départ du site et accès rapide aux ressources.',
  },
  {
    label: 'Conseils',
    href: '/conseils/',
    description: 'Méthodes de travail, stratégies de mémorisation et aide pour progresser.',
  },
  {
    label: 'Exercices',
    href: '/exercices/',
    description: 'Activités par niveaux 9H, 10H et 11H.',
  },
  {
    label: 'Théorie',
    href: '/theorie/',
    description: 'Rappels de grammaire et notions essentielles.',
  },
  {
    label: 'Vocabulaire',
    href: '/vocabulaire/',
    description: 'Listes et supports pour apprendre les mots des chapitres.',
  },
  {
    label: 'Outils en ligne',
    href: '/outils-en-ligne/',
    description: 'Sites et outils utiles pour apprendre l’allemand.',
  },
];
