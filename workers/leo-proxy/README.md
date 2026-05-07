# Proxy LEO

Petit Worker Cloudflare pour afficher des résultats LEO dans le site sans iframe.

Pourquoi ce proxy existe :

- LEO bloque l’affichage en iframe avec `X-Frame-Options: SAMEORIGIN`.
- Le navigateur ne peut pas lire directement les réponses LEO si les headers CORS ne l’autorisent pas.
- Un Worker peut interroger LEO côté serveur, extraire les premiers résultats XML, puis renvoyer un JSON lisible par le site.

Déploiement :

```bash
npx wrangler deploy
```

Le site Astro doit ensuite être compilé avec l’URL du Worker :

```bash
PUBLIC_LEO_PROXY_URL=https://<worker-url> npm run build
```

Le Worker n’utilise pas de stockage, pas de base de données et pas de plan payant obligatoire.
Sur le plan gratuit Cloudflare Workers, la limite standard est de 100 000 requêtes par jour.
