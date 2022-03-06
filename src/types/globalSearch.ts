import { CoursesDTO } from "./courses";
import { RoomsDTO } from "types";
import { TeachersDTO } from "./teachers";
import { UsersDTO } from "./users";
import { GroupsDTO } from "./groups";

export type GlobalSearchDTO = {
  groups?: GroupsDTO[];
  users?: UsersDTO[];
  teachers?: TeachersDTO[];
  rooms?: RoomsDTO[];
  courses?: CoursesDTO[];
};
