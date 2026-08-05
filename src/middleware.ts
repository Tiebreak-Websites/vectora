import { defineMiddleware } from 'astro:middleware';

/**
 * Coming Soon gate for `astro dev`.
 *
 * Production is gated at the edge by functions/_middleware.js, which never runs
 * under `astro dev`. This mirrors it locally so the dev server looks like the
 * deployment. It is skipped during `astro build` (import.meta.env.DEV is false
 * there), so the real pages are still prerendered into dist/ as normal.
 *
 * To work on the real site locally, lift the gate with the same flag
 * production uses, then let the dev server restart:
 *
 *   COMING_SOON=false   in .env, or  $env:COMING_SOON='false'; npm run dev
 *
 * Note: these pages are prerendered, so there is no per-request state to key a
 * bypass off — `context.request.headers` is empty and `context.url` carries no
 * search params. The flag is the toggle.
 */

const OFF = /^(0|false|off|no)$/i;
const COMING_SOON_ROUTE = '/coming-soon';

/** Vite/Astro internals and anything that looks like a file, never a page. */
const NOT_A_PAGE = /^\/(@|_|node_modules\/|src\/)|\.[a-z0-9]+$/i;

const readFlag = () => {
  const fromVite = (import.meta.env as Record<string, unknown>).COMING_SOON;
  if (fromVite !== undefined) return String(fromVite);
  const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
  return proc?.env?.COMING_SOON;
};

export const onRequest = defineMiddleware(async (context, next) => {
  if (!import.meta.env.DEV) return next();

  const flag = readFlag();
  if (flag !== undefined && OFF.test(flag)) return next();

  const { pathname } = context.url;

  if (pathname === COMING_SOON_ROUTE || pathname === `${COMING_SOON_ROUTE}/`) return next();
  if (NOT_A_PAGE.test(pathname)) return next();

  return context.rewrite(COMING_SOON_ROUTE);
});
