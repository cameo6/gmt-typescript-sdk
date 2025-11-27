// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Service extends APIResource {
  /**
   * Useful for client synchronization and checking clock drift.
   */
  getServerTime(options?: RequestOptions): APIPromise<ServiceGetServerTimeResponse> {
    return this._client.get('/v1/service/time', options);
  }

  /**
   * Returns basic service status, current time, and process uptime.
   */
  healthCheck(options?: RequestOptions): APIPromise<ServiceHealthCheckResponse> {
    return this._client.get('/v1/service/health', options);
  }
}

/**
 * Successful response.
 */
export interface ServiceGetServerTimeResponse {
  /**
   * Current server time in milliseconds since Unix epoch.
   */
  epochMs: number;

  /**
   * Current server time in ISO 8601 format.
   */
  iso: string;

  /**
   * Server timezone.
   */
  timezone: string;
}

/**
 * Successful response.
 */
export interface ServiceHealthCheckResponse {
  /**
   * Current server time in ISO 8601 format.
   */
  now: string;

  /**
   * Service status.
   */
  status: 'ok' | 'degraded';

  /**
   * API uptime in seconds.
   */
  uptimeSeconds: number;

  /**
   * Detailed information about dependencies state.
   */
  checks?: ServiceHealthCheckResponse.Checks;
}

export namespace ServiceHealthCheckResponse {
  /**
   * Detailed information about dependencies state.
   */
  export interface Checks {
    /**
     * Database connection status.
     */
    database: boolean;

    /**
     * Redis connection status.
     */
    redis: boolean;
  }
}

export declare namespace Service {
  export {
    type ServiceGetServerTimeResponse as ServiceGetServerTimeResponse,
    type ServiceHealthCheckResponse as ServiceHealthCheckResponse,
  };
}
