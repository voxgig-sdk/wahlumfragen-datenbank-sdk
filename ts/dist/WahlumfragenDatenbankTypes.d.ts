export interface GetPollingDatabase {
    Date: string;
    Institute_ID: string;
    Method_ID?: string;
    Parliament_ID: string;
    Results: Record<string, any>;
    Survey_Period?: Record<string, any>;
    Surveyed_Persons?: number;
    Tasker_ID: string;
}
export interface GetPollingDatabaseListMatch {
    Date?: string;
    Institute_ID?: string;
    Method_ID?: string;
    Parliament_ID?: string;
    Results?: Record<string, any>;
    Survey_Period?: Record<string, any>;
    Surveyed_Persons?: number;
    Tasker_ID?: string;
}
export interface Metadata {
}
export interface MetadataLoadMatch {
}
