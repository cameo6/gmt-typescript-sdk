// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

/**
 * Purchase history and management.
 */
export class PurchasesByHash extends APIResource {
  /**
   * Returns detailed information about specific purchase by its hash code including
   * verification data if available.
   *
   * **No authentication required.** The hash code serves as the access token.
   *
   * @example
   * ```ts
   * const purchasesByHash =
   *   await client.purchasesByHash.retrieve(
   *     'abc-def-1234567890',
   *   );
   * ```
   */
  retrieve(hash: string, options?: RequestOptions): APIPromise<PurchasesByHashRetrieveResponse> {
    return this._client.get(path`/v1/purchases-by-hash/${hash}`, options);
  }

  /**
   * Requests verification code and password from provider using purchase hash code.
   * Updates purchase status to SUCCESS.
   *
   * **No authentication required.** The hash code serves as the access token.
   *
   * **Idempotent Operation.** Safe to retry on network errors - will not generate
   * duplicate codes.
   *
   * @example
   * ```ts
   * const response =
   *   await client.purchasesByHash.requestVerificationCode(
   *     'abc-def-1234567890',
   *   );
   * ```
   */
  requestVerificationCode(
    hash: string,
    body: PurchasesByHashRequestVerificationCodeParams,
    options?: RequestOptions,
  ): APIPromise<PurchasesByHashRequestVerificationCodeResponse> {
    return this._client.post(
      path`/v1/purchases-by-hash/${hash}/request-code`,
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface PurchasesByHashRetrieveResponse {
  /**
   * Unique purchase identifier.
   */
  id: number;

  /**
   * ISO 3166-1 alpha-2 country code.
   */
  country_code: string;

  /**
   * Purchase creation time in ISO 8601 format (UTC).
   */
  created_at: string;

  display_name: PurchasesByHashRetrieveResponse.DisplayName;

  /**
   * Country flag emoji.
   */
  emoji: string;

  /**
   * **E.164 International Format.** Phone number with country code prefix (e.g.,
   * `+12025550123` for US, `+79991234567` for Russia).
   *
   * **Usage.** This is your Telegram account login. Use it with `verification.code`
   * and `verification.password` to access the account.
   */
  phone_number: string | null;

  /**
   * **Final Price After Discount.** The actual amount deducted from your balance,
   * with your personal discount already applied.
   *
   * **To see pricing breakdown before purchase.** Check
   * `GET /accounts/:country_code` which shows both discounted price and original
   * `base_price`.
   *
   * **Discount eligibility.** Based on your total successful purchase count. Higher
   * volume = bigger discounts.
   */
  price: PurchasesByHashRetrieveResponse.Price;

  /**
   * Type of purchase: SINGLE (regular), BULK (batch purchase), ADMIN (admin
   * deduction)
   */
  purchase_type: 'SINGLE' | 'BULK' | 'ADMIN';

  /**
   * **Purchase Status Lifecycle.** `PENDING` (initial) → `SUCCESS` (after code
   * request) or `ERROR` (provider failure). Any status can transition to `REFUND`
   * via admin action.
   *
   * **Important.** Status is immutable once set to `SUCCESS`, `ERROR`, or `REFUND`.
   *
   * **Filter options**
   *
   * - `PENDING` - code not requested.
   * - `SUCCESS` - code ready.
   * - `ERROR` - provider failed.
   * - `REFUND` - money returned.
   */
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND' | 'EXPIRED';

  /**
   * **Verification Credentials.** Login credentials for the purchased Telegram
   * account. Initially `null` after purchase creation.
   *
   * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
   * Once received, credentials are permanent and cannot be re-requested.
   *
   * **Security.** Verification data is only visible to the purchase owner.
   */
  verification: PurchasesByHashRetrieveResponse.Verification | null;
}

export namespace PurchasesByHashRetrieveResponse {
  export interface DisplayName {
    /**
     * Name in English.
     */
    en: string;

    /**
     * Name in Russian.
     */
    ru: string;
  }

  /**
   * **Final Price After Discount.** The actual amount deducted from your balance,
   * with your personal discount already applied.
   *
   * **To see pricing breakdown before purchase.** Check
   * `GET /accounts/:country_code` which shows both discounted price and original
   * `base_price`.
   *
   * **Discount eligibility.** Based on your total successful purchase count. Higher
   * volume = bigger discounts.
   */
  export interface Price {
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
   * **Verification Credentials.** Login credentials for the purchased Telegram
   * account. Initially `null` after purchase creation.
   *
   * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
   * Once received, credentials are permanent and cannot be re-requested.
   *
   * **Security.** Verification data is only visible to the purchase owner.
   */
  export interface Verification {
    /**
     * Verification code for account.
     */
    code: string;

    /**
     * Account password.
     */
    password: string | null;

    /**
     * **Code Retrieval Timestamp.** Marks when verification code was successfully
     * fetched from the provider (not when purchase was created).
     *
     * **Example timeline.**
     *
     * - `created_at`: `2024-11-19T10:00:00Z` (purchase created)
     * - `received_at`: `2024-11-19T10:05:02Z` (code requested 5 minutes later)
     *
     * **Note.** These timestamps may be identical if code is requested immediately
     * after purchase.
     */
    received_at: string;
  }
}

export interface PurchasesByHashRequestVerificationCodeResponse {
  code_request: PurchasesByHashRequestVerificationCodeResponse.CodeRequest;

  purchase: PurchasesByHashRequestVerificationCodeResponse.Purchase;
}

export namespace PurchasesByHashRequestVerificationCodeResponse {
  export interface CodeRequest {
    /**
     * Current attempt number
     */
    attempt: number;

    /**
     * Maximum number of attempts
     */
    max_attempts: number;

    /**
     * ISO timestamp of next attempt (null if not scheduled)
     */
    next_attempt_at: string | null;

    /**
     * Seconds until next attempt (null if not scheduled)
     */
    retry_after: number | null;

    /**
     * Current status of the code request
     */
    status: 'not_requested' | 'pending' | 'success' | 'failed';
  }

  export interface Purchase {
    /**
     * Unique purchase identifier.
     */
    id: number;

    /**
     * ISO 3166-1 alpha-2 country code.
     */
    country_code: string;

    /**
     * Purchase creation time in ISO 8601 format (UTC).
     */
    created_at: string;

    display_name: Purchase.DisplayName;

    /**
     * Country flag emoji.
     */
    emoji: string;

    /**
     * **E.164 International Format.** Phone number with country code prefix (e.g.,
     * `+12025550123` for US, `+79991234567` for Russia).
     *
     * **Usage.** This is your Telegram account login. Use it with `verification.code`
     * and `verification.password` to access the account.
     */
    phone_number: string | null;

    /**
     * **Final Price After Discount.** The actual amount deducted from your balance,
     * with your personal discount already applied.
     *
     * **To see pricing breakdown before purchase.** Check
     * `GET /accounts/:country_code` which shows both discounted price and original
     * `base_price`.
     *
     * **Discount eligibility.** Based on your total successful purchase count. Higher
     * volume = bigger discounts.
     */
    price: Purchase.Price;

    /**
     * Type of purchase: SINGLE (regular), BULK (batch purchase), ADMIN (admin
     * deduction)
     */
    purchase_type: 'SINGLE' | 'BULK' | 'ADMIN';

    /**
     * **Purchase Status Lifecycle.** `PENDING` (initial) → `SUCCESS` (after code
     * request) or `ERROR` (provider failure). Any status can transition to `REFUND`
     * via admin action.
     *
     * **Important.** Status is immutable once set to `SUCCESS`, `ERROR`, or `REFUND`.
     *
     * **Filter options**
     *
     * - `PENDING` - code not requested.
     * - `SUCCESS` - code ready.
     * - `ERROR` - provider failed.
     * - `REFUND` - money returned.
     */
    status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND' | 'EXPIRED';

    /**
     * **Verification Credentials.** Login credentials for the purchased Telegram
     * account. Initially `null` after purchase creation.
     *
     * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
     * Once received, credentials are permanent and cannot be re-requested.
     *
     * **Security.** Verification data is only visible to the purchase owner.
     */
    verification: Purchase.Verification | null;
  }

  export namespace Purchase {
    export interface DisplayName {
      /**
       * Name in English.
       */
      en: string;

      /**
       * Name in Russian.
       */
      ru: string;
    }

    /**
     * **Final Price After Discount.** The actual amount deducted from your balance,
     * with your personal discount already applied.
     *
     * **To see pricing breakdown before purchase.** Check
     * `GET /accounts/:country_code` which shows both discounted price and original
     * `base_price`.
     *
     * **Discount eligibility.** Based on your total successful purchase count. Higher
     * volume = bigger discounts.
     */
    export interface Price {
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
     * **Verification Credentials.** Login credentials for the purchased Telegram
     * account. Initially `null` after purchase creation.
     *
     * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
     * Once received, credentials are permanent and cannot be re-requested.
     *
     * **Security.** Verification data is only visible to the purchase owner.
     */
    export interface Verification {
      /**
       * Verification code for account.
       */
      code: string;

      /**
       * Account password.
       */
      password: string | null;

      /**
       * **Code Retrieval Timestamp.** Marks when verification code was successfully
       * fetched from the provider (not when purchase was created).
       *
       * **Example timeline.**
       *
       * - `created_at`: `2024-11-19T10:00:00Z` (purchase created)
       * - `received_at`: `2024-11-19T10:05:02Z` (code requested 5 minutes later)
       *
       * **Note.** These timestamps may be identical if code is requested immediately
       * after purchase.
       */
      received_at: string;
    }
  }
}

export interface PurchasesByHashRequestVerificationCodeParams {
  /**
   * URL to receive webhook notification when code is received. POST request will be
   * sent with either `WebhookSuccessPayload` or `WebhookFailedPayload`.
   *
   * **Retry policy.** If your endpoint does not return HTTP 200, webhook will be
   * retried up to 3 times with delays: immediately, after 10 seconds, after 30
   * seconds. Any non-200 response triggers retry.
   */
  callback_url?: string;
}

export declare namespace PurchasesByHash {
  export {
    type PurchasesByHashRetrieveResponse as PurchasesByHashRetrieveResponse,
    type PurchasesByHashRequestVerificationCodeResponse as PurchasesByHashRequestVerificationCodeResponse,
    type PurchasesByHashRequestVerificationCodeParams as PurchasesByHashRequestVerificationCodeParams,
  };
}
