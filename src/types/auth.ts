import { BranchesDTO } from "./branches";
import { DistrictTypes } from "./classifiers";

export type AuthDTO = {
    token: string;
    expire_time: string;
    user: {
        id: number;
        full_name: string;
        phone_number: string;
        password: string;
        birth_date: string;
        gender: string;
        photo: any;
        district: DistrictTypes;
        address: string;
        brach: BranchesDTO;
        role: string;
        extra_phone_numbers: any[];
        created_time: string;
    }
};
