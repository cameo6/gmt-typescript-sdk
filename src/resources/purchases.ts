// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PageNumber, type PageNumberParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../internal/uploads';
import { path } from '../internal/utils/path';

export class Purchases extends APIResource {
  /**
   * Creates a new purchase for specified country. Deducts balance immediately and
   * returns purchase with `PENDING` status.
   *
   * **Purchase Creation Process**
   *
   * 1. Validates country availability and user balance.
   * 2. Reserves account from provider.
   * 3. Atomically deducts balance and creates purchase record.
   * 4. Returns purchase in `PENDING` status.
   *
   * **Next steps.** Call `POST /purchases/:id/request-code` to retrieve login
   * credentials.
   *
   * **Country availability.** Accounts may become unavailable between checking
   * `/accounts` and creating purchase. Always handle availability errors gracefully.
   *
   * @example
   * ```ts
   * const purchase = await client.purchases.create({
   *   country_code: 'US',
   * });
   * ```
   */
  create(body: PurchaseCreateParams, options?: RequestOptions): APIPromise<PurchaseCreateResponse> {
    return this._client.post(
      '/v1/purchases/',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Returns detailed information about specific purchase including verification data
   * if available.
   *
   * **Security.** Verification data is only visible to the purchase owner.
   *
   * @example
   * ```ts
   * const purchase = await client.purchases.retrieve(12345);
   * ```
   */
  retrieve(purchaseID: number, options?: RequestOptions): APIPromise<PurchaseRetrieveResponse> {
    return this._client.get(path`/v1/purchases/${purchaseID}`, options);
  }

  /**
   * Returns paginated list of user's purchases with optional status filtering.
   *
   * **Chronological Ordering.** Purchases are always returned **newest first**
   * (descending by `created_at`).
   *
   * **Pagination behavior**
   *
   * - Results are consistent during session (no duplicates or missing items when
   *   paginating).
   * - `has_next: true` indicates more pages available.
   * - Maximum `page_size` is 50 items.
   *
   * **Filtering.** Combine `status` filter with pagination for subset queries (e.g.,
   * all successful purchases).
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const purchaseListResponse of client.purchases.list(
   *   { page: 1, page_size: 50 },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    query: PurchaseListParams,
    options?: RequestOptions,
  ): PagePromise<PurchaseListResponsesPageNumber, PurchaseListResponse> {
    return this._client.getAPIList('/v1/purchases/', PageNumber<PurchaseListResponse>, { query, ...options });
  }

  /**
   * Requests verification code and password from provider. Updates purchase status
   * to SUCCESS.
   *
   * **Idempotent Operation.** Safe to retry on network errors - will not generate
   * duplicate codes.
   *
   * **Behavior.**
   *
   * - First call: Fetches code from provider, updates status to `SUCCESS`
   * - Subsequent calls: Returns conflict error (use `GET /purchases/:id` to retrieve
   *   existing code)
   *
   * **Provider timeout.** Code retrieval may take 5-30 seconds depending on provider
   * availability.
   *
   * @example
   * ```ts
   * const response =
   *   await client.purchases.requestVerificationCode(12345);
   * ```
   */
  requestVerificationCode(
    purchaseID: number,
    options?: RequestOptions,
  ): APIPromise<PurchaseRequestVerificationCodeResponse> {
    return this._client.post(path`/v1/purchases/${purchaseID}/request-code`, options);
  }
}

export type PurchaseListResponsesPageNumber = PageNumber<PurchaseListResponse>;

export interface PurchaseCreateResponse {
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

  display_name: PurchaseCreateResponse.DisplayName;

  /**
   * **E.164 International Format.** Phone number with country code prefix (e.g.,
   * `+12025550123` for US, `+79991234567` for Russia).
   *
   * **Usage.** This is your Telegram account login. Use it with `verification.code`
   * and `verification.password` to access the account.
   */
  phone_number: string;

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
  price: PurchaseCreateResponse.Price;

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
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';

  /**
   * **Verification Credentials.** Login credentials for the purchased Telegram
   * account. Initially `null` after purchase creation.
   *
   * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
   * Once received, credentials are permanent and cannot be re-requested.
   *
   * **Security.** Verification data is only visible to the purchase owner.
   */
  verification: PurchaseCreateResponse.Verification | null;
}

export namespace PurchaseCreateResponse {
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
    password: string;

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

export interface PurchaseRetrieveResponse {
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

  display_name: PurchaseRetrieveResponse.DisplayName;

  /**
   * **E.164 International Format.** Phone number with country code prefix (e.g.,
   * `+12025550123` for US, `+79991234567` for Russia).
   *
   * **Usage.** This is your Telegram account login. Use it with `verification.code`
   * and `verification.password` to access the account.
   */
  phone_number: string;

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
  price: PurchaseRetrieveResponse.Price;

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
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';

  /**
   * **Verification Credentials.** Login credentials for the purchased Telegram
   * account. Initially `null` after purchase creation.
   *
   * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
   * Once received, credentials are permanent and cannot be re-requested.
   *
   * **Security.** Verification data is only visible to the purchase owner.
   */
  verification: PurchaseRetrieveResponse.Verification | null;
}

export namespace PurchaseRetrieveResponse {
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
    password: string;

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

export interface PurchaseListResponse {
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

  display_name: PurchaseListResponse.DisplayName;

  /**
   * **E.164 International Format.** Phone number with country code prefix (e.g.,
   * `+12025550123` for US, `+79991234567` for Russia).
   *
   * **Usage.** This is your Telegram account login. Use it with `verification.code`
   * and `verification.password` to access the account.
   */
  phone_number: string;

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
  price: PurchaseListResponse.Price;

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
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';

  /**
   * **Verification Credentials.** Login credentials for the purchased Telegram
   * account. Initially `null` after purchase creation.
   *
   * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
   * Once received, credentials are permanent and cannot be re-requested.
   *
   * **Security.** Verification data is only visible to the purchase owner.
   */
  verification: PurchaseListResponse.Verification | null;
}

export namespace PurchaseListResponse {
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
    password: string;

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

export interface PurchaseRequestVerificationCodeResponse {
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

  display_name: PurchaseRequestVerificationCodeResponse.DisplayName;

  /**
   * **E.164 International Format.** Phone number with country code prefix (e.g.,
   * `+12025550123` for US, `+79991234567` for Russia).
   *
   * **Usage.** This is your Telegram account login. Use it with `verification.code`
   * and `verification.password` to access the account.
   */
  phone_number: string;

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
  price: PurchaseRequestVerificationCodeResponse.Price;

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
  status: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';

  /**
   * **Verification Credentials.** Login credentials for the purchased Telegram
   * account. Initially `null` after purchase creation.
   *
   * **Availability.** Populated after calling `POST /purchases/:id/request-code`.
   * Once received, credentials are permanent and cannot be re-requested.
   *
   * **Security.** Verification data is only visible to the purchase owner.
   */
  verification: PurchaseRequestVerificationCodeResponse.Verification | null;
}

export namespace PurchaseRequestVerificationCodeResponse {
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
    password: string;

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

export interface PurchaseCreateParams {
  /**
   * ISO 3166-1 alpha-2 country code.
   */
  country_code: string;
}

export interface PurchaseListParams extends PageNumberParams {
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
  status?: 'PENDING' | 'SUCCESS' | 'ERROR' | 'REFUND';
}

export declare namespace Purchases {
  export {
    type PurchaseCreateResponse as PurchaseCreateResponse,
    type PurchaseRetrieveResponse as PurchaseRetrieveResponse,
    type PurchaseListResponse as PurchaseListResponse,
    type PurchaseRequestVerificationCodeResponse as PurchaseRequestVerificationCodeResponse,
    type PurchaseListResponsesPageNumber as PurchaseListResponsesPageNumber,
    type PurchaseCreateParams as PurchaseCreateParams,
    type PurchaseListParams as PurchaseListParams,
  };
}
