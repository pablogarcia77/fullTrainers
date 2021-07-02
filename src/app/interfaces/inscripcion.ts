import { Alumno } from "./alumno";

export interface Inscripcion {
    alumno: Alumno;
    estado_pago: boolean;
    fecha: Date;
}