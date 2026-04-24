# Allemand Bercher

Migration du site `https://www.allemandbercher.ch` vers un site statique Astro publié avec GitHub Pages.

## Lancer le site en local

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

- `src/pages/conseils.astro` devient `/conseils/`
- `src/pages/outils-en-ligne.astro` devient `/outils-en-ligne/`
- `src/pages/chapitres/9h/index.astro` devient `/chapitres/9h/`

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

Construire le site :

```bash
npm run build
```

Prévisualiser le résultat généré :

```bash
npm run preview
```

## Publier avec GitHub Pages

Le workflow `.github/workflows/deploy.yml` construit le site à chaque push sur la branche `main` et publie le dossier généré par Astro sur GitHub Pages.

Dans GitHub :

1. ouvrir les paramètres du dépôt;
2. aller dans **Pages**;
3. choisir **GitHub Actions** comme source de déploiement;
4. pousser les changements sur `main`.
