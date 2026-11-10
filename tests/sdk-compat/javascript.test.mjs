import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import test from 'node:test'
import Gmt, { APIConnectionTimeoutError, APIError } from 'gmt-typescript-sdk'
import { Profile } from 'gmt-typescript-sdk/resources/profile'

const options = { baseURL: process.env.SDK_TEST_URL, maxRetries: 0, timeout: 2000 }

test('CommonJS can load the client and resource subpaths', () => {
  const require = createRequire(import.meta.url)
  const { default: Client, APIError: ErrorClass } = require('gmt-typescript-sdk')
  const { Profile: Resource } = require('gmt-typescript-sdk/resources/profile')

  assert.ok(new Client(options).profile instanceof Resource)
  assert.ok(new (require('gmt-typescript-sdk'))(options).profile instanceof Resource)
  assert.equal(typeof ErrorClass, 'function')
})

test('JavaScript can import resources and use the injected fetch transport', async () => {
  const requests = []
  const client = new Gmt({
    ...options,
    fetch: (url, init) => {
      requests.push(new URL(url).pathname)

      return fetch(url, init)
    },
  })

  assert.ok(client.profile instanceof Profile)

  const health = await client.service.healthCheck()

  assert.equal(health.status, 'ok')
  assert.equal(health.uptimeSeconds, 42)
  assert.deepEqual(requests, ['/v1/service/health'])
})

const authCases = [
  ['API key', { apiKey: 'test-api-key' }],
  ['Bearer', { defaultHeaders: { Authorization: 'Bearer test-bearer' } }],
]

for (const [name, auth] of authCases) {
  const description = `JavaScript iterates both purchase pages with ${name} auth`

  test(description, async () => {
    const client = new Gmt({ ...options, ...auth })
    const pages = client.purchases.list({ page: 1, page_size: 1 })
    const ids = []

    for await (const purchase of pages) ids.push(purchase.id)

    assert.deepEqual(ids, [101, 102])
  })
}

test('JavaScript preserves the API error class, HTTP status, and body', async () => {
  const client = new Gmt({ ...options, apiKey: 'invalid' })

  await assert.rejects(client.purchases.list({ page: 1, page_size: 1 }), error => {
    assert.ok(error instanceof APIError)
    assert.equal(error.status, 401)
    assert.equal(error.error.details[0].reason, 'INVALID_TOKEN')

    return true
  })
})

test('JavaScript exposes a typed connection timeout', async () => {
  const client = new Gmt({
    ...options,
    timeout: 100,
    defaultHeaders: { 'x-test-slow-response': 'true' },
  })

  await assert.rejects(client.service.healthCheck(), APIConnectionTimeoutError)
})

test('JavaScript preserves the purchase body and caller-supplied idempotency key', async () => {
  const client = new Gmt({ ...options, apiKey: 'test-api-key' })
  const purchase = await client.purchases.create(
    { country_code: 'US' },
    { headers: { 'Idempotency-Key': 'test-order' } },
  )

  assert.equal(purchase.status, 'PENDING')
})

test('JavaScript encodes a purchase hash as one path segment', async () => {
  const client = new Gmt({ ...options, apiKey: 'test-api-key' })
  const purchase = await client.purchasesByHash.retrieve('order/103')

  assert.equal(purchase.id, 103)
})

test(
  'JavaScript keeps purchase keys across retries and generates a fresh key for a new call',
  {
    skip: !process.env.SDK_COMPAT_RELEASE,
  },
  async () => {
    const keys = []
    const client = new Gmt({
      ...options,
      maxRetries: 1,
      apiKey: 'test-api-key',
      fetch: async (_, init) => {
        keys.push(new Headers(init.headers).get('Idempotency-Key'))

        return new Response('{"id":103}', {
          status: keys.length % 2 ? 503 : 200,
          headers: { 'content-type': 'application/json', 'retry-after-ms': '1' },
        })
      },
    })

    await client.purchases.create({ country_code: 'US' }, { idempotencyKey: 'explicit-order' })
    await client.purchases.bulk.create({ country_code: 'US', quantity: 1 })
    await client.purchases.bulk.create({ country_code: 'US', quantity: 1 })

    assert.deepEqual(keys.slice(0, 2), ['explicit-order', 'explicit-order'])
    assert.ok(keys[2])
    assert.ok(keys[4])
    assert.equal(keys[2], keys[3])
    assert.equal(keys[4], keys[5])
    assert.notEqual(keys[2], keys[4])
  },
)

test(
  'JavaScript reads both purchase list endpoints from main',
  {
    skip: !process.env.SDK_COMPAT_RELEASE,
  },
  async () => {
    const client = new Gmt({ ...options, apiKey: 'test-api-key' })
    const history = await client.purchases.history({ page: 1 })
    const bulk = await client.purchases.bulk.list({ page: 1 })

    assert.equal(history.items[0].kind, 'purchase')
    assert.equal(bulk.items[0].bulk_purchase_id, 104)
  },
)
