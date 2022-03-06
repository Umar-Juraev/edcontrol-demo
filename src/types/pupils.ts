import { LogsTypes } from "utils/types";
import { UsersDTO } from "./users";

export type PupilsDTO = {
    id: number;
    user: UsersDTO;
    group: number;
    discount_price: number;
    is_removed: boolean;
    joined_time: string;
    logs: LogsTypes;
}