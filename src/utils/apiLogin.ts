import axios from 'axios';
import { environment } from '../environments/environment';
import type { User } from '../interface/interface';

const baseURL = environment.urlApi;

// Obtener todos los usuarios
export const getAllUser = async() => {
    try {
        const response = await axios.get(`${baseURL}/get-user`); 
        if (response.data) {
            return response.data; 
        }
        throw new Error('La API retornó datos en un formato inesperado.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al obtener los usuarios (API Response):', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al obtener los usuarios:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al obtener los usuarios:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}

// Login de usuario 
export const loginUser = async(user: User) => {
    try {
        const response = await axios.post(`${baseURL}/login`, user);
        if (response) {
            return response.data
        }
        throw new Error('La API retornó datos en un formato inesperado.');
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            console.error('Error al intentar ingresar (API Response):', error.response.data.message);
            throw new Error(error.response.data.message);
        } else if (axios.isAxiosError(error)) {
            console.error('Error de red al intentar ingresar:', error.message);
            throw new Error('El servidor no está disponible. Revisa la conexión.');
        } else {
            console.error('Error desconocido al intentar ingresar:', error);
            throw new Error('Ocurrió un error inesperado.');
        }
    }
}
