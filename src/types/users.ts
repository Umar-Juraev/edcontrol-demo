import { genderTypes, LogsTypes, UserRoleCodeTypes } from "utils/types";
import { BranchesDTO } from "./branches";
import { DistrictTypes } from "./classifiers";
import { ExtraPhoneNumbersDTO } from "./extra-phone-number";
import { PhotosDTO } from "./photos";

export type UsersDTO = {
    id: number;
    full_name: string;
    phone_number: string;
    birth_date: string;
    gender: genderTypes;
    photo: PhotosDTO;
    district: DistrictTypes;
    address: string;
    branch: BranchesDTO;
    balance: number;
    extra_phone_numbers: ExtraPhoneNumbersDTO[];
    groups_count: number;
    logs: LogsTypes[];
    created_time: string;
    role: UserRoleCodeTypes;
    is_removed: boolean;
}