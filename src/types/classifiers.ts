export type DirectionsDTO = {
    id: number;
    name: string;
    created_time: string;
}

export type DistrictTypes = {
    id: number;
    region_id: number;
    name: string;
    created_time: string;
}

export type WeekDaysTypes = {
    id: number;
    name: string;
    short: string;
    created_time: string;
}

export type ProviderTypes = {
    id: number;
    name: string;
    created_time: string;
}

export type ReasonsTypes = {
    id: number;
    name: string;
    created_time: string;
}

export type RegionsTypes = {
    id: number;
    name: string;
    created_time: string;
    districts: DistrictTypes[];
}

export type SourcesTypes = {
    id: number;
    name: string;
    created_time: string;
}

export type StatusesTypes = {
    id: number;
    order: number;
    name: string;
    created_time: string;
}