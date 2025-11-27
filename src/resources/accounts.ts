// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Accounts extends APIResource {
  /**
   * Returns detailed information about account for specific country including
   * pricing and discount information.
   */
  retrieve(countryCode: string, options?: RequestOptions): APIPromise<AccountRetrieveResponse> {
    return this._client.get(path`/v1/accounts/${countryCode}`, options);
  }

  /**
   * Returns paginated list of accounts with filtering and sorting options.
   */
  list(query: AccountListParams, options?: RequestOptions): APIPromise<AccountListResponse> {
    return this._client.get('/v1/accounts/', { query, ...options });
  }

  /**
   * Returns a list of all available countries from providers with prices and
   * availability. No authentication required.
   */
  listCountries(
    query: AccountListCountriesParams,
    options?: RequestOptions,
  ): APIPromise<AccountListCountriesResponse> {
    return this._client.get('/v1/accounts/countries', { query, ...options });
  }
}

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

  price: AccountRetrieveResponse.Price;
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

/**
 * Successful response.
 */
export interface AccountListResponse {
  items: Array<AccountListResponse.Item>;

  pagination: AccountListResponse.Pagination;
}

export namespace AccountListResponse {
  export interface Item {
    /**
     * Indicates if account is available for purchase.
     */
    available: boolean;

    /**
     * ISO 3166-1 alpha-2 country code (e.g., US, RU, GB).
     */
    country_code: string;

    display_name: Item.DisplayName;

    price: Item.Price;
  }

  export namespace Item {
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

  export interface Pagination {
    /**
     * Current page number.
     */
    current_page: number;

    /**
     * Whether there is a next page.
     */
    has_next: boolean;

    /**
     * Whether there is a previous page.
     */
    has_previous: boolean;

    /**
     * Number of items per page (max 50).
     */
    page_size: number;

    /**
     * Total number of items.
     */
    total_items: number;

    /**
     * Total number of pages.
     */
    total_pages: number;
  }
}

/**
 * List of available countries with pricing information.
 */
export interface AccountListCountriesResponse {
  items: Array<AccountListCountriesResponse.Item>;

  pagination: AccountListCountriesResponse.Pagination;
}

export namespace AccountListCountriesResponse {
  export interface Item {
    /**
     * Whether the country is available for purchase.
     */
    available: boolean;

    /**
     * Country code (ISO 3166-1 alpha-2).
     */
    country_code: string;

    display_name: Item.DisplayName;

    price: Item.Price;
  }

  export namespace Item {
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

  export interface Pagination {
    /**
     * Current page number.
     */
    current_page: number;

    /**
     * Whether there is a next page.
     */
    has_next: boolean;

    /**
     * Whether there is a previous page.
     */
    has_previous: boolean;

    /**
     * Number of items per page (max 50).
     */
    page_size: number;

    /**
     * Total number of items.
     */
    total_items: number;

    /**
     * Total number of pages.
     */
    total_pages: number;
  }
}

export interface AccountListParams {
  /**
   * Page number (starts from 1).
   */
  page: number;

  /**
   * Number of items per page (max 50).
   */
  page_size: number;

  /**
   * Sort order for accounts.
   */
  sort: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

  /**
   * Filter by country codes (comma-separated, e.g., 'US,RU,GB').
   */
  country_code?: string | Array<string>;
}

export interface AccountListCountriesParams {
  /**
   * Page number (starts from 1).
   */
  page: number;

  /**
   * Number of items per page (max 50).
   */
  page_size: number;

  /**
   * Sort order for accounts.
   */
  sort: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

  /**
   * Filter by country codes (comma-separated, e.g., 'US,RU,GB').
   */
  country_code?: string | Array<string>;
}

export declare namespace Accounts {
  export {
    type AccountRetrieveResponse as AccountRetrieveResponse,
    type AccountListResponse as AccountListResponse,
    type AccountListCountriesResponse as AccountListCountriesResponse,
    type AccountListParams as AccountListParams,
    type AccountListCountriesParams as AccountListCountriesParams,
  };
}
