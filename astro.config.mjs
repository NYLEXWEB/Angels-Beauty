// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://angelsbeautyparlour.in',
  integrations: [
    react(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      serialize(item) {
        if (item.url === 'https://angelsbeautyparlour.in/') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        } else if (item.url.includes('/bridal') || item.url.includes('/services')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        } else if (item.url.includes('/gallery') || item.url.includes('/reviews') || item.url.includes('/about')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else {
          item.priority = 0.7;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ],
  prefetch: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
