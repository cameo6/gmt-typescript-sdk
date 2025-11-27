// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { PageNumber, type PageNumberParams, PagePromise } from '../core/pagination';
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
  list(
    query: AccountListParams,
    options?: RequestOptions,
  ): PagePromise<AccountListResponsesPageNumber, AccountListResponse> {
    return this._client.getAPIList('/v1/accounts/', PageNumber<AccountListResponse>, { query, ...options });
  }

  /**
   * Returns a list of all available countries from providers with prices and
   * availability. No authentication required.
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

export interface AccountListResponse {
  /**
   * Indicates if account is available for purchase.
   */
  available: boolean;

  /**
   * ISO 3166-1 alpha-2 country code (e.g., US, RU, GB).
   */
  country_code: string;

  display_name: AccountListResponse.DisplayName;

  price: AccountListResponse.Price;
}

export namespace AccountListResponse {
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
   * Whether the country is available for purchase.
   */
  available: boolean;

  /**
   * Country code (ISO 3166-1 alpha-2).
   */
  country_code: string;

  display_name: AccountListCountriesResponse.DisplayName;

  price: AccountListCountriesResponse.Price;

  /**
   * Name of the account provider for this country.
   */
  provider: string;
}

export namespace AccountListCountriesResponse {
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
  sort: 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

  /**
   * Filter by country codes (comma-separated, e.g., 'US,RU,GB').
   */
  country_code?: string | Array<string>;
}

export interface AccountListCountriesParams extends PageNumberParams {
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
    type AccountListResponsesPageNumber as AccountListResponsesPageNumber,
    type AccountListCountriesResponsesPageNumber as AccountListCountriesResponsesPageNumber,
    type AccountListParams as AccountListParams,
    type AccountListCountriesParams as AccountListCountriesParams,
  };
}
