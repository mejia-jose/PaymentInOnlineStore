import React, { useState,useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {formatPrice} from '../services/format-price';
import {consultPaymentStatus} from '../services/api.service';
import { persistor } from '../redux/store';

const totalMonto = (precio,cantidad) =>
{
    const total = (precio * cantidad);
    return total;
}

// Función para consultar repetidamente el estado hasta que sea APROVED
const consultPaymentStatusAproved = async (idTransaction, interval = 5000, setStatus,setStatusPayment,product,cantProductosSelected) =>
{
    let status = false;
    let cont = 1;
    while (cont < 6) {
      const result = await consultPaymentStatus(idTransaction,product,cantProductosSelected);
      const data = result.data
      
      const estado = statusPago(data.status);
      setStatusPayment(estado);
      if (data.status === 'APPROVED') {
        status = true;
        setStatus(true); 
        return data; 
      }
      cont++;
      await new Promise(resolve => setTimeout(resolve, interval));
    }
};

const statusPago = (state) =>
{
    let valor = 'Error en la transacción'
    switch (state) {
    case 'APPROVED':
        valor = 'Transacción Aprobada'
    break;

    case 'DECLINED':
        valor = 'Transacción Rechazada'
    break;

    case 'VOIDED':
        valor = 'Transacción Anulada'
    break;
    
    default:
        valor = 'Error en la transacción'
        break;
    }
    return valor;
}

const CompraFinal = () => {
  
    const dataUser = useSelector((state) => state.getDataUser.dataUser);//Para obtener el estado con la info de redux del usuario
    const dataPago = useSelector((state) => state.getDataUser);//Para obtener el estado con la info de redux del pago
    const product = useSelector((state) => state.getProdusts.products);//Para obtener el estado con la info de redux del producto

    const totalCantProductosSelected = useSelector((state) => state.getCantidad.productos);//Se obtiene la información de la cantidad del producto seleccionado
    const productDetails =  totalCantProductosSelected.find(p => p.idProducto === product.id);
    const cantProductosSelected = productDetails ? productDetails.cantProductosSelected : 1; // Por ejemplo, 1
    const total = totalMonto(product.price, cantProductosSelected);

    const [statusPaymentAproved, setStatusPaymentAproved] = useState(false);
    const [statusPayment, setStatusPayment] = useState('Transacción Pendiente');
    const idTransaction = dataPago && dataPago.idTransaction ? dataPago.idTransaction :0;
    
    const navigate = useNavigate(); //Se instancia el navigate para manejar rutas

    const volver = () =>
    {
        persistor.purge();
        navigate("/");
    }

    
    useEffect(() => 
    {
        consultPaymentStatusAproved(idTransaction, 5000, setStatusPaymentAproved,setStatusPayment,product,cantProductosSelected);

    }, [idTransaction]);

    if(idTransaction == 0)
    {
        navigate("/");
    }
        

  return (
    <div>
         <Header />
         <div className="container mx-auto p-4 pTo" role="main">
            <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-md">
                <h2 className='label'>Estado final de la compra</h2>
                <div className="bg-blue-100 p-2 rounded mb-2">
                    <h3 className="text-lg font-semibold mb-2">Información del cliente</h3>
                    <p><strong>Nombre:</strong> {dataUser.name}</p>
                    <p><strong>Email:</strong> {dataUser.email}</p>
                    <p><strong>Celular:</strong> {dataUser.telf}</p>
                </div>
                <div className="bg-green-100 p-2 rounded mb-2">
                    <h3 className="text-lg font-semibold mb-2">Información del producto</h3>
                    <p><strong>Nombre:</strong> {product.name}</p>
                    <p><strong>Cantidad:</strong> {cantProductosSelected}</p>
                </div>
                <div className="bg-yellow-100 p-2 rounded mb-2">
                    <h3 className="text-lg font-semibold mb-2">Información del pago</h3>
                    <p><strong>Estado:</strong> {statusPayment}</p>
                    <p><strong>Total compra:</strong> {formatPrice(total)} </p>
                    <p><strong>Método de pago:</strong> Tarjeta de crédito</p>
                    <p><strong>Tarjeta:</strong> {dataPago.type}</p>
                    <p><strong>Referencia:</strong> {dataPago.idTransaction}</p>
                </div>

                { statusPaymentAproved ? (
                    <button
                    style={{ color: '#fff', background: '#bd560d' }} onClick={volver}
                    className="w-full buttonCard hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                    > Volver al comercio </button>
                ) : (
                    <div>
                        <p className="mt-4 text-red-500 font-medium p-2">
                         <strong>No se ha podido finalizar su compra, debido a que la {statusPayment}, por favor no se salga de esta pantalla mientras reitentamos.</strong>
                       </p>
                     <button
                     style={{ color: '#fff', background: '#bd560d' }} onClick={volver}
                     className="w-full buttonCard hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                     > Volver al comercio </button>
                    </div>
                )}
            </div>
        </div>
         <Footer />
    </div>
  );
};

export default CompraFinal;
