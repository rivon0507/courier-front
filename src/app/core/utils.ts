/**
 * Safely resolves a post-authentication return path.
 *
 * This helper is used after login or registration to determine where the user
 * should be redirected. It prevents open-redirect vulnerabilities by allowing
 * only internal application paths.
 *
 * Security rules:
 * - Only accepts absolute internal paths (must start with "/")
 * - Rejects protocol-relative URLs (e.g. "//evil.com")
 * - Rejects paths containing backslashes
 *
 * Notes:
 * - Query parameters are already URL-decoded by Angular when read from
 *   ActivatedRoute.queryParamMap; do NOT decode manually.
 * - External URLs (http, https, javascript, etc.) are intentionally rejected.
 *
 * @param next The raw "next" query parameter from the route, or null if absent.
 * @param fallback The path to use when "next" is invalid or missing (defaults to "/").
 * @returns A safe internal navigation path.
 */
export function safeNext (next: string | null, fallback = '/'): string {
  if (!next) return fallback;
  if (!next.startsWith('/')) return fallback;
  if (next.startsWith('//')) return fallback;
  if (next.includes('\\')) return fallback;
  return next;
}
