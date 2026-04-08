// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Gmt from 'gmt-typescript-sdk';

const client = new Gmt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource telegram', () => {
  // Mock server tests are disabled
  test.skip('getPremiumPrice: only required params', async () => {
    const responsePromise = client.telegram.getPremiumPrice({ mounts: 'mounts' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getPremiumPrice: required and optional params', async () => {
    const response = await client.telegram.getPremiumPrice({ mounts: 'mounts' });
  });

  // Mock server tests are disabled
  test.skip('getStarsPrice: only required params', async () => {
    const responsePromise = client.telegram.getStarsPrice({ amount: 'amount' });
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('getStarsPrice: required and optional params', async () => {
    const response = await client.telegram.getStarsPrice({ amount: 'amount' });
  });
});
