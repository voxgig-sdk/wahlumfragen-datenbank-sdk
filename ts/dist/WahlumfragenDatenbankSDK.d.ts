import { GetPollingDatabaseEntity } from './entity/GetPollingDatabaseEntity';
import { MetadataEntity } from './entity/MetadataEntity';
export type * from './WahlumfragenDatenbankTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WahlumfragenDatenbankEntityBase } from './WahlumfragenDatenbankEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class WahlumfragenDatenbankSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    GetPollingDatabase(entopts?: Record<string, any>): GetPollingDatabaseEntity;
    Metadata(entopts?: Record<string, any>): MetadataEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WahlumfragenDatenbankSDK;
    tester(testopts?: any, sdkopts?: any): WahlumfragenDatenbankSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WahlumfragenDatenbankSDK;
export { stdutil, config, BaseFeature, WahlumfragenDatenbankEntityBase, WahlumfragenDatenbankSDK, SDK, };
