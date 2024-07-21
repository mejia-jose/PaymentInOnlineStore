import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BackButton from '../components/layout/BackButton';

// Componente de Entrega
const Delivery = ({
    address,
    orderNumber,
    purchaseDate,
    estimatedDeliveryDate,
    shippingMethod,
    shippingCost,
    deliveryInstructions, 
}) => {

    let productsData = localStorage.getItem('products');
    productsData = JSON.parse(productsData);
    const navigate = useNavigate();
    const viewDetail = (product) => {
        navigate(`/detail/${product.id}`, { state: { product } });
    };
    return (
        <div>
        <Header />
            <div className="container mx-auto p-4" role="main">
                
                <div style={styles.container}>
                <BackButton
                    onClick={viewDetail(productsData)}
                    label="Ver detalle del producto"
                />
                    {/* Dirección de Entrega */}
                    <div style={{ ...styles.section, ...styles.address }}>
                        <h2>Dirección de Entrega</h2>
                        <p><span style={styles.label}>Dirección Completa:</span><span style={styles.value}>{address}</span></p>
                    </div>

                    {/* Datos del Pedido */}
                    <div style={{ ...styles.section, ...styles.orderInfo }}>
                        <h2>Datos del Pedido</h2>
                        <p><span style={styles.label}>Número de Pedido:</span><span style={styles.value}>{orderNumber}</span></p>
                        <p><span style={styles.label}>Fecha de Compra:</span><span style={styles.value}>{purchaseDate}</span></p>
                        <p><span style={styles.label}>Fecha Estimada de Entrega:</span><span style={styles.value}>{estimatedDeliveryDate}</span></p>
                    </div>

                    {/* Método de Envío y Costo */}
                    <div style={{ ...styles.section, ...styles.shippingInfo }}>
                        <h2>Detalles del Envío</h2>
                        <p><span style={styles.label}>Método de Envío:</span><span style={styles.value}>{shippingMethod}</span></p>
                        <p><span style={styles.label}>Costo de Envío:</span><span style={styles.value}>{shippingCost}</span></p>
                    </div>

                    {/* Instrucciones de Entrega */}
                    <div style={{ ...styles.section, ...styles.instructions }}>
                        <h2>Instrucciones de Entrega</h2>
                        <p><span style={styles.label}>Instrucciones:</span><span style={styles.value}>{deliveryInstructions}</span></p>
                    </div>
                </div>
            </div>
        <Footer />
        </div>
    );
};

// Estilos en línea
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        marginTop:'70px'
    },
    section: {
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        marginTop:'10px'
    },
    address: {
        backgroundColor: '#f9f9f9'
    },
    orderInfo: {
        backgroundColor: '#e9f5ff'
    },
    shippingInfo: {
        backgroundColor: '#fff8e1'
    },
    instructions: {
        backgroundColor: '#f4f4f4'
    },
    label: {
        fontWeight: 'bold'
    },
    value: {
        marginLeft: '10px'
    }
};

export default Delivery;
