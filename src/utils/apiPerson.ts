import axios from 'axios';
import { environment } from '../environments/environment';
import type { PersonData } from '../interface/interface';

/**
 * Función para obtener todos los proyectos con detalles de la persona.
 * @param personData Objeto con el nombre y cédula de la persona a crear.
 * @returns Promesa que resuelve en el objeto Persona creado por el servidor.
 */

const baseURL = environment.urlApi

// Obtener todas las personas
export const getAllPerson = async (): Promise<PersonData[]> => {
    try {
        const response = await axios.get(`${baseURL}/person/all-person`);
        if (Array.isArray(response.data)) {
            return response.data as PersonData[];
        }
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data as PersonData[];
        }
        throw new Error('La API retornó datos en un formato inesperado (no es un array de PersonData).');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = (error.response.data as { message?: string })?.message || 'Error desconocido del servidor.';
            console.error('Error al obtener personas (API Response):', error.response.data);
            throw new Error(`Error ${error.response.status}: ${serverMessage}`);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al obtener personas:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al obtener personas:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Obtener una persona
export const getOnePerson = async (cedula: string): Promise<PersonData[]> => {
    try {
        const response = await axios.get(`${baseURL}/person/${cedula}`);
        if (Array.isArray(response.data)) {
            return response.data as PersonData[];
        }
        if (response.data && Array.isArray(response.data.data)) {
            return response.data.data as PersonData[];
        }
        throw new Error('La API retornó datos en un formato inesperado (no es un array de PersonData).');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const serverMessage = (error.response.data as { message?: string })?.message || 'Error desconocido del servidor.';
            console.error('Error al obtener personas (API Response):', error.response.data);
            throw new Error(`Error ${error.response.status}: ${serverMessage}`);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al obtener personas:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al obtener personas:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Enviar datos de una persona
export const postInfoPerson = async (personData: PersonData): Promise<PersonData> => {
    try {
        const response = await axios.post(`${baseURL}/person`, personData);
        if (response.data && response.data.nombre && response.data.cedula) {
            return response.data as PersonData;
        }
        if (response.data && response.data.data) {
            return response.data as PersonData;
        }
        throw new Error('La API retornó datos en un formato inesperado.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al enviar datos (API Response):', error.response.data);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al enviar datos:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al enviar datos:', error);
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