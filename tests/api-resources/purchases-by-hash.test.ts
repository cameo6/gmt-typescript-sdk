// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Gmt from 'gmt-typescript-sdk';

const client = new Gmt({
  apiKey: 'My API Key',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource purchasesByHash', () => {
  // Mock server tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.purchasesByHash.retrieve('abc-def-1234567890');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Mock server tests are disabled
  test.skip('requestVerificationCode', async () => {
    const responsePromise = client.purchasesByHash.requestVerificationCode('abc-def-1234567890', {});
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });
});
