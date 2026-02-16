// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { buildHeaders } from '../../internal/headers';
import { RequestOptions } from '../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../internal/uploads';
import { path } from '../../internal/utils/path';

export class Bulk extends APIResource {
  /**
   * Creates a new wholesale purchase for the specified country. Immediately debits
   * the balance and returns the purchase with the status “PENDING”.
   *
   * **Wholesale purchase creation process**
   *
   * 1. Checks the availability of the country and the user's balance.
   * 2. Reserves multiple accounts with the provider.
   * 3. Atomically debits the balance and creates a bulk purchase record.
   * 4. Returns the bulk purchase with the status “PENDING”.
   *
   * **Webhook notification.** Optionally provide `callback_url` to receive a webhook
   * when the archive is ready.
   *
   * **Next steps.** Call “GET /bulk/:purchaseId” to get the account archive link.
   *
   * @example
   * ```ts
   * const bulk = await client.purchases.bulk.create({
   *   country_code: 'US',
   *   quantity: 10,
   * });
   * ```
   */
  create(body: BulkCreateParams, options?: RequestOptions): APIPromise<BulkCreateResponse> {
    return this._client.post(
      '/v1/purchases/bulk',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Returns the status of a bulk purchase, including details and link to download
   * archive.
   *
   * @example
   * ```ts
   * const bulk = await client.purchases.bulk.retrieve(
   *   'purchase_id',
   * );
   * ```
   */
  retrieve(purchaseID: string, options?: RequestOptions): APIPromise<BulkRetrieveResponse> {
    return this._client.get(path`/v1/purchases/bulk/${purchaseID}`, options);
  }

  /**
   * Download the archive file containing multiple accounts from a successful bulk
   * purchase
   *
   * @example
   * ```ts
   * const response = await client.purchases.bulk.download(
   *   'purchase_id',
   * );
   *
   * const content = await response.blob();
   * console.log(content);
   * ```
   */
  download(purchaseID: string, options?: RequestOptions): APIPromise<Response> {
    return this._client.get(path`/v1/purchases/bulk/${purchaseID}/download`, {
      ...options,
      headers: buildHeaders([{ Accept: 'application/zip' }, options?.headers]),
      __binaryResponse: true,
    });
  }
}

export interface BulkCreateResponse {
  /**
   * Unique ID of the bulk purchase request
   */
  bulk_purchase_id: number;

  /**
   * ISO 3166-1 alpha-2 country code.
   */
  country_code: string;

  /**
   * Bulk purchase creation timestamp
   */
  created_at: string;

  /**
   * Archive data (only populated when status is SUCCESS)
   */
  item: BulkCreateResponse.Item | null;

  /**
   * Price of a single account
   */
  price_per_account: BulkCreateResponse.PricePerAccount;

  /**
   * Number of accounts in this purchase
   */
  quantity: number;

  /**
   * Current status of bulk purchase
   */
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';

  /**
   * Total price for all accounts
   */
  total_price: BulkCreateResponse.TotalPrice;

  /**
   * Last update timestamp
   */
  updated_at: string;
}

export namespace BulkCreateResponse {
  /**
   * Archive data (only populated when status is SUCCESS)
   */
  export interface Item {
    /**
     * Path or URL to download the archive with accounts
     */
    archive_url: string;

    /**
     * Bulk purchase creation timestamp
     */
    created_at: string;

    /**
     * Archive/export ID with sessions
     */
    export_id: string;

    /**
     * Number of accounts in the archive
     */
    quantity: number;

    /**
     * Status of bulk purchase
     */
    status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';
  }

  /**
   * Price of a single account
   */
  export interface PricePerAccount {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }

  /**
   * Total price for all accounts
   */
  export interface TotalPrice {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }
}

export interface BulkRetrieveResponse {
  /**
   * Unique ID of the bulk purchase request
   */
  bulk_purchase_id: number;

  /**
   * ISO 3166-1 alpha-2 country code.
   */
  country_code: string;

  /**
   * Bulk purchase creation timestamp
   */
  created_at: string;

  /**
   * Archive data (only populated when status is SUCCESS)
   */
  item: BulkRetrieveResponse.Item | null;

  /**
   * Price of a single account
   */
  price_per_account: BulkRetrieveResponse.PricePerAccount;

  /**
   * Number of accounts in this purchase
   */
  quantity: number;

  /**
   * Current status of bulk purchase
   */
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';

  /**
   * Total price for all accounts
   */
  total_price: BulkRetrieveResponse.TotalPrice;

  /**
   * Last update timestamp
   */
  updated_at: string;
}

export namespace BulkRetrieveResponse {
  /**
   * Archive data (only populated when status is SUCCESS)
   */
  export interface Item {
    /**
     * Path or URL to download the archive with accounts
     */
    archive_url: string;

    /**
     * Bulk purchase creation timestamp
     */
    created_at: string;

    /**
     * Archive/export ID with sessions
     */
    export_id: string;

    /**
     * Number of accounts in the archive
     */
    quantity: number;

    /**
     * Status of bulk purchase
     */
    status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';
  }

  /**
   * Price of a single account
   */
  export interface PricePerAccount {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }

  /**
   * Total price for all accounts
   */
  export interface TotalPrice {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }
}

export interface BulkCreateParams {
  /**
   * ISO 3166-1 alpha-2 country code.
   */
  country_code: string;

  /**
   * Number of accounts to purchase
   */
  quantity: number;

  /**
   * URL to receive webhook notification when bulk archive is ready. POST request
   * will be sent with `WebhookBulkReadyPayload`.
   *
   * **Retry policy.** If your endpoint does not return HTTP 200, webhook will be
   * retried up to 3 times with delays: immediately, after 10 seconds, after 30
   * seconds. Any non-200 response triggers retry.
   */
  callback_url?: string;
}

export declare namespace Bulk {
  export {
    type BulkCreateResponse as BulkCreateResponse,
    type BulkRetrieveResponse as BulkRetrieveResponse,
    type BulkCreateParams as BulkCreateParams,
  };
}
