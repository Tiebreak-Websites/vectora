/**
 * Cloudflare Pages Functions middleware — HTTP Basic Auth gate.
 *
 * Protects every route on the deployment behind a username/password so the
 * preview/live site isn't publicly browsable. Credentials are read from
 * environment variables when present (set them in the Cloudflare dashboard or
 * via `wrangler pages secret put`), falling back to the requested defaults.
 *
 *   BASIC_AUTH_USER  (default: "parola")
 *   BASIC_AUTH_PASS  (default: "parola")
 */
export const onRequest = async (context) => {
  const USER = context.env.BASIC_AUTH_USER || "parola";
  const PASS = context.env.BASIC_AUTH_PASS || "parola";

  const header = context.request.headers.get("Authorization") || "";
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
