import { LogsTypes, StatusTypes, SourceDirectionTypes } from "utils/types";
import { BranchesDTO } from "./branches";

export type ClientsDTO = {
  id: number;
  branch: BranchesDTO;
  full_name: string;
  phone_number: string;
  direction: SourceDirectionTypes;
  source: SourceDirectionTypes;
  status: StatusTypes;
  logs: LogsTypes[];
  created_time: string;
};
