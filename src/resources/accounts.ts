// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PageNumber, type PageNumberParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Accounts extends APIResource {
  /**
   * Returns detailed pricing breakdown for a specific country, showing how the
   * user's discount is applied.
   *
   * **Response includes:**
   *
   * - `price` — final price after user's personal discount
   * - `discount.base_price` — price before discount
   * - `discount.percent` — discount percentage applied
   *
   * **Use case.** Account detail/checkout page where user needs to see both the
   * original price and their discounted price.
   *
   * **Example.** If base price is $3.00 and user has 10% discount:
   *
   * - `price.amount`: `"2.70"`
   * - `discount.base_price`: `"3.00"`
   * - `discount.percent`: `10`
   */
  retrieve(countryCode: string, options?: RequestOptions): APIPromise<AccountRetrieveResponse> {
    return this._client.get(path`/v1/accounts/${countryCode}`, options);
  }

  /**
   * Returns paginated list of available accounts with **user-specific pricing**
   * (personal discount applied).
   *
   * **Pricing.** Prices reflect the authenticated user's discount level. To see base
   * prices without discount, use `GET /accounts/countries`.
   *
   * **Difference from `/accounts/countries`:**
   *
   * - Requires authentication
   * - Prices include user's personal discount
   *
   * **Filtering.** Use `country_codes` to request specific countries (e.g.,
   * `US,RU,GB`).
   *
   * **Sorting options:** `price_asc`, `price_desc`, `name_asc`, `name_desc`,
   * `popularity_asc`, `popularity_desc`.
   */
  list(
    query: AccountListParams,
    options?: RequestOptions,
  ): PagePromise<AccountListResponsesPageNumber, AccountListResponse> {
    return this._client.getAPIList('/v1/accounts/', PageNumber<AccountListResponse>, { query, ...options });
  }

  /**
   * Returns paginated list of all available countries with **base pricing** (no user
   * discount applied). No authentication required.
   *
   * **Use case.** Public catalog for the website landing page. Shows general pricing
   * and stock availability.
   *
   * **Pricing.** Prices are base prices before any user discount. For personalized
   * pricing, use `GET /accounts` (requires authentication).
   *
   * **Filtering.** Use `country_codes` to request specific countries (e.g.,
   * `US,RU,GB`).
   *
   * **Sorting options:** `price_asc`, `price_desc`, `name_asc`, `name_desc`,
   * `popularity_asc`, `popularity_desc`.
   */
  listCountries(
    query: AccountListCountriesParams,
    options?: RequestOptions,
  ): PagePromise<AccountListCountriesResponsesPageNumber, AccountListCountriesResponse> {
    return this._client.getAPIList('/v1/accounts/countries', PageNumber<AccountListCountriesResponse>, {
      query,
      ...options,
    });
  }
}

export type AccountListResponsesPageNumber = PageNumber<AccountListResponse>;

export type AccountListCountriesResponsesPageNumber = PageNumber<AccountListCountriesResponse>;

export interface AccountRetrieveResponse {
  /**
   * Indicates if account is available for purchase.
   */
  available: boolean;

  /**
   * ISO 3166-1 alpha-2 country code (e.g., US, RU, GB).
   */
  country_code: string;

  discount: AccountRetrieveResponse.Discount;

  display_name: AccountRetrieveResponse.DisplayName;

  /**
   * Country flag emoji.
   */
  emoji: string;

  price: AccountRetrieveResponse.Price;

  /**
   * Account tags (e.g., HIGH_QUALITY for premium accounts).
   */
  tags: Array<'HIGH_QUALITY' | 'HIGH_DEMAND'>;
}

export namespace AccountRetrieveResponse {
  export interface Discount {
    /**
     * Original price without discount.
     */
    base_price: string;

    /**
     * Discount percentage applied to this user.
     */
    percent: number;
  }

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
}

export interface AccountListResponse {
  /**
   * Indicates if account is available for purchase.
   */
  available: boolean;

  base_price: AccountListResponse.BasePrice;

  /**
   * ISO 3166-1 alpha-2 country code (e.g., US, RU, GB).
   */
  country_code: string;

  display_name: AccountListResponse.DisplayName;

  /**
   * Country flag emoji.
   */
  emoji: string;

  /**
   * Relative popularity of this country based on recent purchase volume.
   */
  popularity_index: number;

  price: AccountListResponse.Price;

  /**
   * Account tags (e.g., HIGH_QUALITY for premium accounts).
   */
  tags: Array<'HIGH_QUALITY' | 'HIGH_DEMAND'>;

  /**
   * Number of available accounts for this country.
   */
  available_count?: number | null;
}

export namespace AccountListResponse {
  export interface BasePrice {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }

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
}

export interface AccountListCountriesResponse {
  /**
   * Indicates if account is available for purchase.
   */
  available: boolean;

  base_price: AccountListCountriesResponse.BasePrice;

  /**
   * ISO 3166-1 alpha-2 country code (e.g., US, RU, GB).
   */
  country_code: string;

  display_name: AccountListCountriesResponse.DisplayName;

  /**
   * Country flag emoji.
   */
  emoji: string;

  /**
   * Relative popularity of this country based on recent purchase volume.
   */
  popularity_index: number;

  price: AccountListCountriesResponse.Price;

  /**
   * Account tags (e.g., HIGH_QUALITY for premium accounts).
   */
  tags: Array<'HIGH_QUALITY' | 'HIGH_DEMAND'>;

  /**
   * Number of available accounts for this country.
   */
  available_count?: number | null;
}

export namespace AccountListCountriesResponse {
  export interface BasePrice {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }

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
}

export interface AccountListParams extends PageNumberParams {
  /**
   * Sort order for accounts.
   */
  sort: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'popularity_asc' | 'popularity_desc';

  /**
   * Filter by country codes. Comma-separated list of ISO 3166-1 alpha-2 codes (e.g.,
   * 'US,RU,GB').
   */
  country_codes?: string;
}

export interface AccountListCountriesParams extends PageNumberParams {
  /**
   * Sort order for accounts.
   */
  sort: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc' | 'popularity_asc' | 'popularity_desc';

  /**
   * Filter by country codes. Comma-separated list of ISO 3166-1 alpha-2 codes (e.g.,
   * 'US,RU,GB').
   */
  country_codes?: string;
}

export declare namespace Accounts {
  export {
    type AccountRetrieveResponse as AccountRetrieveResponse,
    type AccountListResponse as AccountListResponse,
    type AccountListCountriesResponse as AccountListCountriesResponse,
    type AccountListResponsesPageNumber as AccountListResponsesPageNumber,
    type AccountListCountriesResponsesPageNumber as AccountListCountriesResponsesPageNumber,
    type AccountListParams as AccountListParams,
    type AccountListCountriesParams as AccountListCountriesParams,
  };
}
