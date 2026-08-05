/**
 * Cloudflare Pages Functions middleware.
 *
 * Two gates, in order:
 *
 * 1. COMING SOON (on by default) — every route on the deployment serves the
 *    Coming Soon page (src/pages/coming-soon.astro). The real pages are still
 *    in the build but are unreachable, and no password is asked for, so the
 *    placeholder is publicly visible.
 *
 *    Set COMING_SOON=false in the Cloudflare Pages environment to launch. That
 *    hands every request back to the Basic Auth gate below.
 *
 *    `astro dev` does not run Pages Functions, so local development always
 *    shows the real site. The placeholder is at /coming-soon there.
 *
 * 2. HTTP BASIC AUTH — keeps the real site off the public web once the Coming
 *    Soon gate is lifted. Credentials come from environment variables when
 *    present (Cloudflare dashboard, or `wrangler pages secret put`):
 *
 *      BASIC_AUTH_USER  (default: "parola")
 *      BASIC_AUTH_PASS  (default: "parola")
 */

const COMING_SOON_PATH = "/coming-soon/";

/**
 * Requests still served normally while the Coming Soon gate is on — the assets
 * the placeholder itself needs, plus the files crawlers and browsers ask for by
 * a fixed name. Everything else is rewritten to the placeholder.
 */
const PASS_THROUGH = [
  /^\/_astro\//, // Astro's hashed CSS/JS bundles
  /^\/favicon\.(svg|ico)$/,
  /^\/vectora-logo-(white|dark)\.svg$/,
  /^\/og-image\.svg$/,
  /^\/robots\.txt$/,
];

const isPassThrough = (pathname) => PASS_THROUGH.some((re) => re.test(pathname));

const isComingSoonPath = (pathname) =>
  pathname === COMING_SOON_PATH || pathname === "/coming-soon";

/** Env flags are strings; treat "0"/"false"/"off"/"no" as off, anything else as on. */
const flagOn = (value, fallback) =>
  value === undefined || value === null || value === ""
    ? fallback
    : !/^(0|false|off|no)$/i.test(String(value));

/** Shown only if the built placeholder somehow can't be fetched. */
const FALLBACK_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Vectora — Launching soon</title>
<style>html,body{height:100%}body{margin:0;display:grid;place-items:center;background:#0E1512;color:#F2F5F3;
font:500 1rem/1.6 system-ui,sans-serif;text-align:center;padding:2rem}</style></head>
<body><div><h1 style="font-weight:600;letter-spacing:-.02em">Vectora</h1><p style="color:#8C9891">Launching soon.</p></div></body></html>`;

export const onRequest = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // ---- 1. Coming Soon gate -------------------------------------------------
  if (flagOn(env.COMING_SOON, true)) {
    if (isPassThrough(url.pathname) || isComingSoonPath(url.pathname)) {
      return context.next();
    }

    // Conditional headers belong to the URL the visitor actually asked for —
    // forwarding them could turn this into a 304 with no body.
    const headers = new Headers(request.headers);
    headers.delete("If-None-Match");
    headers.delete("If-Modified-Since");

    const rewritten = new Request(new URL(COMING_SOON_PATH, url).toString(), {
      method: "GET",
      headers,
    });

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
        // No caching, so flipping COMING_SOON takes effect immediately.
        "Cache-Control": "no-store",
      },
    });
  }

  // ---- 2. Basic auth -------------------------------------------------------
  const USER = env.BASIC_AUTH_USER || "parola";
  const PASS = env.BASIC_AUTH_PASS || "parola";

  const header = request.headers.get("Authorization") || "";
  const [scheme, encoded] = header.split(" ");

  if (scheme === "Basic" && encoded) {
    let decoded = "";
    try {
      decoded = atob(encoded);
    } catch {
      decoded = "";
    }
    const idx = decoded.indexOf(":");
    const user = decoded.slice(0, idx);
    const pass = decoded.slice(idx + 1);
    if (idx !== -1 && user === USER && pass === PASS) {
      return context.next();
    }
  }

  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Vectora", charset="UTF-8"',
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
