import { LogsTypes } from "utils/types";
import { ReasonsTypes } from "./classifiers";

export type OutcomesDTO = {
    id: number;
    name: string;
    amount: number;
    reason: ReasonsTypes;
    comment: string;
    logs: LogsTypes;
    created_time: string;
}