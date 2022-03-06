import { UsersDTO } from "./users";

export type ExtraPhoneNumbersDTO = {
    id: number;
    user: UsersDTO;
    phone_number: string;
    is_parents: boolean;
    created_time: string;
}