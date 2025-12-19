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
  test.skip('list', async () => {
    const responsePromise = client.accounts.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.list(
        { country_codes: 'US,RU,GB', page: 1, page_size: 50, sort: 'price_asc' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Gmt.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('listCountries', async () => {
    const responsePromise = client.accounts.listCountries();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('listCountries: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.accounts.listCountries(
        { country_codes: 'US,RU,GB', page: 1, page_size: 50, sort: 'price_asc' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Gmt.NotFoundError);
  });
});
