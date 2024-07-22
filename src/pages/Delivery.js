import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import {formatPrice,tarifas} from '../services/format-price';

// Componente de Entrega
const Delivery = () => {

    const navigate = useNavigate(); //Se instancia el navigate para manejar rutas

    /**********Se obtiene la información del modal del store de Redux */
    const dataUser = useSelector((state) => state.getDataUser.dataUser);//Para obtener el estado con la info de redux del usuario
    const productsData = useSelector((state) => state.getProdusts.products);//Para obtener el estado con la info de redux del producto

    /*************************Función que permite devolver a la vista del detalle del producto */
    const viewDetailProducto = (product) => {
        navigate(`/detail/${product.id}`, { state: { product } });
    };

    /*************Función que permite redireccionar a la vista del resumen de la compra***************/
    const viewSummary = () =>
    {
        navigate("/summary");
    }


    /*************************Fecha de compra y fecha de entrega********************************************************* */
    const fechaActual = new Date();
    const year = fechaActual.getFullYear();
    const month = fechaActual.getMonth() + 1;
    const day = fechaActual.getDate();

    const fechaCompra = `${day}/${month}/${year}`;

    const fechaEstimada = new Date(fechaActual);
    fechaEstimada.setDate(fechaEstimada.getDate() + 7);
    const yearEntrega = fechaEstimada.getFullYear();
    const monthEntrega = fechaEstimada.getMonth() + 1;
    const dayEntrega = fechaEstimada.getDate();

    const fechaEntrega = `${dayEntrega}/${monthEntrega}/${yearEntrega}`;

    return (
        <div>
        <Header />
            <div className="container mx-auto p-4" role="main">
                
                <div className='containerDelivery'>
                 
                 <button onClick={() => viewDetailProducto(productsData)}   className="buttonReject px-4 py-2 bg-gray-300 text-gray-800 rounded-md flex items-center justify-center">
                    <i className="fa-solid fa-arrow-left p-2"></i>  Ver detalle del producto
                </button>

                    {/* Dirección de Entrega */}
                    <div className='section' style={{ background: '#f9f9f9', textAlign:'justify' }}>
                        <h2 className='label'>Información de contacto para la entrega</h2>
                        <p><span className='label'>Email:</span><span className='value'>{dataUser.email}</span></p>
                        <p><span className='label'>Celular:</span><span className='value'>{dataUser.telf}</span></p>
                        <p><span className='label'>Dirección de residencia:</span><span className='value'>{dataUser.dir}</span></p>
                    </div>

                    {/* Datos del Pedido */}
                    <div className='section' style={{ background: '#f4f4f4', textAlign:'justify' }}>
                        <h2 className='label'>Datos del pedido</h2>
                        <p><span className='label'>Número de pedido:</span><span className='value'>{productsData.id}</span></p>
                        <p><span className='label'>Nombre del producto:</span><span className='value'>{productsData.name}</span></p>
                        <p><span className='label'>Fecha de compra:</span><span className='value'>{fechaCompra}</span></p>
                        <p><span className='label'>Fecha estimada de entrega:</span><span className='value'>{fechaEntrega}</span></p>
                    </div>

                    {/* Método de Envío y Costo */}
                    <div className='section' style={{ background: '#fff8e1', textAlign:'justify' }}>
                        <h2 className='label'>Detalles del envío</h2>
                        <p><span className='label'>Método de envío:</span><span className='value'>Estándar</span></p>
                        <p><span className='label'>Costo de envío:</span><span className='value'>{formatPrice(tarifas.costoEnvio)}</span></p>
                    </div><br></br>

                    <button onClick={viewSummary}  style={{color:'#fff',background:'#bd560d'}} className="w-full buttonCard hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                      Ver resumen de la compra
                    </button>
                </div>
            </div>
        <Footer />
        </div>
    );
};

export default Delivery;
