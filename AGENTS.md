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
- `src/content/` contient les ressources migrées en Markdown.
- `src/styles/global.css` contient le style global du site.
- `public/` contient les fichiers statiques publiés tels quels.
- `raw/` est réservé aux sources brutes de migration et n’est pas versionné.

## Chapitres

Les ressources 9H, 10H et 11H doivent rester simples à maintenir.

- Ajouter les pages de niveau dans `src/pages/chapitres/`.
- Garder les slugs en minuscules : `9h`, `10h`, `11h`.
- Regrouper les métadonnées utiles dans `src/data/chapters.ts` avant de dupliquer du contenu.
- Préférer des pages courtes et lisibles à de longues pages difficiles à modifier.

## Contenus migrés

- Garder le schéma dans `src/content.config.ts` minimal et stable.
- Utiliser les collections `conseils`, `exercices`, `theorie`, `vocabulaire` et `outils`.
- Ne pas coller du HTML Google Sites dans les fichiers Markdown.
- Mettre les liens externes dans `externalLinks` quand ils doivent être conservés.
- Mettre les images à récupérer dans `images`, puis remplacer progressivement les URLs Google par des fichiers locaux dans `public/`.
- Quand le site source contient un tableau sous forme d’image, le reconstituer dans le nouveau site sous forme de vrai tableau HTML ou de structure sémantique équivalente, pas comme une simple image.
- Noter les ambiguïtés dans `migrationNotes` au lieu d’inventer du contenu.

## Amélioration des pages

Ces règles doivent guider chaque reprise ou amélioration d’une page déjà migrée.

- Toujours comparer la page Astro locale avec la page équivalente du site source `https://www.allemandbercher.ch` avant de finaliser.
- Vérifier que tout le contenu utile du site source est intégré : titres, consignes, exemples, exercices, tableaux, images, liens et ordre général de la page.
- Reconstituer les tableaux du site source en vrais tableaux modifiables quand ils n’existent que sous forme d’image.
- Utiliser le site Google Sites comme référence de contenu et de structure, mais recoder la mise en page avec les composants et styles du nouveau site.
- Ne jamais laisser sur le site public des notes adressées au développeur ou à l’enseignant développeur, par exemple des commentaires sur le fait que le site est statique, maintenable ou en migration.
- Le haut des pages doit garder une structure régulière : titre clair, courte introduction, puis encadré d’objectifs, résumé ou bloc `À retenir` selon le type de page.

## Exercices interactifs

- Recoder les exercices interactifs du site source comme des fonctionnalités natives du nouveau site quand c’est raisonnable : Educaplay, H5P, HTML embarqué, questionnaires externes ou widgets similaires ne doivent pas rester de simples dépendances externes.
- Intégrer ces exercices avec l’UI du site : composants cohérents, libellés en français, styles sobres, état clair, accessibilité clavier et responsive.
- Tester chaque exercice comme un élève : enchaîner les actions attendues, entrer des réponses justes et fausses, vérifier les messages de retour et repérer les incohérences logiques.
- Préférer une validation par phrase, carte, item ou étape plutôt qu’une validation globale de tout l’exercice.
- Ne pas afficher automatiquement toutes les réponses lors de la validation. Le retour doit aider l’élève à corriger, sans transformer immédiatement l’exercice en corrigé complet.
- Quand un corrigé complet est utile, le placer derrière une action explicite, par exemple un bouton `Voir le corrigé`, après une tentative ou une étape de correction.

## Théorie et grammaire

- Maintenir une convention stable pour les couleurs grammaticales sur tout le site.
- Réutiliser la même couleur pour la même fonction grammaticale dans les explications, exemples, tableaux, encadrés et exercices.
- Avant d’ajouter une nouvelle couleur grammaticale, vérifier les pages existantes pour éviter les contradictions.
- Les couleurs doivent rester lisibles et accessibles : contraste suffisant, information non portée par la couleur seule, libellé ou structure claire en complément.
- Les exemples doivent rester adaptés au niveau des élèves et ne pas introduire de notions grammaticales non travaillées si elles ne sont pas nécessaires.

## UI et interactivité

- Chercher un équilibre entre paragraphes déroulants, boutons, fenêtres modales, cartes, tableaux, animations discrètes au survol ou au clic et exercices intégrés.
- Ne pas transformer une page entière en succession d’accordéons si une autre structure est plus claire : encadrés, étapes, onglets, cartes d’exemples ou exercice progressif.
- Au chargement d’une page, tous les paragraphes déroulants et accordéons doivent être fermés.
- Les interactions doivent servir la compréhension du contenu, pas seulement ajouter un effet visuel.
- Les animations doivent rester légères, rapides et compatibles avec `prefers-reduced-motion`.
- Garder une expérience uniforme entre les pages : mêmes types de blocs pour les mêmes usages, mêmes états visuels pour les mêmes actions, mêmes formulations pour les boutons récurrents.

## Qualité

Avant chaque commit :

1. lancer `npm run build`;
2. vérifier que les pages principales sont générées;
3. éviter les refontes non demandées;
4. ne pas committer `dist/`, `.astro/`, `node_modules/` ou les sources `raw/`.
