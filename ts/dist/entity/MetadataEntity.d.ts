import { WahlumfragenDatenbankEntityBase } from '../WahlumfragenDatenbankEntityBase';
import type { WahlumfragenDatenbankSDK } from '../WahlumfragenDatenbankSDK';
import type { Control } from '../types';
import type { Metadata, MetadataLoadMatch } from '../WahlumfragenDatenbankTypes';
declare class MetadataEntity extends WahlumfragenDatenbankEntityBase<Metadata> {
    constructor(client: WahlumfragenDatenbankSDK, entopts: any);
    make(this: MetadataEntity): MetadataEntity;
    load(this: any, reqmatch?: MetadataLoadMatch, ctrl?: Control): Promise<MetadataEntity>;
}
export { MetadataEntity };
