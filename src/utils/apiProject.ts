import axios from 'axios';
import { environment } from '../environments/environment';
import type { InfoProyectoCompleta, ProyectoDetalle } from '../interface/interface';

/**
 * Función para obtener todos los proyectos con detalles de la persona.
 * @param personData Objeto con el nombre y cédula de la persona a crear.
 * @returns Promesa que resuelve en el objeto Persona creado por el servidor.
 */

const baseURL = environment.urlApi

// Obtener datos para la tabla
export const getDataTable = async (): Promise<ProyectoDetalle[]> => {
    try {
        const response = await axios.get(`${baseURL}/project/table`);
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data as ProyectoDetalle[]; 
        }
        if (Array.isArray(response.data)) {
            return response.data as ProyectoDetalle[];
        }
        throw new Error('La API retornó datos en un formato inesperado.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al obtener proyectos (API Response):', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al obtener proyectos:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al obtener proyectos:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Crear un proyecto
export const createProyecto = async (data: InfoProyectoCompleta): Promise<InfoProyectoCompleta[]>  => {
    try {
        const response = await axios.post(`${baseURL}/project`, data); 
        if (response.data) {
            return response.data.message as InfoProyectoCompleta[]; 
        }
        throw new Error('La API retornó datos en un formato inesperado.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al obtener proyectos (API Response):', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al obtener proyectos:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al obtener proyectos:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Cargar imágenes
export const getImg = async(id: number) => {
    try {
        const response = await axios.get(`${baseURL}/project/${id}/bills`); 
        if (response.data) {
            return response.data; 
        }
        throw new Error('La API retornó datos en un formato inesperado.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al obtener las imágenes (API Response):', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al obtener las imágenes:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al obtener las imágenes:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Subir imágenes
export const uploadImg = async(formData: FormData) => {
    try {
        await axios.post(`${baseURL}/project/upload-img`, formData);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al crear las imágenes (API Response):', error.response.data);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al crear las imágenes:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al crear las imágenes:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Editar un proyecto
export const editProyecto = async (data: ProyectoDetalle): Promise<ProyectoDetalle[]> => {
    try {
        const response = await axios.put(`${baseURL}/project/${data.id_proyecto}`, data);
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data as ProyectoDetalle[]; 
        }
        if (Array.isArray(response.data)) {
            return response.data as ProyectoDetalle[];
        }
        throw new Error('La API retornó datos en un formato inesperado.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al editar proyectos (API Response):', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al editar proyectos:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al editar proyectos:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Manejador de errores
export function isApiError(error: unknown): error is { message: string } {
    return (
        typeof error === 'object' &&
        error !== null &&
        'message' in error &&
        typeof (error as { message: unknown }).message === 'string'
    );
}