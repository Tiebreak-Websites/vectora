// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

// Vite only surfaces PUBLIC_*-prefixed values, so plain .env entries never
// reach server code. Copy the ones we need onto process.env, where
// src/middleware.ts can read them. A real shell variable still wins.
const fileEnv = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
for (const key of ['COMING_SOON']) {
  if (process.env[key] === undefined && fileEnv[key] !== undefined) {
    process.env[key] = fileEnv[key];
  }
}

// https://astro.build/config
export default defineConfig({
  server: {
    port: Number(process.env.PORT) || 4321,
  },
  redirects: {
    '/results': '/analytics',
    '/bots': '/algos',
  },
});
