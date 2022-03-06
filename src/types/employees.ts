import { BranchesDTO } from './branches';
import { DistrictTypes } from './classifiers';
import { PhotosDTO } from './photos';

export type EmployeesDTO = {
    id: number;
    full_name: string;
    phone_number: string;
    password: string;
    birth_date: string;
    gender: 'male' | 'female';
    photo: PhotosDTO;
    district: DistrictTypes;
    address: string;
    branch: BranchesDTO;
    role: string | number;
}