export interface Curso {
    nombre: string;
    descripcion: string;
    requisitos: string;
    publico_destinado: string;
    url_imagen_presentacion: string;
    url_video_presentacion: string;
    id_cursos: number;
    id_subrubros: number,
    precio_cuota: number;
    precio_inscripcion: number;
    cantidad_cuotas: number;
    estado_eliminacion: number;
    estado_publicacion: number;
    habilita_inscripcion: number;
}