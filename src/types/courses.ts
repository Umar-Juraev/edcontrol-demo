import { BranchesDTO } from "./branches";
import { DirectionsDTO } from "./classifiers";
import { MaterialDTO } from "./materials";
import { PhotosDTO } from "./photos";

export type CoursesDTO = {
    id: number;
    name: string;
    photo: PhotosDTO;
    direction: DirectionsDTO;
    branches: BranchesDTO[];
    materials: MaterialDTO[];
    lesson_duration: number;
    course_duration: number;
    price: number;
    pay_for_every: number;
    created_time: string;
}