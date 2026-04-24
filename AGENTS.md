# Règles du projet

Ce dépôt reconstruit `https://www.allemandbercher.ch` en site statique Astro pour GitHub Pages.

## Principes

- Utiliser le site Google Sites uniquement comme source de contenu et de structure.
- Ne jamais copier le HTML généré par Google Sites.
- Ne pas reproduire les éléments Google inutiles : bannière cookies Google, footer Google Sites, liens de signalement ou scripts de suivi Google.
- Garder un site rapide, statique, accessible et sans dépendance serveur.
- Écrire les contenus visibles en français.
- Conserver les titres existants quand ils sont pertinents pour les élèves.
- Utiliser des URLs propres, en minuscules, avec des tirets et sans accents.
- Préserver une navigation claire : Accueil, Conseils, Exercices, Théorie, Vocabulaire, Outils en ligne.

## Structure

- `src/pages/` contient les routes Astro publiées.
- `src/components/` contient les composants réutilisables.
- `src/data/` contient les listes faciles à modifier : navigation, chapitres, liens.
- `src/styles/global.css` contient le style global du site.
- `public/` contient les fichiers statiques publiés tels quels.
- `raw/` est réservé aux sources brutes de migration et n’est pas versionné.

## Chapitres

Les ressources 9H, 10H et 11H doivent rester simples à maintenir.

- Ajouter les pages de niveau dans `src/pages/chapitres/`.
- Garder les slugs en minuscules : `9h`, `10h`, `11h`.
- Regrouper les métadonnées utiles dans `src/data/chapters.ts` avant de dupliquer du contenu.
- Préférer des pages courtes et lisibles à de longues pages difficiles à modifier.

## Qualité

Avant chaque commit :

1. lancer `npm run build`;
2. vérifier que les pages principales sont générées;
3. éviter les refontes non demandées;
4. ne pas committer `dist/`, `.astro/`, `node_modules/` ou les sources `raw/`.
