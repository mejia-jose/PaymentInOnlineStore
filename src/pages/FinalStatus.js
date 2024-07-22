import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BackButton from '../components/layout/BackButton';

const CompraFinal = () => {
  const producto = {
    nombre: 'Laptop',
    precio: 1500,
    descripcion: 'Una laptop potente para desarrollo y gaming'
  };

  const estadoCompra = {
    estado: 'Completo',
    fechaCompra: '2024-07-22',
    metodoPago: 'Tarjeta de Crédito'
  };

  return (
    <div>
         <Header />
         <div className="container mx-auto p-4 pTo" role="main">
            <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-md">
                <h2 className='label'>Estado final de la compra</h2><br></br>
                <div className="producto">
                    <h3>Producto</h3>

                    <ul className="text-gray-700">
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Nombre: </span>
                        <span>{'dataUser.name'}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Precio : </span>
                        <span>{'dataUser.email'}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Descripción : </span>
                        <span>{'dataUser.telf'}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Cantidad : </span>
                        <span>{'dataUser.telf'}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Total compra : </span>
                        <span>{'dataUser.telf'}</span>
                    </li>
                </ul>
                </div>
                <div className="estado-compra">
                    <h3>Estado de la Compra</h3>
                    <p><strong>Estado:</strong> {estadoCompra.estado}</p>
                    <p><strong>Fecha de Compra:</strong> {estadoCompra.fechaCompra}</p>
                    <p><strong>Método de Pago:</strong> {estadoCompra.metodoPago}</p>
                </div><br></br>
                <button  style={{color:'#fff',background:'#bd560d'}} className="w-full buttonCard hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                   Vover al comercio
                </button>
            </div>
        </div>
         <Footer />
    </div>
  );
};

export default CompraFinal;
