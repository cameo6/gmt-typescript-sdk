// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';

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
   * Webhook endpoint URL. Must be a valid URL.
   */
  url: string;

  /**
   * Webhook payload type to send: `success` or `failed`.
   */
  type?: 'success' | 'failed';
}

export declare namespace Webhooks {
  export { type WebhookTestResponse as WebhookTestResponse, type WebhookTestParams as WebhookTestParams };
}
