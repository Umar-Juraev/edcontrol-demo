import { genderTypes, PaymentKeyTypes, UserRoleCodeTypes, UserRoleNameTypes, WeekDaysCodeTypes, WeekDaysKeyTypes } from "utils/types";

export const WEEK_DAY_STEPS: { [key in WeekDaysCodeTypes]: { name: WeekDaysKeyTypes } } = {
    0: { name: "dushanba" },
    1: { name: "seshanba" },
    2: { name: "chorshanba" },
    3: { name: "payshanba" },
    4: { name: "juma" },
    5: { name: "shanba" },
    6: { name: "yakshanba" }
}

export const WEEK_DAY_TYPES: { key: WeekDaysCodeTypes, name: WeekDaysKeyTypes }[] = [
    { key: 0, name: "dushanba" },
    { key: 1, name: "seshanba" },
    { key: 2, name: "chorshanba" },
    { key: 3, name: "payshanba" },
    { key: 4, name: "juma" },
    { key: 5, name: "shanba" },
    { key: 6, name: "yakshanba" }
]

export const MONTH_TYPES: { key: number, name: string }[] = [
    { key: 0, name: "January" },
    { key: 1, name: "February" },
    { key: 2, name: "March" },
    { key: 3, name: "April" },
    { key: 4, name: "May" },
    { key: 5, name: "June" },
    { key: 6, name: "July" },
    { key: 7, name: "August" },
    { key: 8, name: "September" },
    { key: 9, name: "October" },
    { key: 10, name: "November" },
    { key: 11, name: "December" }
]

export const ROLE_TYPES = [
    { value: 1000, title: "Super user" },
    { value: 999, title: "CEO" },
    { value: 100, title: "Marketer" },
    { value: 99, title: "Administrator" },
    { value: 10, title: "Cashier" }
]

export const GROUP_TYPE = [
    { title: "12 Kunlik", value: 12 },
    { title: "Oylik", value: 0 },
]

export const GROUP_STEPS: { [key: number]: { name: string } } = {
    0: { name: "Oylik" },
    12: { name: "12 Kunlik" }
}

export const GENDER_TYPE: { title: string, value: string }[] = [
    { title: "Erkak kishi", value: "male" },
    { title: "Ayol kishi", value: "female" },
]

export const USER_ROLE_STATES: { [key in UserRoleCodeTypes]: { name: UserRoleNameTypes } } = {
    "1000": { name: "Super user" },
    "999": { name: "CEO" },
    "100": { name: "Marketer" },
    "99": { name: "Administrator" },
    "10": { name: "Cashier" }
}

export const GENDER_STEPS: { [key in genderTypes]: { name: string } } = {
    'male': { name: 'Erkak kishi' },
    'female': { name: 'Ayol kishi' }
}

export const PAYMENT_TYPE: { title: string, value: PaymentKeyTypes }[] = [
    { title: 'Naqd orqali', value: 'cash' },
    { title: 'Click orqali', value: 'click' },
    { title: 'Payme orqali', value: 'payme' }
]

export const PAYMENT_STEPS: { [key in PaymentKeyTypes]: { name: string } } = {
    'cash': { name: 'Naqd pul' },
    'click': { name: 'Click' },
    'payme': { name: 'Payme' }
}

export const LessonDurationOptions = [
    { title: `30 daqiqa`, value: 30 },
    { title: `40 daqiqa`, value: 40 },
    { title: `60 daqiqa`, value: 60 },
    { title: `90 daqiqa`, value: 90 },
    { title: `120 daqiqa`, value: 120 },
    { title: `180 daqiqa`, value: 180 },
]

export const CourseDurationOptions = [
    { title: `1 oy`, value: 1 },
    { title: `2 oy`, value: 2 },
    { title: `3 oy`, value: 3 },
    { title: `4 oy`, value: 4 },
    { title: `5 oy`, value: 5 },
    { title: `6 oy`, value: 6 },
    { title: `7 oy`, value: 7 },
    { title: `8 oy`, value: 8 },
    { title: `9 oy`, value: 9 },
    { title: `10 oy`, value: 10 },
    { title: `11 oy`, value: 11 },
    { title: `12 oy`, value: 12 },
]

export const BooleanOptions = [
    { title: `Ha`, value: 1 },
    { title: `Yo'q`, value: 0 }
]