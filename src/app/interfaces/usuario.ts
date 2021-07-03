import { Instructor } from "./instructor";

export interface Usuario{
    id_usuarios: number;
    usuario: string;
    password: string;
    token: string;
    instructor: Instructor;
}