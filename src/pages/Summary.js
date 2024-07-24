import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BackButton from '../components/layout/BackButton';
import {formatPrice,tarifas} from '../services/format-price';
import {paymentTransactions,getAcceptanceToken} from '../services/api.service';
import { getTransactions } from '../redux/slice/dataUser';

// Componente de Acordeón
const AccordionItem = ({ title, children }) => {
  const [isOpen, setAcordeon] = useState(false);

  const acordeonToogle = () => {
    setAcordeon(!isOpen);
  };

  return (
    <div className="mb-2">
      <button 
        onClick={acordeonToogle}
        className="w-full text-left bg-gray-200 p-3 rounded-md focus:outline-none flex justify-between items-center"
      >
        <span className="font-medium">{title}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && <div className="p-3 text-gray-700">{children}</div>}
    </div>
  );
};

const totalMonto = (precio,cantidad) =>
{
    const total = (precio * cantidad);
    return total;
}

// Componente Principal Summary
const Summary = () =>
{
    /**********Se obtiene la información del modal del store de Redux */
    const dispatch = useDispatch(); //Para disparar la acion en redux
    const dataUser = useSelector((state) => state.getDataUser.dataUser);//Para obtener el estado con la info de redux del usuario
    const product = useSelector((state) => state.getProdusts.products);//Para obtener el estado con la info de redux del producto
    const dataCard = useSelector((state) => state.getDataUser);
    const [loading, setLoading] = useState(false);

    const totalCantProductosSelected = useSelector((state) => state.getCantidad.productos);//Se obtiene la información de la cantidad del producto seleccionado
    const productDetails =  totalCantProductosSelected.find(p => p.idProducto === product.id);
    const cantProductosSelected = productDetails ? productDetails.cantProductosSelected : 1; // Por ejemplo, 1
    const total = totalMonto(product.price, cantProductosSelected);

    const navigate = useNavigate(); //Se instancia el navigate para manejar rutas

    const viewFinalCompra = () =>
    {
        navigate("/final-status");
    }

    const payment = async () =>
    {
        
        setLoading(true);
    
        try
        {
            
            const token = await getAcceptanceToken();
            const res = await paymentTransactions(
            {
                "amount_in_cents": total + tarifas.tarifaBase + tarifas.costoEnvio,
                "reference":product.id,
                "customer_email": dataUser.email,
                "installments": dataCard.cuotas,
                "token": dataCard.idTokenCard,
                "accept":token.data
            }); 

            if (!res && res.statusText !== 'Created') 
            {
              throw new Error('No se ha podido efectuar el pago. Por favor, verifique su información e intente nuevamente. Si el problema persiste, contacte con el soporte técnico.');
            }

            const  data  = res.data;

            dispatch(getTransactions({ created_at:data.data.created_at, idTransaction: data.data.id, referencia: data.data.reference,estadoCompra: data.data.status}));
            viewFinalCompra();

        } catch (error){  alert(error) } finally {  setLoading(false); }
    }

  return (
    <div>
         <Header />
         <div className="container mx-auto p-4 pTo" role="main">
            <BackButton to="/detail-delivery" label="Información de entrega" /><br></br>
            <div className="max-w-lg mx-auto bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">Resumen de la compra</h2>
            { loading && <div className="loader-container">
                <div className="loader"></div>
                <div className="loader-text">Validando información, ya pronto se efectuará el pago...</div>
                </div>
            }

            <AccordionItem title="Información del cliente">
                <ul className="text-gray-700">
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Nombre completo: </span>
                        <span>{dataUser.name}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Correo electrónico : </span>
                        <span>{dataUser.email}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Celular : </span>
                        <span>{dataUser.telf}</span>
                    </li>
                </ul>
            </AccordionItem>

            <AccordionItem title="Información de la tarjeta de crédito">
                <ul className="text-gray-700">
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Número de tarjeta: </span>
                        <span>{dataUser.cardNumber}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Fecha de expiración : </span>
                        <span>{dataUser.expiryDate}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">CVV : </span>
                        <span>{dataUser.cvv}</span>
                    </li>
                    
                </ul>
            </AccordionItem>

            <AccordionItem title="Dirección de entrega">
                <ul className="text-gray-700">
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Dirección de residencia: </span>
                        <span>{dataUser.dir}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Código postal: </span>
                        <span>{dataUser.codPostal}</span>
                    </li>
                </ul>
            </AccordionItem>

            <AccordionItem title="Resumen del pago" state="true">
                <ul className="text-gray-700">
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Producto: </span>
                        <span>{product.name}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Cantidad de productos: </span>
                        <span>{cantProductosSelected}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Monto del producto: </span>
                        <span>{formatPrice(total)}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Tarifa base: </span>
                        <span>{formatPrice(tarifas.tarifaBase)}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Tarifa de envió: </span>
                        <span>{formatPrice(tarifas.costoEnvio)}</span>
                    </li>
                    <li className="floeatLeft">
                        <span className="font-medium w-48 label">Total: </span>
                        <span>{formatPrice(total + tarifas.tarifaBase + tarifas.costoEnvio)}</span>
                    </li>
                </ul>
            </AccordionItem>

            <button  onClick={payment} style={{color:'#fff',background:'#bd560d'}} className="w-full buttonCard hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300">
                Finalizar compra
            </button>

            </div>
        </div>
         <Footer />
    </div>
  );
};

export default Summary;
