import axios from 'axios';
import {DevApiUrl,ProdApiUrl} from './utils'

// URL base de la api
const host = window.location.hostname;
const API_URL = (host == 'localhost') ? DevApiUrl() : ProdApiUrl();
console.log(API_URL)

//Permite conectar con mi backen y obtener los productos
export const AllProducts = async () =>
{
    try
    {
        const response = await axios.get(API_URL+'/product/all', {
            headers: {
              'Content-Type': 'application/json',
            }
        });

       return response.data

    } catch (error)
    {
        console.error('Ah ocurrido un error al realizar la petición:', error);
        throw error; 
    }
};

//Función que permite buscar porductos por texto
export const searchProducts = async (searchParams) =>
{
    try
    {
        
        const response = await axios.get(`http://localhost:8000/api/product/search/${searchParams}`, {
            headers: {
              'Content-Type': 'application/json',
            },
            timeout: 10000 // 10 segundos, ajusta según sea necesario
          });
          
        //console.log(response);

        return response;
    } catch (error)
    {
        console.error('Ah ocurrido un error al realizar la petición a la API:', error);
        throw error; 
    }
}

//Permite realizar la petición para obtener el token de la tarjeta de crédito
export const TokenCard = async (data) =>
{
    try 
    {
      const response = await axios.post(`${API_URL}/transaction/token-card`, data);
      return response;
    } catch (error) 
    {
      console.error('Ha ocurrido un error al realizar la petición:', error);
      throw error; 
    }
};

//Permite realizar la petición para obtener el token de la autorización
export const getAcceptanceToken = async () =>
{
    try 
    {
        const response = await axios.get(`${API_URL}/transaction/acceptance-token`);
        return response;
    } catch (error) 
    {
        console.error('Ha ocurrido un error al realizar la petición:', error);
        throw error; 
    }
};

//Permite realizar la petición para realizar el pago del cliente
export const paymentTransactions = async (data) =>
{
    try 
    {
        const response = await axios.post(`${API_URL}/transaction/payment`, data);
        if (response && response.data)
        {
          return response;
        } else {
            throw new Error('Respuesta inesperada del servidor');
        }
    } catch (error) 
    {
        console.error('Ha ocurrido un error al realizar la petición:', error);
        throw error; 
    }
};


export const consultPaymentStatus = async (idTransaction,product,cantProductosSelected) =>
{
    if (!idTransaction) {
        throw new Error('El ID de transacción no está definido');
    }

  try 
  {
     const response = await axios.post(`${API_URL}/transaction/status-payment/`, {
        idTransaction: idTransaction,
        product: product,
        cantProductosSelected: cantProductosSelected,
      });
      
      return response.data; // Devuelve solo los datos de la respuesta
      
  } catch (error) 
  {
    console.error('Ha ocurrido un error al realizar la petición:', error);
    throw error; 
  }
};

  
