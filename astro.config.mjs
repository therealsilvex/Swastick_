import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// ------ Astro Configuration ------
export default defineConfig({
  site: 'https://silvex.pages.dev',
  prefetch: true,
  integrations: [
    react(),
    sitemap({
      namespaces: {
        news: false,
        xhtml: false,
        image: false,
        video: false,
      },
    }),
  ],
});
