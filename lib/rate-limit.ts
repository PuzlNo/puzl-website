/**
 * Minimal in-process sliding-window rate limiter.
 *
 * IMPORTANT — deployment caveat: state lives in the memory of a single
 * function instance. On Vercel Fluid Compute instances are reused across
 * requests, so this does throttle a burst from one source in practice, but it
 * is NOT globally consistent: concurrent instances and regions each keep their
 * own counters, and a recycled instance starts empty. It raises the cost of
 * casual abuse; it is not a guarantee. If contact-form abuse becomes real,
 * move this to a shared store (e.g. Upstash Redis via the Vercel Marketplace)
 * so the window is enforced across every instance.
 */

type Window = { hits: number[] };

const buckets = new Map<string, Window>();

/** Stops a flood of unique keys from growing the map without bound. */
const MAX_TRACKED_KEYS = 10_000;

export type RateLimitRule = {
  /** Window length in milliseconds. */
  windowMs: number;
  /** Maximum requests permitted within the window. */
  max: number;
};

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the caller may retry; 0 when allowed. */
  retryAfter: number;
};

/**
 * Records a hit for `key` and reports whether every rule still permits it.
 * Rules are evaluated together, so a burst rule and an hourly rule can be
 * combined (e.g. 2/minute and 5/hour).
 */
export function checkRateLimit(key: string, rules: RateLimitRule[]): RateLimitResult {
  const now = Date.now();
  const longestWindow = Math.max(...rules.map((rule) => rule.windowMs));

  if (buckets.size > MAX_TRACKED_KEYS) buckets.clear();

  const bucket = buckets.get(key) ?? { hits: [] };
  // Drop hits older than the longest window so the array cannot grow forever.
  bucket.hits = bucket.hits.filter((timestamp) => now - timestamp < longestWindow);

  for (const rule of rules) {
    const withinWindow = bucket.hits.filter((timestamp) => now - timestamp < rule.windowMs);
    if (withinWindow.length >= rule.max) {
      const oldest = Math.min(...withinWindow);
      const retryAfter = Math.ceil((rule.windowMs - (now - oldest)) / 1000);
      // Persist the pruned bucket without recording this rejected attempt, so a
      // client hammering the endpoint cannot extend its own lockout forever.
      buckets.set(key, bucket);
      return { allowed: false, retryAfter: Math.max(1, retryAfter) };
    }
  }

  bucket.hits.push(now);
  buckets.set(key, bucket);
  return { allowed: true, retryAfter: 0 };
}

/**
 * Bucket key shared by every request, used for the global backstop below.
 */
export const GLOBAL_KEY = "__global__";

/**
 * Best-effort client identity.
 *
 * TRUST BOUNDARY — read before changing this. These headers are only
 * trustworthy because Vercel's edge sets them: Vercel *overwrites*
 * `x-forwarded-for` and refuses to forward external IPs specifically to
 * prevent spoofing (https://vercel.com/docs/headers/request-headers).
 * `x-vercel-forwarded-for` is preferred because it still holds Vercel's own
 * value even when a proxy placed on top of Vercel rewrites `x-forwarded-for`.
 *
 * Off Vercel — local `next dev`, a self-hosted build, or any deployment where
 * an untrusted hop can reach the function directly — every header here is
 * attacker-controlled, and a caller can mint a fresh bucket per request simply
 * by varying it. Do not treat per-IP limiting as a security boundary on its
 * own; the global backstop in the caller is what bounds total damage when this
 * key is defeated.
 */
export function clientKey(request: Request): string {
  const candidates = [
    request.headers.get("x-vercel-forwarded-for"),
    request.headers.get("x-forwarded-for"),
    request.headers.get("x-real-ip"),
  ];

  for (const candidate of candidates) {
    // Vercel delivers a single address here. The leftmost entry is only the
    // right pick because the value is platform-controlled — if this ever runs
    // behind an appending proxy, the leftmost entry becomes client-supplied.
    const ip = candidate?.split(",")[0]?.trim();
    if (ip) return ip;
  }

  // No usable header: share one bucket rather than granting an unlimited one.
  return "unknown";
}
