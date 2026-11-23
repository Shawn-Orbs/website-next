import { NextResponse } from 'next/server'
import { isSameOrigin } from '@/lib/same-origin'

/**
 * Ethereum JSON-RPC proxy for the OIP-10 burn tracker (`public/oip10-burn/`).
 *
 * The rpcman key stays on the server: the page posts to /api/oip10-burn/rpc/
 * and never sees it. Only the four read calls the page makes are forwarded,
 * with their parameters checked, so the route cannot be used as a general RPC.
 *
 * SETUP: set `RPCMAN_KEY` (and optionally `RPCMAN_APP_ID`, default
 * `oip10-burn`) as server environment variables in Vercel (Production and
 * Preview). Without the key the route returns 503 and the page shows its
 * existing "Unavailable" state.
 */

const UPSTREAM = 'https://rpcman.orbs.network/rpc'
const TIMEOUT_MS = 15_000
const TOKEN = '0xff56cc6b1e6ded347aa0b7676c85ab0b3d08b0fa'
const BALANCE_OF = '0x70a08231'
const TRANSFER = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
const CONTROLLER = '0x000000000000000000000000189a5caf060b94961f0d4f3e56ad0d678ebb6c12'
const BURN = '0x000000000000000000000000000000000000000000000000000000000000dead'
const MAX_RANGE = 7200
const HEX = /^0x[0-9a-f]{1,16}$/

export const dynamic = 'force-dynamic'

function error(status: number, message: string) {
  return NextResponse.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } })
}

const lc = (v: unknown) => (typeof v === 'string' ? v.toLowerCase() : '')
const isObj = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v)

function allowed(method: unknown, params: unknown): boolean {
  if (!Array.isArray(params)) return false
  switch (method) {
    case 'eth_blockNumber':
      return params.length === 0
    case 'eth_getBlockByNumber':
      return params.length === 2 && HEX.test(lc(params[0])) && params[1] === false
    case 'eth_call': {
      const [tx, tag] = params
      return (
        params.length === 2 &&
        isObj(tx) &&
        Object.keys(tx).length === 2 &&
        lc(tx.to) === TOKEN &&
        /^0x70a08231[0-9a-f]{64}$/.test(lc(tx.data)) &&
        lc(tx.data).startsWith(BALANCE_OF) &&
        HEX.test(lc(tag))
      )
    }
    case 'eth_getLogs': {
      const f = params[0]
      if (params.length !== 1 || !isObj(f) || Object.keys(f).length !== 4) return false
      const t = f.topics
      if (lc(f.address) !== TOKEN || !Array.isArray(t) || t.length !== 3) return false
      if (lc(t[0]) !== TRANSFER || lc(t[1]) !== CONTROLLER || lc(t[2]) !== BURN) return false
      const from = lc(f.fromBlock)
      const to = lc(f.toBlock)
      if (!HEX.test(from) || !HEX.test(to)) return false
      const range = parseInt(to, 16) - parseInt(from, 16)
      return range >= 0 && range < MAX_RANGE
    }
    default:
      return false
  }
}

export async function POST(req: Request) {
  // Refuse cross-site requests before spending any rpcman quota. Same two locks
  // as the contact route: Sec-Fetch-Site / Origin must match this site, and the
  // body must be declared application/json, which forces a CORS preflight that
  // cannot pass (see `same-origin.ts`).
  if (!isSameOrigin(req.headers)) return error(403, 'Forbidden')
  if (!req.headers.get('content-type')?.startsWith('application/json')) {
    return error(415, 'Content-Type must be application/json')
  }

  const key = process.env.RPCMAN_KEY
  if (!key) return error(503, 'RPC is not configured')

  let body: unknown
  try {
    const text = await req.text()
    if (text.length > 2048) return error(413, 'Request too large')
    body = JSON.parse(text)
  } catch {
    return error(400, 'Invalid JSON')
  }
  if (!isObj(body) || body.jsonrpc !== '2.0' || !allowed(body.method, body.params)) {
    return error(400, 'Request not allowed')
  }

  const url =
    UPSTREAM +
    '?key=' +
    encodeURIComponent(key) +
    '&chainId=1&appId=' +
    encodeURIComponent(process.env.RPCMAN_APP_ID || 'oip10-burn')
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: typeof body.id === 'number' ? body.id : 1,
        method: body.method,
        params: body.params,
      }),
      cache: 'no-store',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })
    if (!res.ok) return error(502, `RPC unavailable (HTTP ${res.status})`)
    const json: unknown = await res.json()
    if (!isObj(json)) return error(502, 'RPC returned an invalid response')
    return NextResponse.json(json, { headers: { 'Cache-Control': 'no-store' } })
  } catch (err) {
    const timedOut = err instanceof Error && err.name === 'TimeoutError'
    return error(502, timedOut ? 'RPC timed out' : 'RPC unavailable')
  }
}
