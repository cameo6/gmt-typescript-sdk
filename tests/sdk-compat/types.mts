import Gmt, { APIError } from 'gmt-typescript-sdk'
import type { PurchaseListParams } from 'gmt-typescript-sdk/resources/purchases'
import type { ProfileRetrieveResponse } from 'gmt-typescript-sdk/resources/profile'
import type { ProfileChangeLanguageParams } from 'gmt-typescript-sdk/resources/profile/profile'
import type { TransactionListParams } from 'gmt-typescript-sdk/resources/profile/referral/transaction'

export async function useClient(
  baseURL: string,
  fetch: typeof globalThis.fetch,
  purchases: PurchaseListParams,
  language: ProfileChangeLanguageParams,
  transactions: TransactionListParams,
): Promise<ProfileRetrieveResponse> {
  const client = new Gmt({ baseURL, fetch, maxRetries: 0 })

  try {
    await client.purchases.list(purchases)
    await client.profile.changeLanguage(language)
    await client.profile.referral.transaction.list(transactions)

    return await client.profile.retrieve()
  } catch (error) {
    if (error instanceof APIError) console.error(error.status, error.error)

    throw error
  }
}
