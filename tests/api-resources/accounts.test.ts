// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Gmt from 'gmt-typescript-sdk';

const client = new Gmt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource accounts', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.accounts.retrieve('US');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: only required params', async () => {
    const responsePromise = client.accounts.list({
      page: 1,
      page_size: 50,
      sort: 'price_asc',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: required and optional params', async () => {
    const response = await client.accounts.list({
      page: 1,
      page_size: 50,
      sort: 'price_asc',
      country_codes: 'US,RU,GB',
    });
  });

  // Prism tests are disabled
  test.skip('listCountries: only required params', async () => {
    const responsePromise = client.accounts.listCountries({
      page: 1,
      page_size: 50,
      sort: 'price_asc',
    });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listCountries: required and optional params', async () => {
    const response = await client.accounts.listCountries({
      page: 1,
      page_size: 50,
      sort: 'price_asc',
      country_codes: 'US,RU,GB',
    });
  });
});
