
export const formatPrice = (price) => 
{
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
};

export const tarifas = {
    costoEnvio: 12000,
    tarifaBase: 4500
};
  