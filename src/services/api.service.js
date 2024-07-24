import axios from 'axios';

// URL base de la api
const protocol = window.location.protocol; 
const host = window.location.hostname; 
const baseUrl = `${protocol}//${host}`;
const API_URL = baseUrl+':8000';

//Permite conectar con mi backen y obtener los productos
export const AllProducts = async () =>
{
    try
    {
        const response = await axios.get(API_URL+'/api/product/all', {
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

//Permite realizar la petición para obtener el token de la tarjeta de crédito
export const TokenCard = async (data) =>
{
    try 
    {
      const response = await axios.post(`${API_URL}/api/transaction/token-card`, data);
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
        const response = await axios.get(`${API_URL}/api/transaction/acceptance-token`);
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
        const response = await axios.post(`${API_URL}/api/transaction/payment`, data);
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
     const response = await axios.post(`${API_URL}/api/transaction/status-payment/`, {
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

  
