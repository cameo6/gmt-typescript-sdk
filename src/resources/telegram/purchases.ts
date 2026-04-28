// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { PageNumber, type PageNumberParams, PagePromise } from '../../core/pagination';
import { RequestOptions } from '../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../internal/uploads';

export class Purchases extends APIResource {
  /**
   * Creates a new purchase for Telegram premium subscription. Deducts balance
   * immediately and returns purchase details.
   *
   * @example
   * ```ts
   * const response =
   *   await client.telegram.purchases.createPremium({
   *     mounts: 6,
   *     username: '@john_doe',
   *   });
   * ```
   */
  createPremium(
    body: PurchaseCreatePremiumParams,
    options?: RequestOptions,
  ): APIPromise<PurchaseCreatePremiumResponse> {
    return this._client.post(
      '/v1/telegram/purchases/premium',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Creates a new purchase for Telegram stars. Deducts balance immediately and
   * returns purchase details.
   *
   * @example
   * ```ts
   * const response =
   *   await client.telegram.purchases.createStars({
   *     amount: 100,
   *     username: '@john_doe',
   *   });
   * ```
   */
  createStars(
    body: PurchaseCreateStarsParams,
    options?: RequestOptions,
  ): APIPromise<PurchaseCreateStarsResponse> {
    return this._client.post(
      '/v1/telegram/purchases/stars',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }

  /**
   * Returns paginated history of Telegram premium subscription purchases for the
   * authenticated user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const purchaseListPremiumResponse of client.telegram.purchases.listPremium(
   *   { page: 1, page_size: 50 },
   * )) {
   *   // ...
   * }
   * ```
   */
  listPremium(
    query: PurchaseListPremiumParams,
    options?: RequestOptions,
  ): PagePromise<PurchaseListPremiumResponsesPageNumber, PurchaseListPremiumResponse> {
    return this._client.getAPIList(
      '/v1/telegram/purchases/premium',
      PageNumber<PurchaseListPremiumResponse>,
      { query, ...options },
    );
  }

  /**
   * Returns paginated history of star purchases for the authenticated user.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const purchaseListStarsResponse of client.telegram.purchases.listStars(
   *   { page: 1, page_size: 50 },
   * )) {
   *   // ...
   * }
   * ```
   */
  listStars(
    query: PurchaseListStarsParams,
    options?: RequestOptions,
  ): PagePromise<PurchaseListStarsResponsesPageNumber, PurchaseListStarsResponse> {
    return this._client.getAPIList('/v1/telegram/purchases/stars', PageNumber<PurchaseListStarsResponse>, {
      query,
      ...options,
    });
  }
}

export type PurchaseListPremiumResponsesPageNumber = PageNumber<PurchaseListPremiumResponse>;

export type PurchaseListStarsResponsesPageNumber = PageNumber<PurchaseListStarsResponse>;

export interface PurchaseCreatePremiumResponse {
  /**
   * The number of months for the premium subscription (3, 6, or 12)
   */
  mounts: number;

  /**
   * The price of the premium subscription
   */
  price: number;

  /**
   * The status of the purchase
   */
  status: 'success' | 'failure';

  /**
   * The username of the recipient
   */
  username: string;
}

export interface PurchaseCreateStarsResponse {
  /**
   * The amount of stars to purchase (50-10000)
   */
  amount: number;

  /**
   * The price of the stars
   */
  price: number;

  /**
   * The status of the purchase
   */
  status: 'success' | 'failure';

  /**
   * The username of the recipient
   */
  username: string;
}

export interface PurchaseListPremiumResponse {
  /**
   * The ID of the purchase
   */
  id: number;

  /**
   * The date and time when the purchase was made
   */
  created_at: string;

  /**
   * The number of months for the premium subscription
   */
  mounts: number;

  /**
   * The price of the purchase
   */
  price: number;

  /**
   * The username of the recipient
   */
  username: string;
}

export interface PurchaseListStarsResponse {
  /**
   * The ID of the purchase
   */
  id: number;

  /**
   * The amount of stars purchased
   */
  amount: number;

  /**
   * The date and time when the purchase was made
   */
  created_at: string;

  /**
   * The price of the purchase
   */
  price: number;

  /**
   * The username of the recipient
   */
  username: string;
}

export interface PurchaseCreatePremiumParams {
  /**
   * The number of months for the premium subscription (3, 6, or 12)
   */
  mounts: number;

  /**
   * Recipient Telegram username (@optional, 5-32 chars)
   */
  username: string;
}

export interface PurchaseCreateStarsParams {
  /**
   * The amount of stars to purchase (50-10000)
   */
  amount: number;

  /**
   * Recipient Telegram username (@optional, 5-32 chars)
   */
  username: string;
}

export interface PurchaseListPremiumParams extends PageNumberParams {}

export interface PurchaseListStarsParams extends PageNumberParams {}

export declare namespace Purchases {
  export {
    type PurchaseCreatePremiumResponse as PurchaseCreatePremiumResponse,
    type PurchaseCreateStarsResponse as PurchaseCreateStarsResponse,
    type PurchaseListPremiumResponse as PurchaseListPremiumResponse,
    type PurchaseListStarsResponse as PurchaseListStarsResponse,
    type PurchaseListPremiumResponsesPageNumber as PurchaseListPremiumResponsesPageNumber,
    type PurchaseListStarsResponsesPageNumber as PurchaseListStarsResponsesPageNumber,
    type PurchaseCreatePremiumParams as PurchaseCreatePremiumParams,
    type PurchaseCreateStarsParams as PurchaseCreateStarsParams,
    type PurchaseListPremiumParams as PurchaseListPremiumParams,
    type PurchaseListStarsParams as PurchaseListStarsParams,
  };
}
