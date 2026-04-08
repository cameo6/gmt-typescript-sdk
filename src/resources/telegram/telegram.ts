// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PurchasesAPI from './purchases';
import {
  PurchaseCreatePremiumParams,
  PurchaseCreatePremiumResponse,
  PurchaseCreateStarsParams,
  PurchaseCreateStarsResponse,
  PurchaseListPremiumParams,
  PurchaseListPremiumResponse,
  PurchaseListPremiumResponsesPageNumber,
  PurchaseListStarsParams,
  PurchaseListStarsResponse,
  PurchaseListStarsResponsesPageNumber,
  Purchases,
} from './purchases';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * Stars and premium subscription for Telegram.
 */
export class Telegram extends APIResource {
  purchases: PurchasesAPI.Purchases = new PurchasesAPI.Purchases(this._client);

  /**
   * Returns the current price of Telegram premium subscription in USD.
   *
   * @example
   * ```ts
   * const response = await client.telegram.getPremiumPrice({
   *   mounts: 'mounts',
   * });
   * ```
   */
  getPremiumPrice(
    query: TelegramGetPremiumPriceParams,
    options?: RequestOptions,
  ): APIPromise<TelegramGetPremiumPriceResponse> {
    return this._client.get('/v1/telegram/premium', { query, ...options });
  }

  /**
   * Returns the current price of stars in USD.
   *
   * @example
   * ```ts
   * const response = await client.telegram.getStarsPrice({
   *   amount: 'amount',
   * });
   * ```
   */
  getStarsPrice(
    query: TelegramGetStarsPriceParams,
    options?: RequestOptions,
  ): APIPromise<TelegramGetStarsPriceResponse> {
    return this._client.get('/v1/telegram/stars', { query, ...options });
  }
}

export interface TelegramGetPremiumPriceResponse {
  /**
   * The number of months for the premium subscription (3, 6, or 12)
   */
  mounts: number;

  /**
   * The price of the premium subscription
   */
  price: number;
}

export interface TelegramGetStarsPriceResponse {
  /**
   * The amount of stars to purchase (50-10000)
   */
  amount: number;

  /**
   * The price of the stars
   */
  price: number;
}

export interface TelegramGetPremiumPriceParams {
  /**
   * The number of months for the premium subscription (3, 6, or 12)
   */
  mounts: string;
}

export interface TelegramGetStarsPriceParams {
  /**
   * The amount of stars to purchase (50-10000)
   */
  amount: string;
}

Telegram.Purchases = Purchases;

export declare namespace Telegram {
  export {
    type TelegramGetPremiumPriceResponse as TelegramGetPremiumPriceResponse,
    type TelegramGetStarsPriceResponse as TelegramGetStarsPriceResponse,
    type TelegramGetPremiumPriceParams as TelegramGetPremiumPriceParams,
    type TelegramGetStarsPriceParams as TelegramGetStarsPriceParams,
  };

  export {
    Purchases as Purchases,
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
