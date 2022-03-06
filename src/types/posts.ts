import { UsersDTO } from "./users";

export type PostsDTO = {
    id: number;
    student: UsersDTO;
    employee: string;
    text: string;
    status: 'Delivered' | 'Transmitted' | 'NotDelivered' | 'Rejected' | 'Failed' | 'Expired',
    error_description: string | null;
    created_time: string;
}