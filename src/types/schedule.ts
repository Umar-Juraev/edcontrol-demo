import { LessonTimesByWeekTypes } from "utils/types";

export type ScheduleDTO = {
    room_id: number;
    room_name: string;
    lesson_times_by_weekdays: LessonTimesByWeekTypes[];
}