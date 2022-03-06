import { LogsTypes } from "utils/types";
import { WeekDaysTypes } from "types";
import { CoursesDTO } from "./courses";
import { PhotosDTO } from "./photos";
import { RoomsDTO } from "./rooms";
import { TeachersDTO } from "./teachers";

export type GroupsDTO = {
  id: number;
  name: string;
  photo: PhotosDTO;
  course: CoursesDTO;
  teacher: TeachersDTO;
  salary_for_month: number;
  percent_for_every_students_pay: number;
  days: WeekDaysTypes[];
  room: RoomsDTO;
  pupils_count: number;
  lesson_start_time: string;
  lessons_start_date: string;
  lessons_end_date: string;
  logs: LogsTypes[];
  created_time: string;
}