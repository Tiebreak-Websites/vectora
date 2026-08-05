/**
 * Cloudflare Pages Functions middleware — `live` branch (launch placeholder).
 *
 * This branch builds a single page. Anything other than `/` would otherwise
 * 404, so every path that is not one of the placeholder's own assets is served
 * the placeholder instead. No Basic Auth: the placeholder is meant to be
 * public, and there is nothing else on the deployment to protect.
 *
 * The real site — and its Basic Auth gate — lives on the `website` branch.
 */

/** Requests served normally. Everything else gets the placeholder. */
const PASS_THROUGH = [
  /^\/_astro\//, // Astro's hashed CSS/JS bundles
  /^\/favicon\.(svg|ico)$/,
  /^\/vectora-logo-(white|dark)\.svg$/,
  /^\/og-image\.svg$/,
  /^\/robots\.txt$/,
];

const isPassThrough = (pathname) => PASS_THROUGH.some((re) => re.test(pathname));

/** Shown only if the built placeholder somehow can't be fetched. */
const FALLBACK_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Vectora</title>
<style>html,body{height:100%}body{margin:0;display:grid;place-items:center;background:#0E1512;color:#F2F5F3;
font:500 1rem/1.6 system-ui,sans-serif;text-align:center;padding:2rem}</style></head>
<body><h1 style="font-weight:600;letter-spacing:-.02em">Vectora</h1></body></html>`;

export const onRequest = async (context) => {
  const { request } = context;
  const url = new URL(request.url);

  if (url.pathname === "/" || isPassThrough(url.pathname)) {
    return context.next();
  }

  // Conditional headers belong to the URL the visitor actually asked for —
  // forwarding them could turn this into a 304 with no body.
  const headers = new Headers(request.headers);
  headers.delete("If-None-Match");
  headers.delete("If-Modified-Since");

  const rewritten = new Request(new URL("/", url).toString(), { method: "GET", headers });

  let body = FALLBACK_HTML;
  try {
    const res = await context.next(rewritten);
    if (res.ok) body = res.body;
  } catch {
    // fall through to FALLBACK_HTML
  }

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};
