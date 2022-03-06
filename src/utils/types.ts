export type NavigationTypes = {
  count: number;
  next: any;
  previous: any;
};

export type LogsTypes = {
  id: number;
  employee: string;
  text: string;
  created_time: string;
};

export type SourceDirectionTypes = {
  id: number;
  name: string;
  created_time: string;
  last_updated_time: string;
};

export type StatusTypes = SourceDirectionTypes & {
  order: number;
};

export type LessonTimeSerializersType = {
  group_name: string;
  start_time: string;
  duration_minute: number;
};

export type LessonTimesByWeekTypes = {
  weekday_id: number;
  weekday_name: string;
  weekday_short: string;
  lesson_times: LessonTimeSerializersType[];
};

export type Nullable<T> = {
  [Key in keyof T]: T[Key] | null;
};

// User
export type UserStates =
  | "lead"
  | "call"
  | "onHold"
  | "reach"
  | "unReach"
  | "agreeToCome"
  | "noCome"
  | "come"
  | "test"
  | "noShowUp"
  | "trial"
  | "student"
  | "drop";

export type UserRoleNameTypes =
  | "Super user"
  | "CEO"
  | "Marketer"
  | "Administrator"
  | "Cashier"

export type UserRoleCodeTypes = 1000 | 999 | 100 | 99 | 10;

// Group
export type GroupOptionTypes = "daily" | "monthly";

// Day types
export type WeekDaysKeyTypes =
  | "dushanba"
  | "seshanba"
  | "chorshanba"
  | "payshanba"
  | "juma"
  | "shanba"
  | "yakshanba";
export type WeekDaysCodeTypes = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// Payment
export type PaymentKeyTypes = "cash" | "click" | "payme";

// Others
export type BadgeColorsType = "blue" | "green" | "indigo" | "orange" | "pink";

export type SelectOptionTypes = {
  key?: number | string;
  title?: string | number;
  value?: string | number;
};

export type genderTypes = "male" | "female";
