import { defineConfig } from 'astro/config';

const base = process.env.PUBLIC_BASE_PATH || '/allemandbercher';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://sbtchr.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
});
