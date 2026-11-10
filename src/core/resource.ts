import type { Gmt } from '../client';

export abstract class APIResource {
  protected _client: Gmt;

  constructor(client: Gmt) {
    this._client = client;
  }
}
