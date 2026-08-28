// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";

// We need it for ssr mode
import node from '@astrojs/node';

import sitemap from '@astrojs/sitemap';

// Get the value of the ASTRO_SSR environment variable from .env
const { ASTRO_SSR, SITE_DOMAIN, SITE_SUBDOMAIN } = loadEnv(process.env, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  site: 'https://' + (SITE_SUBDOMAIN && SITE_SUBDOMAIN != 0 ? SITE_SUBDOMAIN + '.' : '') + SITE_DOMAIN,

  output: ASTRO_SSR == 1 ? 'server' : 'static',
  adapter: ASTRO_SSR == 1 ? node({ mode: 'standalone' }) : undefined,

  redirects: {
    '/results': '/analytics',
    '/bots': '/algos',
  },

  image: {
    domains: ["wordpress.plexop.dev", "wordpress.ddev.site"],
  },

  integrations: [sitemap({
    filter: (page) => {
      const exclude = ['/admin/'];
      return !exclude.some(path => page.includes(path));
    }
  })],
});
