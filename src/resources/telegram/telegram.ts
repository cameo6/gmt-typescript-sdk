// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../../core/resource';
import * as PurchasesAPI from './purchases';
import { Purchases } from './purchases';

export class Telegram extends APIResource {
  purchases: PurchasesAPI.Purchases = new PurchasesAPI.Purchases(this._client);
}

Telegram.Purchases = Purchases;

export declare namespace Telegram {
  export { Purchases as Purchases };
}
