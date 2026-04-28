// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import * as TransactionAPI from './transaction';
import {
  Transaction,
  TransactionListParams,
  TransactionListResponse,
  TransactionListResponsesPageNumber,
} from './transaction';
import { APIPromise } from '../../../core/api-promise';
import { RequestOptions } from '../../../internal/request-options';
import { maybeMultipartFormRequestOptions } from '../../../internal/uploads';

/**
 * User profile management.
 */
export class Referral extends APIResource {
  transaction: TransactionAPI.Transaction = new TransactionAPI.Transaction(this._client);

  /**
   * Returns user's referral program status, including current level, commission
   * percentage, referral count, and earnings.
   *
   * @example
   * ```ts
   * const referral = await client.profile.referral.retrieve();
   * ```
   */
  retrieve(options?: RequestOptions): APIPromise<ReferralRetrieveResponse> {
    return this._client.get('/v1/profile/referral', options);
  }

  /**
   * Change the current user password to a new one.
   *
   * @example
   * ```ts
   * const response =
   *   await client.profile.referral.transferBalance({
   *     amount: 100,
   *   });
   * ```
   */
  transferBalance(
    body: ReferralTransferBalanceParams,
    options?: RequestOptions,
  ): APIPromise<ReferralTransferBalanceResponse> {
    return this._client.post(
      '/v1/profile/referral/transfer-balance',
      maybeMultipartFormRequestOptions({ body, ...options }, this._client),
    );
  }
}

export interface ReferralRetrieveResponse {
  current_level: ReferralRetrieveResponse.CurrentLevel;

  /**
   * All available referral levels
   */
  levels: Array<ReferralRetrieveResponse.Level>;

  /**
   * Next level information. Null if already at max level
   */
  next_level: ReferralRetrieveResponse.NextLevel | null;

  referral_info: ReferralRetrieveResponse.ReferralInfo;

  /**
   * User's referral link
   */
  referral_link: string;
}

export namespace ReferralRetrieveResponse {
  export interface CurrentLevel {
    /**
     * Name of the current referral level
     */
    name: 'bronze' | 'silver' | 'gold' | 'platinum';

    /**
     * Commission percentage
     */
    percent: number;

    progress: CurrentLevel.Progress;
  }

  export namespace CurrentLevel {
    export interface Progress {
      /**
       * Total deposits from referrals (in USD)
       */
      deposits: number;

      /**
       * Number of active referrals
       */
      referrals: number;
    }
  }

  export interface Level {
    /**
     * Name of the referral level
     */
    name: 'bronze' | 'silver' | 'gold' | 'platinum';

    /**
     * Commission percentage
     */
    percent: number;

    /**
     * Required deposits to reach this level
     */
    required_deposits: number;

    /**
     * Required referrals to reach this level
     */
    required_referrals: number;
  }

  /**
   * Next level information. Null if already at max level
   */
  export interface NextLevel {
    /**
     * Name of the next referral level
     */
    name: 'bronze' | 'silver' | 'gold' | 'platinum';

    /**
     * Commission percentage for the next level
     */
    percent: number;

    requirements: NextLevel.Requirements;
  }

  export namespace NextLevel {
    export interface Requirements {
      /**
       * Required total deposits from referrals
       */
      deposits: number;

      /**
       * Required number of referrals
       */
      referrals: number;

      /**
       * Remaining deposits to reach the next level
       */
      remaining_deposits: number;

      /**
       * Remaining referrals to reach the next level
       */
      remaining_referrals: number;
    }
  }

  export interface ReferralInfo {
    /**
     * Current referral balance
     */
    balance: ReferralInfo.Balance;

    /**
     * Total lifetime referral earnings
     */
    profit: ReferralInfo.Profit;

    /**
     * Total number of referrals
     */
    referrals_count: number;
  }

  export namespace ReferralInfo {
    /**
     * Current referral balance
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
     * Total lifetime referral earnings
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
}

export interface ReferralTransferBalanceResponse {
  balance: ReferralTransferBalanceResponse.Balance;

  referral_info: ReferralTransferBalanceResponse.ReferralInfo;
}

export namespace ReferralTransferBalanceResponse {
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

  export interface ReferralInfo {
    /**
     * Current referral balance
     */
    balance: ReferralInfo.Balance;

    /**
     * Total lifetime referral earnings
     */
    profit: ReferralInfo.Profit;

    /**
     * Total number of referrals
     */
    referrals_count: number;
  }

  export namespace ReferralInfo {
    /**
     * Current referral balance
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
     * Total lifetime referral earnings
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
}

export interface ReferralTransferBalanceParams {
  /**
   * Amount to transfer from referral balance
   */
  amount: number;
}

Referral.Transaction = Transaction;

export declare namespace Referral {
  export {
    type ReferralRetrieveResponse as ReferralRetrieveResponse,
    type ReferralTransferBalanceResponse as ReferralTransferBalanceResponse,
    type ReferralTransferBalanceParams as ReferralTransferBalanceParams,
  };

  export {
    Transaction as Transaction,
    type TransactionListResponse as TransactionListResponse,
    type TransactionListResponsesPageNumber as TransactionListResponsesPageNumber,
    type TransactionListParams as TransactionListParams,
  };
}
