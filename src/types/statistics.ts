import { GroupsDTO } from "./groups";
import { TeachersDTO } from "./teachers";

export type IncomeStatisticsDTO = {
    total: number;
    annual: number;
    monthly: number;
    income_by_years: IncomeByYears[];
}

export type MainPageStatisticsDTO = {
    total_groups_count: number;
    total_teachers_count: number;
    total_pupils_count: number;
    total_clients_count: number;
    groups: GroupsDTO[];
    teachers: TeachersDTO[];
}

export type PaymentStatisticsDTO = {
    total_payments: number;
    annual_payments: number;
    monthly_payments: number;
    total_outcomes: number;
    annual_outcomes: number;
    monthly_outcomes: number;
    payment_by_years: PaymentByYears[];
    outcome_by_years: OutcomeByYears[];
}

type IncomeByMonths = {
    month_id: number;
    month: string;
    income: number
}

type IncomeByYears = {
    year: number;
    income: number;
    income_by_months: IncomeByMonths[];
}

type PaymentByMonths = {
    month_id: number;
    month: string;
    payment: number
}

type PaymentByYears = {
    year: number;
    payment: number;
    payment_by_months: PaymentByMonths[]
}

type OutcomeByYears = {
    year: number;
    outcome: number;
    outcome_by_months: PaymentByMonths[]
}