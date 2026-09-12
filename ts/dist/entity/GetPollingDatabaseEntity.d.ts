import { WahlumfragenDatenbankEntityBase } from '../WahlumfragenDatenbankEntityBase';
import type { WahlumfragenDatenbankSDK } from '../WahlumfragenDatenbankSDK';
import type { Control } from '../types';
import type { GetPollingDatabase, GetPollingDatabaseListMatch } from '../WahlumfragenDatenbankTypes';
declare class GetPollingDatabaseEntity extends WahlumfragenDatenbankEntityBase<GetPollingDatabase> {
    constructor(client: WahlumfragenDatenbankSDK, entopts: any);
    make(this: GetPollingDatabaseEntity): GetPollingDatabaseEntity;
    list(this: any, reqmatch?: GetPollingDatabaseListMatch, ctrl?: Control): Promise<GetPollingDatabaseEntity[]>;
}
export { GetPollingDatabaseEntity };
