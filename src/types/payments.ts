import { LogsTypes } from "utils/types";
import { ProviderTypes } from "./classifiers";
import { EmployeesDTO } from "./employees";
import { UsersDTO } from "./users";

export type PaymentsDTO = {
  id: number;
  user: UsersDTO;
  amount: number;
  provider: ProviderTypes;
  employee: EmployeesDTO;
  is_canceled: boolean;
  logs: LogsTypes;
  created_time: string;
  comment: string;
};