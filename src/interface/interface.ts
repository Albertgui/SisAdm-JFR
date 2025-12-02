import type { GridRenderCellParams } from "@mui/x-data-grid";

export interface ProyectoDetalle {
    id: string;
    id_proyecto: number;
    nombre?: string;
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

export interface ActionsProps{
    rowData: GridRenderCellParams["row"];
}

export interface CreatePersonProps {
    refreshTable: () => void; 
}

export interface PersonProps extends ActionsProps{
    refreshTable: () => void; 
}

export interface ValidationErrors {
    responsable: string;
    nombre_proyecto: string;
    presupuesto: string;
    fecha_inicio: string;
    fecha_fin: string;
};

export interface TouchedState {
    responsable: boolean;
    nombre_proyecto: boolean;
    presupuesto: boolean;
    fecha_inicio: boolean;
    fecha_fin: boolean;
};

export interface Factura {
    id: number;
    nombre_archivo: string,
    url_completa: string
}