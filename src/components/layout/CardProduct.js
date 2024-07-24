import React from 'react';
import { useNavigate } from 'react-router-dom';
import {formatPrice} from '../../services/format-price';

function CardProduct({ product })
{
    const navigate = useNavigate();

    const viewDetail = (product) => {
        navigate(`/detail/${product.id}`, { state: { product } });
    };

    const cantPalabras = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.substring(0, maxLength) + '...';
    };

    const pathImage = '/assets/images/productos'; // Ruta desde la raíz del servidor
    const productImage = `${pathImage}/${product.image}`;  
      
  return (
    <div className="border p-6  contenedorTarjet borderTarjet shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl ">
      <div className="flex justify-center">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-auto md:w-1/2 md:h-40 max-w-xs md:max-w-md rounded-md"
        />
      </div>

      <div className="p-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 textName">{product.name}</h2>
        <p className="text-gray-600 mb-4 textDescription">{cantPalabras(product.description, 40)}</p> 
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-900 colorPrice">{formatPrice(product.price)}</p><br></br>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => viewDetail(product)} className="buttonCard py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
            Comprar este producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
