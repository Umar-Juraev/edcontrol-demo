import { LogsTypes } from "utils/types";
import { BranchesDTO } from "./branches";
import { PhotosDTO } from "./photos";

export type RoomsDTO = {
    id: number;
    branch: BranchesDTO;
    name: string;
    photo: PhotosDTO;
    capacity: number;
    description: string;
    logs: LogsTypes[];
    created_time: string;
}