# Allemand Bercher

Migration du site `https://www.allemandbercher.ch` vers un site statique Astro publié avec GitHub Pages.

## Lancer le site en local

Prérequis : Node.js 22 ou plus récent. La version attendue est indiquée dans `.nvmrc`.

Installer les dépendances :

```bash
npm install
```

Démarrer le serveur de développement :

```bash
npm run dev
```

Astro affiche ensuite une adresse locale, généralement `http://localhost:4321`.

## Modifier le contenu

- Les pages principales sont dans `src/pages/`.
- Les contenus migrés sont dans `src/content/`.
- La navigation est dans `src/data/navigation.ts`.
- Les niveaux et chapitres sont dans `src/data/chapters.ts`.
- Les composants partagés sont dans `src/components/`.
- Les styles globaux sont dans `src/styles/global.css`.

Pour ajouter une page simple, créer un fichier `.astro` dans `src/pages/`. Le nom du fichier devient l’URL.

Exemples :

- `src/pages/conseils/index.astro` devient `/conseils/`
- `src/pages/outils-en-ligne/index.astro` devient `/outils-en-ligne/`
- `src/pages/404.astro` devient `/404.html`

## Modèle de contenu

Les ressources migrées depuis l’audit sont organisées en collections Astro :

- `src/content/exercices/9h/`, `10h/`, `11h/`
- `src/content/conseils/`
- `src/content/theorie/grammaire/`, `syntaxe/`, `conjugaison/`
- `src/content/vocabulaire/9h/`, `10h/`, `11h/`
- `src/content/outils/`

Chaque fichier Markdown contient un en-tête simple : titre, section, niveau ou catégorie, URL source, liens externes, images et notes de migration.

Pour régénérer ces fichiers depuis `data/source-site-map.json` et mettre à jour le journal de migration :

```bash
npm run content:migrate
```

Attention : cette commande remplace le dossier `src/content/` et réécrit `migration-log.md`. Ne pas l’utiliser après des corrections manuelles sans sauvegarder les modifications utiles.

## Règles de migration

Le dossier `raw/` peut contenir des exports ou copies du site Google Sites pour consultation locale. Il ne doit pas être publié ni committé.

Pendant la migration :

- reprendre le contenu utile;
- réécrire la structure en Astro;
- ne pas copier le HTML Google Sites;
- supprimer les éléments Google inutiles;
- garder des URLs en minuscules avec des tirets.

## Vérifier avant publication

Mettre à jour la carte des anciennes et nouvelles URLs :

```bash
npm run urls:map
```

Construire le site :

```bash
npm run build
```

Vérifier les liens internes du build :

```bash
npm run links:check
```

Prévisualiser le résultat généré :

```bash
npm run preview
```

Le rapport de liens est écrit dans `link-check-report.md`. La carte de redirection est écrite dans `url-map.json`.

## Publier avec GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit le site à chaque push sur la branche `main` et publie le dossier `dist/` généré par Astro sur GitHub Pages.

Le déploiement automatique exécute :

1. installation des dépendances avec `npm ci`;
2. génération de `url-map.json`;
3. build Astro avec `npm run build`;
4. vérification des liens internes avec `npm run links:check`;
5. publication du dossier `dist/` sur GitHub Pages.

Dans GitHub :

1. ouvrir les paramètres du dépôt;
2. aller dans **Pages**;
3. choisir **GitHub Actions** comme source de déploiement;
4. pousser les changements sur `main`.

Configuration de production :

- `astro.config.mjs` définit le site comme un site statique publié sur GitHub Pages.
- par défaut, le build utilise `https://sbtchr.github.io/allemandbercher/` avec `base: /allemandbercher`.
- `public/CNAME` conserve le domaine personnalisé `www.allemandbercher.ch` pour la bascule DNS finale.
- `public/.nojekyll` évite les erreurs GitHub Pages avec les dossiers générés par Astro, notamment `_astro`.
- la page `src/pages/404.astro` sécurise les anciennes URLs connues grâce à `url-map.json`.

Pour publier directement à la racine d’un domaine personnalisé, lancer le build avec :

```bash
PUBLIC_SITE_URL=https://www.allemandbercher.ch PUBLIC_BASE_PATH=/ npm run build
```
