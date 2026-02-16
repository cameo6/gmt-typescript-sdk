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

- <code><a href="./src/resources/profile.ts">ProfileRetrieveResponse</a></code>
- <code><a href="./src/resources/profile.ts">ProfileChangeLoginResponse</a></code>
- <code><a href="./src/resources/profile.ts">ProfileChangePasswordResponse</a></code>
- <code><a href="./src/resources/profile.ts">ProfileUnbindTelegramResponse</a></code>

Methods:

- <code title="get /v1/profile/">client.profile.<a href="./src/resources/profile.ts">retrieve</a>() -> ProfileRetrieveResponse</code>
- <code title="patch /v1/profile/change-login">client.profile.<a href="./src/resources/profile.ts">changeLogin</a>({ ...params }) -> ProfileChangeLoginResponse</code>
- <code title="patch /v1/profile/change-password">client.profile.<a href="./src/resources/profile.ts">changePassword</a>({ ...params }) -> ProfileChangePasswordResponse</code>
- <code title="patch /v1/profile/unbind-telegram">client.profile.<a href="./src/resources/profile.ts">unbindTelegram</a>() -> ProfileUnbindTelegramResponse</code>

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

# Webhooks

Types:

- <code><a href="./src/resources/webhooks.ts">WebhookTestResponse</a></code>

Methods:

- <code title="post /v1/webhooks/test">client.webhooks.<a href="./src/resources/webhooks.ts">test</a>({ ...params }) -> WebhookTestResponse</code>
