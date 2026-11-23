import { NextResponse } from 'next/server'

/**
 * Hourly ORBS/USD prices for the OIP-10 burn tracker (`public/oip10-burn/`).
 *
 * The page used to call CoinGecko's free public API from the browser, which
 * rate limits (429) after a handful of loads. This route fetches the same
 * series from CoinGecko Pro on the server and lets the CDN cache it, so most
 * visitors never reach CoinGecko at all.
 *
 * SETUP: `COINGECKO_API_KEY` must be set as a server environment variable in
 * Vercel (Production and Preview). The key comes from the CoinGecko Basic
 * plan. It is read here only and never sent to the browser.
 *
 * `COINGECKO_BASE_URL` is a test only override (default
 * `https://pro-api.coingecko.com`) used to point the route at a local mock
 * upstream. Leave it unset in Vercel.
 *
 * The upstream URL is fixed and nothing from the request is forwarded, so the
 * route cannot be used as a proxy. The body keeps CoinGecko's shape,
 * `{ prices: [[ms, price], ...] }`, which is what the page validates.
 *
 * Fetch it with the trailing slash (`/api/oip10-burn/prices/`):
 * `trailingSlash: true` 308s the slashless form.
 */

const DEFAULT_BASE_URL = 'https://pro-api.coingecko.com'
const PATH = '/api/v3/coins/orbs/market_chart?vs_currency=usd&days=15&precision=full'
// Per burn pricing weeks: ?week=YYYY-MM-DD (a Monday, 00:00 UTC). Only that
// validated date is used, to build a fixed range URL, so this is still not a proxy.
const RANGE_PATH = '/api/v3/coins/orbs/market_chart/range?vs_currency=usd&precision=full'
const DAY_MS = 86_400_000
const WEEK_MS = 7 * DAY_MS
const PAD_MS = 2 * 3600_000
const FIRST_WEEK = Date.UTC(2026, 9, 5) // earliest pricing week served (Mon Oct 5 2026)
const CLOSED_S_MAXAGE = 86400
const CLOSED_SWR = 604800

/** Returns the Monday start (ms) for a valid ?week=, null when absent, NaN when invalid. */
function parseWeek(req: Request): number | null {
  const w = new URL(req.url).searchParams.get('week')
  if (w === null) return null
  if (!/^\d{4}-\d{2}-\d{2}$/.test(w)) return NaN
  const s = Date.parse(w + 'T00:00:00Z')
  if (!Number.isFinite(s) || new Date(s).toISOString().slice(0, 10) !== w) return NaN
  if (new Date(s).getUTCDay() !== 1) return NaN
  if (s < FIRST_WEEK || s > Date.now()) return NaN
  return s
}
const TIMEOUT_MS = 10_000
const S_MAXAGE = 1800
const SWR = 3600

// Rendered per request; the CDN (Cache-Control below) does the caching. A
// build time prerender would bake in whatever the build saw, keys or not.
export const dynamic = 'force-dynamic'

function error(status: number, message: string) {
  return NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } })
}

function validPrices(body: unknown): body is { prices: [number, number][] } {
  if (!body || typeof body !== 'object') return false
  const prices = (body as { prices?: unknown }).prices
  return (
    Array.isArray(prices) &&
    prices.length > 0 &&
    prices.every(
      (p) =>
        Array.isArray(p) &&
        p.length >= 2 &&
        typeof p[0] === 'number' &&
        Number.isFinite(p[0]) &&
        typeof p[1] === 'number' &&
        Number.isFinite(p[1])
    )
  )
}

export async function GET(req: Request) {
  const key = process.env.COINGECKO_API_KEY
  if (!key) return error(503, 'Price source is not configured')

  const base = process.env.COINGECKO_BASE_URL || DEFAULT_BASE_URL
  const week = parseWeek(req)
  if (week !== null && Number.isNaN(week)) return error(400, 'Invalid week')
  // A week counts as closed once its end plus padding is over an hour in the past.
  const closed = week !== null && Date.now() > week + WEEK_MS + PAD_MS + 3600_000
  const upstream =
    week === null
      ? base + PATH
      : base +
        RANGE_PATH +
        '&from=' +
        Math.floor((week - PAD_MS) / 1000) +
        '&to=' +
        Math.floor((week + WEEK_MS + PAD_MS) / 1000)
  const maxAge = closed ? CLOSED_S_MAXAGE : S_MAXAGE

  let body: unknown
  try {
    const res = await fetch(upstream, {
      headers: { Accept: 'application/json', 'x-cg-pro-api-key': key },
      // Next data cache: bounds paid upstream calls however the route is requested
      // (Authorization-header requests skip the CDN), and a failed revalidation
      // keeps serving the last good copy.
      next: { revalidate: maxAge },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) return error(503, `Price source unavailable (HTTP ${res.status})`)
    body = await res.json()
  } catch (err) {
    const timedOut = err instanceof Error && err.name === 'TimeoutError'
    return error(503, timedOut ? 'Price source timed out' : 'Price source unavailable')
  }

  if (!validPrices(body)) return error(502, 'Price source returned an invalid response')

  return NextResponse.json(
    { prices: body.prices.map((p) => [p[0], p[1]]) },
    {
      headers: {
        'Cache-Control': closed
          ? `public, s-maxage=${CLOSED_S_MAXAGE}, stale-while-revalidate=${CLOSED_SWR}`
          : `public, s-maxage=${S_MAXAGE}, stale-while-revalidate=${SWR}`,
      },
    }
  )
}
