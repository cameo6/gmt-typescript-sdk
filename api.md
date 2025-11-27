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
- <code title="get /v1/accounts/">client.accounts.<a href="./src/resources/accounts.ts">list</a>({ ...params }) -> AccountListResponse</code>
- <code title="get /v1/accounts/countries">client.accounts.<a href="./src/resources/accounts.ts">listCountries</a>({ ...params }) -> AccountListCountriesResponse</code>

# Profile

Types:

- <code><a href="./src/resources/profile.ts">ProfileRetrieveResponse</a></code>

Methods:

- <code title="get /v1/profile/">client.profile.<a href="./src/resources/profile.ts">retrieve</a>() -> ProfileRetrieveResponse</code>

# Purchases

Types:

- <code><a href="./src/resources/purchases.ts">PurchaseCreateResponse</a></code>
- <code><a href="./src/resources/purchases.ts">PurchaseRetrieveResponse</a></code>
- <code><a href="./src/resources/purchases.ts">PurchaseListResponse</a></code>
- <code><a href="./src/resources/purchases.ts">PurchaseRequestVerificationCodeResponse</a></code>

Methods:

- <code title="post /v1/purchases/">client.purchases.<a href="./src/resources/purchases.ts">create</a>({ ...params }) -> PurchaseCreateResponse</code>
- <code title="get /v1/purchases/{purchase_id}">client.purchases.<a href="./src/resources/purchases.ts">retrieve</a>(purchaseID) -> PurchaseRetrieveResponse</code>
- <code title="get /v1/purchases/">client.purchases.<a href="./src/resources/purchases.ts">list</a>({ ...params }) -> PurchaseListResponse</code>
- <code title="post /v1/purchases/{purchase_id}/request-code">client.purchases.<a href="./src/resources/purchases.ts">requestVerificationCode</a>(purchaseID) -> PurchaseRequestVerificationCodeResponse</code>
