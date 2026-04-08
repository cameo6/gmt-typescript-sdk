// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Gmt from 'gmt-typescript-sdk';

const client = new Gmt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource purchases', () => {
  // Mock server tests are disabled
  test.skip('createPremium: only required params', async () => {
    const responsePromise = client.telegram.purchases.createPremium({ mounts: 6, username: '@john_doe' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createPremium: required and optional params', async () => {
    const response = await client.telegram.purchases.createPremium({ mounts: 6, username: '@john_doe' });
  });

  // Mock server tests are disabled
  test.skip('createStars: only required params', async () => {
    const responsePromise = client.telegram.purchases.createStars({ amount: 100, username: '@john_doe' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('createStars: required and optional params', async () => {
    const response = await client.telegram.purchases.createStars({ amount: 100, username: '@john_doe' });
  });

  // Mock server tests are disabled
  test.skip('listPremium: only required params', async () => {
    const responsePromise = client.telegram.purchases.listPremium({ page: 1, page_size: 50 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listPremium: required and optional params', async () => {
    const response = await client.telegram.purchases.listPremium({ page: 1, page_size: 50 });
  });

  // Mock server tests are disabled
  test.skip('listStars: only required params', async () => {
    const responsePromise = client.telegram.purchases.listStars({ page: 1, page_size: 50 });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('listStars: required and optional params', async () => {
    const response = await client.telegram.purchases.listStars({ page: 1, page_size: 50 });
  });
});
