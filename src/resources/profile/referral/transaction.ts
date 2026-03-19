// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../../core/resource';
import { PageNumber, type PageNumberParams, PagePromise } from '../../../core/pagination';
import { RequestOptions } from '../../../internal/request-options';

/**
 * User profile management.
 */
export class Transaction extends APIResource {
  /**
   * Returns paginated referral transaction history for the authenticated user,
   * ordered by newest first.
   *
   * @example
   * ```ts
   * // Automatically fetches more pages as needed.
   * for await (const transactionListResponse of client.profile.referral.transaction.list(
   *   { page: 1, page_size: 50 },
   * )) {
   *   // ...
   * }
   * ```
   */
  list(
    query: TransactionListParams,
    options?: RequestOptions,
  ): PagePromise<TransactionListResponsesPageNumber, TransactionListResponse> {
    return this._client.getAPIList('/v1/profile/referral/transaction', PageNumber<TransactionListResponse>, {
      query,
      ...options,
    });
  }
}

export type TransactionListResponsesPageNumber = PageNumber<TransactionListResponse>;

export interface TransactionListResponse {
  id: number;

  amount: TransactionListResponse.Amount;

  balance_after: TransactionListResponse.BalanceAfter;

  balance_before: TransactionListResponse.BalanceBefore;

  created_at: string;

  from_user_id: string | null;
}

export namespace TransactionListResponse {
  export interface Amount {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }

  export interface BalanceAfter {
    /**
     * Monetary amount as a string with up to 2 decimal places.
     */
    amount: string;

    /**
     * ISO 4217 currency code.
     */
    currency_code: string;
  }

  export interface BalanceBefore {
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

export interface TransactionListParams extends PageNumberParams {}

export declare namespace Transaction {
  export {
    type TransactionListResponse as TransactionListResponse,
    type TransactionListResponsesPageNumber as TransactionListResponsesPageNumber,
    type TransactionListParams as TransactionListParams,
  };
}
