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

export const paymentTransactions = async (data) =>
{
    try 
    {
        const response = await axios.post(`${API_URL}/api/transaction/payment`, data);
        return response;
    } catch (error) 
    {
        console.error('Ha ocurrido un error al realizar la petición:', error);
        throw error; 
    }
};
  
