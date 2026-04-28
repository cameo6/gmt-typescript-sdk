// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';

/**
 * Webhook testing and documentation.
 *
 * ## Webhook Payload Types
 *
 * When you provide `callback_url` in `POST /purchases/:id/request-code`, your endpoint will receive one of the following payloads:
 *
 * - **WebhookSuccessPayload** — sent when verification code is successfully retrieved
 * - **WebhookFailedPayload** — sent when code retrieval fails after all retry attempts
 *
 * When you provide `callback_url` in `POST /purchases/bulk`, your endpoint will receive:
 *
 * - **WebhookBulkReadyPayload** — sent when bulk archive is ready
 *
 * See the **Models** section below for detailed payload structure.
 *
 * ## Requirements
 *
 * - Your endpoint **must return HTTP 200** to acknowledge receipt
 * - Response timeout: **5 seconds**
 * - Failed deliveries are retried up to **3 times** (immediately, after 10s, after 30s)
 *
 * ## Testing
 *
 * Use `POST /v1/webhooks/test` to verify your endpoint. Get a temporary test URL at https://webhook.site
 */
export class Webhooks extends APIResource {
  /**
   * Sends a test webhook to the specified URL and returns the result.
   *
   * **Use case.** Verify your webhook endpoint is correctly configured before using
   * it in production.
   *
   * **Payload types:**
   *
   * - `success` - simulates successful code retrieval with verification data
   * - `failed` - simulates failed code retrieval with error message
   *
   * **Your endpoint must return HTTP 200** to indicate successful receipt.
   *
   * **Testing tool.** Use https://webhook.site to get a temporary URL for testing.
   *
   * **No persistence.** Test webhooks are not stored in delivery history.
   *
   * @example
   * ```ts
   * const response = await client.webhooks.test({
   *   type: 'success',
   *   url: 'https://example.com/webhooks/handler',
   * });
   * ```
   */
  test(body: WebhookTestParams, options?: RequestOptions): APIPromise<WebhookTestResponse> {
    return this._client.post(
      '/v1/webhooks/test',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

/**
 * Result of webhook test request.
 */
export interface WebhookTestResponse {
  /**
   * Whether the webhook was delivered successfully (HTTP 200).
   */
  success: boolean;

  /**
   * Error message if delivery failed.
   */
  error?: string;

  /**
   * HTTP status code returned by your endpoint.
   */
  http_code?: number;

  /**
   * Response body from your endpoint (truncated to 1000 characters).
   */
  response_body?: string;

  /**
   * Response time in milliseconds.
   */
  response_time_ms?: number;
}

export interface WebhookTestParams {
  /**
   * Webhook payload type to send: `success` or `failed`.
   */
  type: 'success' | 'failed';

  /**
   * Webhook endpoint URL. Must be a valid URL.
   */
  url: string;
}

export declare namespace Webhooks {
  export { type WebhookTestResponse as WebhookTestResponse, type WebhookTestParams as WebhookTestParams };
}
