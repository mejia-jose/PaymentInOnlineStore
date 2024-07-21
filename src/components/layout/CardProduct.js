import React from 'react';
import { useNavigate } from 'react-router-dom';
import {formatPrice} from '../../services/format-price'

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
      
    //contenedorTarjet
    
  return (
    <div className="border p-4  h-50 contenedorTarjet borderTarjet shadow-md rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl ">
      <img src={product.image} alt={product.name} className="w-full h-50 object-cover"/>
      <div className="p-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 textName">{product.name}</h2>
        <p className="text-gray-600 mb-4 textDescription">{cantPalabras(product.description, 40)}</p> 
        <div className="flex items-center justify-center">
          <p className="text-2xl font-bold text-gray-900 colorPrice">{formatPrice(product.price)}</p><br></br>
        </div>
        <div className="flex items-center justify-center">
          <button onClick={() => viewDetail(product)} className="buttonCard py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
            Comprar {product.name}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
