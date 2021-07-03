import { Instructor } from "./instructor";

export interface Usuario{

    usuario: string;
    password: string;
    token: string;
    instructor: Instructor;
}