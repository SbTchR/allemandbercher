# Publication GitHub du site Allemand Bercher

Ce guide part du principe que le dépôt GitHub s’appelle `allemandbercher` et qu’il est créé sous le compte GitHub `SbTchR`.

Si le dépôt doit être créé dans une organisation ou sous un autre compte, remplacer `SbTchR` dans les commandes par le bon propriétaire GitHub.

## 1. Vérifier le dépôt local

Depuis le dossier du projet :

```bash
cd /Users/sylvainbovat/Desktop/allemandbercher-github-pages
git status --short --branch
```

Le résultat attendu avant publication est :

```text
## main
```

Cela signifie que la branche locale est `main` et que tous les fichiers utiles sont commités.

## 2. Créer le dépôt GitHub

Dans GitHub :

1. ouvrir `https://github.com/new`;
2. choisir le propriétaire `SbTchR`;
3. mettre le nom du dépôt : `allemandbercher`;
4. choisir la visibilité voulue;
5. ne pas cocher **Add a README file**;
6. ne pas ajouter de `.gitignore`;
7. ne pas ajouter de licence;
8. cliquer sur **Create repository**.

Le dépôt doit être vide, car le projet local contient déjà l’historique Git, le README, le workflow GitHub Actions et les fichiers de configuration.

## 3. Ajouter le remote

Commande HTTPS recommandée :

```bash
git remote add origin https://github.com/SbTchR/allemandbercher.git
```

Vérifier que le remote est bien enregistré :

```bash
git remote -v
```

Résultat attendu :

```text
origin  https://github.com/SbTchR/allemandbercher.git (fetch)
origin  https://github.com/SbTchR/allemandbercher.git (push)
```

Si le dépôt est créé sous une organisation, utiliser par exemple :

```bash
git remote add origin https://github.com/NOM_ORGANISATION/allemandbercher.git
```

## 4. Pousser la branche main

Premier push :

```bash
git push -u origin main
```

Les prochains pushs pourront ensuite se faire avec :

```bash
git push
```

Le push sur `main` déclenche automatiquement le workflow `.github/workflows/deploy.yml`.

## 5. Activer GitHub Pages avec GitHub Actions

Dans GitHub, après le premier push :

1. ouvrir le dépôt `allemandbercher`;
2. aller dans **Settings**;
3. ouvrir **Pages** dans le menu latéral;
4. dans **Build and deployment**, choisir **Source: GitHub Actions**;
5. enregistrer si GitHub affiche un bouton de confirmation.

Le workflow **Deploy Astro site to GitHub Pages** va construire le site et publier le dossier `dist/`.

## 6. Vérifier le déploiement

Dans GitHub :

1. ouvrir l’onglet **Actions**;
2. cliquer sur le dernier workflow **Deploy Astro site to GitHub Pages**;
3. vérifier que les étapes suivantes sont vertes :
   - `Install dependencies`;
   - `Generate URL map`;
   - `Build`;
   - `Check internal links`;
   - `Deploy to GitHub Pages`.

Tant que le domaine personnalisé n’est pas relié, l’adresse de test GitHub Pages est :

```text
https://sbtchr.github.io/allemandbercher/
```

Le site prévoit ensuite le domaine personnalisé :

```text
www.allemandbercher.ch
```

Ce domaine est déclaré dans `public/CNAME`. Pour un déploiement final directement à la racine du domaine personnalisé, il faudra construire avec `PUBLIC_SITE_URL=https://www.allemandbercher.ch` et `PUBLIC_BASE_PATH=/`.

## 7. En cas d’erreur classique

Si GitHub Pages ne publie pas :

- vérifier que **Settings > Pages > Source** est bien réglé sur **GitHub Actions**;
- vérifier que le dépôt contient `.github/workflows/deploy.yml`;
- vérifier que l’onglet **Actions** autorise l’exécution des workflows;
- vérifier que le fichier `public/CNAME` contient bien `www.allemandbercher.ch`;
- vérifier que le DNS du domaine pointe vers GitHub Pages.

Si le remote existe déjà avec une autre URL :

```bash
git remote -v
```

Ne pas remplacer le remote sans vérifier l’URL. Pour changer volontairement l’URL du remote :

```bash
git remote set-url origin https://github.com/SbTchR/allemandbercher.git
```
