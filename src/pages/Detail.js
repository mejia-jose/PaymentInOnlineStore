import React, { useState,useEffect } from 'react';
import { json, useLocation } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ModalCreditCard from '../components/layout/ModalCreditCard';
import { useSelector, useDispatch } from 'react-redux';
import {getCantidad} from '../redux/slice/counterProduct';
import {getProdustsDetail} from '../redux/slice/getProducts';
import BackButton from '../components/layout/BackButton';
import {formatPrice} from '../services/format-price';


function DetailProduct()
{
    const location = useLocation();
    const { product } = location.state; //Se obtiene toda la información de un producto
    console.log(product)
    const dispatch = useDispatch();
    const totalCantProductosSelected = useSelector((state) => state.getCantidad.productos);//Se obtiene la información de la cantidad del producto seleccionado
    const productDetails =  totalCantProductosSelected.find(p => p.idProducto === product.id);
    const cantProductosSelected = productDetails ? productDetails.cantProductosSelected : 1; // Por ejemplo, 1
   
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () =>
    {
        dispatch(getProdustsDetail(product));
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

  //Función para aumentar o disminuir la cantidad de productos
  const countCantidad = (options) =>
  {
    if(options == 'min')
    {
        if(cantProductosSelected > 1)
        {
            dispatch(getCantidad(
            {
                cantProductosSelected: cantProductosSelected - 1,
                idProducto: product.id
            } ));
 
        }
    }
    
    else if(options == 'max')
    {
        if(cantProductosSelected < product.stock)
        {
            dispatch(getCantidad(
            {
                cantProductosSelected: cantProductosSelected + 1,
                idProducto: product.id
            }));
        }
    }
  }

  return (

    <div>
        <Header />
        <div className="container mx-auto p-4" role="main">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 contentTarjetDetail">
            <BackButton to="/" label=" Volver a la tienda" />
                <div className="flex flex-col md:flex-row">
                    <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-68 object-cover rounded-md" />
                    <div className="mt-4 md:mt-0 md:ml-6">
                        <h2 className="text-2xl font-semibold text-gray-800 titleProductDetail">{product.name}</h2>
                        <p className="text-gray-600 mt-2 textDescriptionDetail">{product.description}</p>
                        <p className="text-2xl font-bold text-gray-900 mt-4 colorPrice">{formatPrice(product.price)}</p>
                        <p className="text-lg text-gray-700 mt-2 textDescriptionDetail">Stock disponible: {product.stock}</p>
                        <div className="flex justify-center mt-4">
                            <div className="flex items-center space-x-2">
                                <p className="text-lg text-gray-700 mt-2 textDescriptionDetail">Cantidad</p>
                                <a onClick={() => countCantidad('min')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md buttonCard flex items-center justify-center">
                                    <i className="fa-solid fa-minus"></i>
                                </a>
                                <a className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md buttonCard flex items-center justify-center">
                                 {cantProductosSelected}
                                </a>
                                <a onClick={() => countCantidad('max')} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md buttonCard flex items-center justify-center">
                                    <i className="fa-solid fa-circle-plus"></i>
                                </a>
                            </div>

                        </div>
                        <button onClick={openModal} className="mt-6 buttonCard bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">
                           Paga con tarjeta de crédito
                        </button>
                        <ModalCreditCard isOpen={modalIsOpen} closeModal={closeModal} />
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
    
  );
}

export default DetailProduct;
