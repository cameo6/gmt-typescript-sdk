# Service

Types:

- <code><a href="./src/resources/service.ts">ServiceGetServerTimeResponse</a></code>
- <code><a href="./src/resources/service.ts">ServiceHealthCheckResponse</a></code>

Methods:

- <code title="get /v1/service/time">client.service.<a href="./src/resources/service.ts">getServerTime</a>() -> ServiceGetServerTimeResponse</code>
- <code title="get /v1/service/health">client.service.<a href="./src/resources/service.ts">healthCheck</a>() -> ServiceHealthCheckResponse</code>

# Accounts

Types:

- <code><a href="./src/resources/accounts.ts">AccountRetrieveResponse</a></code>
- <code><a href="./src/resources/accounts.ts">AccountListResponse</a></code>
- <code><a href="./src/resources/accounts.ts">AccountListCountriesResponse</a></code>

Methods:

- <code title="get /v1/accounts/{country_code}">client.accounts.<a href="./src/resources/accounts.ts">retrieve</a>(countryCode) -> AccountRetrieveResponse</code>
- <code title="get /v1/accounts/">client.accounts.<a href="./src/resources/accounts.ts">list</a>({ ...params }) -> AccountListResponsesPageNumber</code>
- <code title="get /v1/accounts/countries">client.accounts.<a href="./src/resources/accounts.ts">listCountries</a>({ ...params }) -> AccountListCountriesResponsesPageNumber</code>

# Profile

Types:

- <code><a href="./src/resources/profile/profile.ts">ProfileRetrieveResponse</a></code>
- <code><a href="./src/resources/profile/profile.ts">ProfileChangeLoginResponse</a></code>
- <code><a href="./src/resources/profile/profile.ts">ProfileChangePasswordResponse</a></code>
- <code><a href="./src/resources/profile/profile.ts">ProfileUnbindTelegramResponse</a></code>

Methods:

- <code title="get /v1/profile/">client.profile.<a href="./src/resources/profile/profile.ts">retrieve</a>() -> ProfileRetrieveResponse</code>
- <code title="patch /v1/profile/change-login">client.profile.<a href="./src/resources/profile/profile.ts">changeLogin</a>({ ...params }) -> ProfileChangeLoginResponse</code>
- <code title="patch /v1/profile/change-password">client.profile.<a href="./src/resources/profile/profile.ts">changePassword</a>({ ...params }) -> ProfileChangePasswordResponse</code>
- <code title="patch /v1/profile/unbind-telegram">client.profile.<a href="./src/resources/profile/profile.ts">unbindTelegram</a>() -> ProfileUnbindTelegramResponse</code>

## Discount

Types:

- <code><a href="./src/resources/profile/discount.ts">DiscountRetrieveResponse</a></code>

Methods:

- <code title="get /v1/profile/discount">client.profile.discount.<a href="./src/resources/profile/discount.ts">retrieve</a>() -> DiscountRetrieveResponse</code>

## Referral

Types:

- <code><a href="./src/resources/profile/referral/referral.ts">ReferralRetrieveResponse</a></code>
- <code><a href="./src/resources/profile/referral/referral.ts">ReferralTransferBalanceResponse</a></code>

Methods:

- <code title="get /v1/profile/referral">client.profile.referral.<a href="./src/resources/profile/referral/referral.ts">retrieve</a>() -> ReferralRetrieveResponse</code>
- <code title="post /v1/profile/referral/transfer-balance">client.profile.referral.<a href="./src/resources/profile/referral/referral.ts">transferBalance</a>({ ...params }) -> ReferralTransferBalanceResponse</code>

### Transaction

Types:

- <code><a href="./src/resources/profile/referral/transaction.ts">TransactionListResponse</a></code>

Methods:

- <code title="get /v1/profile/referral/transaction">client.profile.referral.transaction.<a href="./src/resources/profile/referral/transaction.ts">list</a>({ ...params }) -> TransactionListResponsesPageNumber</code>

# Purchases

Types:

- <code><a href="./src/resources/purchases/purchases.ts">PurchaseCreateResponse</a></code>
- <code><a href="./src/resources/purchases/purchases.ts">PurchaseRetrieveResponse</a></code>
- <code><a href="./src/resources/purchases/purchases.ts">PurchaseListResponse</a></code>
- <code><a href="./src/resources/purchases/purchases.ts">PurchaseRefundResponse</a></code>
- <code><a href="./src/resources/purchases/purchases.ts">PurchaseRequestVerificationCodeResponse</a></code>

Methods:

- <code title="post /v1/purchases/">client.purchases.<a href="./src/resources/purchases/purchases.ts">create</a>({ ...params }) -> PurchaseCreateResponse</code>
- <code title="get /v1/purchases/{purchase_id}">client.purchases.<a href="./src/resources/purchases/purchases.ts">retrieve</a>(purchaseID) -> PurchaseRetrieveResponse</code>
- <code title="get /v1/purchases/">client.purchases.<a href="./src/resources/purchases/purchases.ts">list</a>({ ...params }) -> PurchaseListResponsesPageNumber</code>
- <code title="post /v1/purchases/{purchase_id}/refund">client.purchases.<a href="./src/resources/purchases/purchases.ts">refund</a>(purchaseID) -> PurchaseRefundResponse</code>
- <code title="post /v1/purchases/{purchase_id}/request-code">client.purchases.<a href="./src/resources/purchases/purchases.ts">requestVerificationCode</a>(purchaseID, { ...params }) -> PurchaseRequestVerificationCodeResponse</code>

## Bulk

Types:

- <code><a href="./src/resources/purchases/bulk.ts">BulkCreateResponse</a></code>
- <code><a href="./src/resources/purchases/bulk.ts">BulkRetrieveResponse</a></code>

Methods:

- <code title="post /v1/purchases/bulk">client.purchases.bulk.<a href="./src/resources/purchases/bulk.ts">create</a>({ ...params }) -> BulkCreateResponse</code>
- <code title="get /v1/purchases/bulk/{purchase_id}">client.purchases.bulk.<a href="./src/resources/purchases/bulk.ts">retrieve</a>(purchaseID) -> BulkRetrieveResponse</code>
- <code title="get /v1/purchases/bulk/{purchase_id}/download">client.purchases.bulk.<a href="./src/resources/purchases/bulk.ts">download</a>(purchaseID) -> Response</code>

# Telegram

Types:

- <code><a href="./src/resources/telegram/telegram.ts">TelegramGetPremiumPriceResponse</a></code>
- <code><a href="./src/resources/telegram/telegram.ts">TelegramGetStarsPriceResponse</a></code>

Methods:

- <code title="get /v1/telegram/premium">client.telegram.<a href="./src/resources/telegram/telegram.ts">getPremiumPrice</a>({ ...params }) -> TelegramGetPremiumPriceResponse</code>
- <code title="get /v1/telegram/stars">client.telegram.<a href="./src/resources/telegram/telegram.ts">getStarsPrice</a>({ ...params }) -> TelegramGetStarsPriceResponse</code>

## Purchases

Types:

- <code><a href="./src/resources/telegram/purchases.ts">PurchaseCreatePremiumResponse</a></code>
- <code><a href="./src/resources/telegram/purchases.ts">PurchaseCreateStarsResponse</a></code>
- <code><a href="./src/resources/telegram/purchases.ts">PurchaseListPremiumResponse</a></code>
- <code><a href="./src/resources/telegram/purchases.ts">PurchaseListStarsResponse</a></code>

Methods:

- <code title="post /v1/telegram/purchases/premium">client.telegram.purchases.<a href="./src/resources/telegram/purchases.ts">createPremium</a>({ ...params }) -> PurchaseCreatePremiumResponse</code>
- <code title="post /v1/telegram/purchases/stars">client.telegram.purchases.<a href="./src/resources/telegram/purchases.ts">createStars</a>({ ...params }) -> PurchaseCreateStarsResponse</code>
- <code title="get /v1/telegram/purchases/premium">client.telegram.purchases.<a href="./src/resources/telegram/purchases.ts">listPremium</a>({ ...params }) -> PurchaseListPremiumResponsesPageNumber</code>
- <code title="get /v1/telegram/purchases/stars">client.telegram.purchases.<a href="./src/resources/telegram/purchases.ts">listStars</a>({ ...params }) -> PurchaseListStarsResponsesPageNumber</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookTestResponse</a></code>

Methods:

- <code title="post /v1/webhooks/test">client.webhooks.<a href="./src/resources/webhooks.ts">test</a>({ ...params }) -> WebhookTestResponse</code>
