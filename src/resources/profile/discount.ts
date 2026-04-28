// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import { APIPromise } from '../../core/api-promise';
import { RequestOptions } from '../../internal/request-options';

/**
 * User profile management.
 */
export class Discount extends APIResource {
  /**
   * Returns user's current discount level and percentage based on their purchase
   * history.
   *
   * @example
   * ```ts
   * const discount = await client.profile.discount.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<DiscountRetrieveResponse> {
    return this._client.get('/v1/profile/discount', options);
  }
}

export interface DiscountRetrieveResponse {
  current_level: DiscountRetrieveResponse.CurrentLevel;

  /**
   * Personal discount rules.
   */
  custom_discounts: Array<DiscountRetrieveResponse.CustomDiscount>;

  /**
   * All available discount levels
   */
  levels: Array<DiscountRetrieveResponse.Level>;

  /**
   * Next level information. Null if already at max level
   */
  next_level: DiscountRetrieveResponse.NextLevel | null;
}

export namespace DiscountRetrieveResponse {
  export interface CurrentLevel {
    /**
     * Name of the discount level
     */
    name: string;

    /**
     * Discount percentage
     */
    percent: number;

    /**
     * Required number of purchases to reach this level
     */
    purchases_required: number;
  }

  export interface CustomDiscount {
    /**
     * Custom discount rule ID
     */
    id: number;

    /**
     * ISO 3166-1 alpha-2 country code. If null, applies to all countries
     */
    country_code: string | null;

    /**
     * Creation date in ISO 8601 format (UTC)
     */
    created_at: string;

    /**
     * Discount percentage
     */
    discount_percent: number;

    /**
     * Expiration date in ISO 8601 format (UTC). If null, never expires
     */
    expires_at: string | null;
  }

  export interface Level {
    /**
     * Name of the discount level
     */
    name: string;

    /**
     * Discount percentage
     */
    percent: number;

    /**
     * Required purchases to reach this level
     */
    purchases: number;
  }

  /**
   * Next level information. Null if already at max level
   */
  export interface NextLevel {
    /**
     * Name of the next discount level
     */
    name: string;

    /**
     * Discount percentage for the next level
     */
    percent: number;

    progress: NextLevel.Progress;

    requirements: NextLevel.Requirements;
  }

  export namespace NextLevel {
    export interface Progress {
      /**
       * Current number of purchases
       */
      purchases: number;

      /**
       * Remaining purchases to reach the next level
       */
      purchases_remaining: number;
    }

    export interface Requirements {
      /**
       * Required number of purchases to reach this level
       */
      purchases: number;
    }
  }
}

export declare namespace Discount {
  export { type DiscountRetrieveResponse as DiscountRetrieveResponse };
}
