import { LogsTypes } from "utils/types";
import { PupilsDTO } from "./pupils";

export type IncomesDTO = {
    id: number;
    pupil: PupilsDTO;
    amount: number;
    comment: string;
    logs: LogsTypes;
    created_time: string;
}