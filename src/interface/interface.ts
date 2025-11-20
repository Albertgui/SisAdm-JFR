export interface ProyectoDetalle {
    id_proyecto: string;
    nombre: string;
    cedula: string;
    nombre_proyecto: string;
    presupuesto: number;
    fecha_inicio: string;
    fecha_fin: string;
}

export interface InfoProyectoCompleta{
    id_persona: string;
    nombre_proyecto: string;
    presupuesto: number;
    fecha_inicio: string;
    fecha_fin: string;
}

export interface FormValues {
    id: string;
    fullname: string;
    idProject: number;
    projectName: string;
    budget: number;
    initialDate: string;
    finalDate: string;
}

export interface PersonData {
    nombre: string;
    cedula: string;
}