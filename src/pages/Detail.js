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

  const pathImage = '/assets/images/productos'; // Ruta desde la raíz del servidor
  const productImage = `${pathImage}/${product.image}`;

  //Se maneja el estado de la animación de las imagenes
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const stateMouseEnter = () => setZoom(true);
  const stateMouseLeve = () => setZoom(false);
  const stateMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setPosition({ x, y });
  };


  return (

    <div>
        <Header />
        <div className="container mx-auto p-4" role="main">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden p-6 contentTarjetDetail">
            <BackButton to="/" label=" Volver a la tienda" /><br></br>
                <div className="flex flex-col md:flex-row">
                    <div className="flex justify-center">
                        <div
                            className="relative w-full max-w-[60vw] md:max-w-[45vw] lg:max-w-[30vw] lg:h-auto overflow-hidden rounded-md"
                            onMouseEnter={stateMouseEnter}
                            onMouseLeave={stateMouseLeve}
                            onMouseMove={stateMouseMove}
                            >
                                <img
                                    src={productImage}
                                    alt={product.name}
                                    className={`w-full h-full object-cover transition-transform duration-300 ease-in-out ${zoom ? 'transform scale-150' : ''}`}
                                    style={{ transformOrigin: `${position.x}% ${position.y}%` }}
                                />
                        </div>
                    </div>

                    <div className="mt-4 md:mt-0 md:ml-6">
                        <h2 className="text-2xl font-semibold text-gray-800 titleProductDetail">{product.name}</h2>
                        <div className="p-4">
                            <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg lg:text-xl">
                                {product.description}
                            </p>
                            <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-4 colorPrice">
                                {formatPrice(product.price)}
                            </p>
                            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mt-2">
                                Stock disponible: {product.stock}
                            </p>
                        </div>

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
