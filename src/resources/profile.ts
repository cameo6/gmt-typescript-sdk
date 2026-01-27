// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Profile extends APIResource {
  /**
   * Returns detailed user profile information including balances, statistics, and
   * program levels.
   */
  retrieve(options?: RequestOptions): APIPromise<ProfileRetrieveResponse> {
    return this._client.get('/v1/profile/', options);
  }
}

/**
 * Successful response.
 */
export interface ProfileRetrieveResponse {
  /**
   * User Database ID
   */
  id: string;

  balance: ProfileRetrieveResponse.Balance;

  /**
   * Account creation time in ISO 8601 format (UTC)
   */
  created_at: string;

  discount: ProfileRetrieveResponse.Discount;

  /**
   * Web username
   */
  login: string | null;

  referral: ProfileRetrieveResponse.Referral;

  statistics: ProfileRetrieveResponse.Statistics;

  /**
   * User's Telegram ID (null for web-only users)
   */
  telegram_id: string | null;

  /**
   * User's Telegram username
   */
  telegram_username: string | null;
}

export namespace ProfileRetrieveResponse {
  export interface Balance {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }

  export interface Discount {
    /**
     * Current discount level: none, bronze, silver, gold, platinum, premium.
     */
    level: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'premium';

    /**
     * Discount percentage.
     */
    percent: number;
  }

  export interface Referral {
    /**
     * Current referral balance available for withdrawal.
     */
    balance: Referral.Balance;

    /**
     * Current referral program level: bronze, silver, gold, platinum.
     */
    level: 'bronze' | 'silver' | 'gold' | 'platinum';

    /**
     * Referral commission percentage.
     */
    percent: number;

    /**
     * Total lifetime earnings from referral commissions.
     */
    profit: Referral.Profit;

    /**
     * Total number of users invited through referral link.
     */
    referrals_count: number;
  }

  export namespace Referral {
    /**
     * Current referral balance available for withdrawal.
     */
    export interface Balance {
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
     * Total lifetime earnings from referral commissions.
     */
    export interface Profit {
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

  export interface Statistics {
    /**
     * Total number of successful purchases.
     */
    total_purchases: number;
  }
}

export declare namespace Profile {
  export { type ProfileRetrieveResponse as ProfileRetrieveResponse };
}
