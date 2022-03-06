import { LogsTypes } from "utils/types";
import { DistrictTypes } from "./classifiers";
import { PhotosDTO } from "./photos";

export type BranchesDTO = {
    id: number;
    name: string;
    phone_number: string;
    photo: PhotosDTO;
    district: DistrictTypes;
    address: string;
    logs: LogsTypes[];
    created_time: string;
}