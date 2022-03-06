import { genderTypes, LogsTypes } from "utils/types";
import { BranchesDTO } from "./branches";
import { DistrictTypes } from "./classifiers";
import { ExtraPhoneNumbersDTO } from "./extra-phone-number";
import { PhotosDTO } from "./photos";

export type TeachersDTO = {
    id: number;
    full_name: string;
    phone_number: string;
    password: string;
    birth_date: string;
    gender: genderTypes;
    photo: PhotosDTO;
    district: DistrictTypes;
    address: string;
    branch: BranchesDTO;
    balance: number;
    salary: number;
    extra_phone_numbers: ExtraPhoneNumbersDTO[];
    groups_count: number;
    logs: LogsTypes[];
    created_time: string;
    is_removed: boolean;
}

export type TeacherSalariesDTO = {
    teacher_id: number;
    teacher: string;
    students_count: number;
    lessons_count: number;
    salary: number;
    salary_from_group: number;
    salary_from_every_students_pay: number;
    total_salary: number;
}