// Obtén la URL base para el entorno de desarrollo
export const DevApiUrl = () => {
    const protocol = window.location.protocol; 
    const host = window.location.hostname; 
    const baseUrl = `${protocol}//${host}`;
    const API_URL = `${baseUrl}:8000`; // Asumiendo que el puerto 8000 es para desarrollo
    return API_URL;
};

export const ProdApiUrl = () => 
{
    const PROD_API_URL = 'https://api.tuservidor.com';
    return PROD_API_URL;
};
