import React from 'react';
import Header from '../components/layout/Header';
import CardProduct from '../components/layout/CardProduct';
import Footer from '../components/layout/Footer';
import '../assets/styles/Store.css';
import productImage from '../assets/images/1.jpeg';

const products = [
    {
       "id": 1,
      "name": "Auriculares Bose QuietComfort 35 II",
      "description": "Auriculares con cancelación de ruido activa, ideales para viajar y trabajar. Ofrecen una calidad de sonido excepcional y comodidad para largas sesiones de uso.",
      "price": "1299000",
      "stock": 25,
      "image": productImage
    },
    {
      "id": 2,
      "name": "Samsung Galaxy S21",
      "description": "Smartphone con pantalla Dynamic AMOLED 2X de 6.2 pulgadas, procesador Exynos 2100 y cámara triple de 64 MP. Ideal para fotografía y rendimiento alto.",
      "price": "2299000",
      "stock": 15,
      "image": productImage
    },
    {
       "id": 3,
      "name": "Apple MacBook Air M1",
      "description": "Laptop ultradelgada con procesador M1 de Apple, pantalla Retina de 13.3 pulgadas y 8GB de RAM. Perfecta para tareas diarias y profesionales.",
      "price": "3399000",
      "stock": 10,
      "image": productImage
    },
    {
      "id":4,
      "name": "Sony PlayStation 5",
      "description": "Consola de videojuegos de última generación con gráficos 4K y una experiencia de juego inmersiva. Incluye un control inalámbrico DualSense.",
      "price": "4399000",
      "stock": 5,
      "image": productImage
    },
    {
      "id": 5,
      "name": "Nike Air Max 270",
      "description": "Zapatillas deportivas con diseño moderno y comodidad superior gracias a la tecnología Air Max. Ideales para entrenamiento y uso diario.",
      "price": "649000",
      "stock": 30,
      "image": productImage
    },{
        "id":6,
        "name": "Sony PlayStation 5",
        "description": "Consola de videojuegos de última generación con gráficos 4K y una experiencia de juego inmersiva. Incluye un control inalámbrico DualSense.",
        "price": "4399000",
        "stock": 5,
        "image": productImage
      },
      {
        "id": 7,
        "name": "Nike Air Max 270",
        "description": "Zapatillas deportivas con diseño moderno y comodidad superior gracias a la tecnología Air Max. Ideales para entrenamiento y uso diario.",
        "price": "649000",
        "stock": 30,
        "image": productImage
      },{
        "id":8,
        "name": "Sony PlayStation 5",
        "description": "Consola de videojuegos de última generación con gráficos 4K y una experiencia de juego inmersiva. Incluye un control inalámbrico DualSense.",
        "price": "4399000",
        "stock": 5,
        "image": productImage
      },
      {
        "id": 9,
        "name": "Nike Air Max 270",
        "description": "Zapatillas deportivas con diseño moderno y comodidad superior gracias a la tecnología Air Max. Ideales para entrenamiento y uso diario.",
        "price": "649000",
        "stock": 30,
        "image": productImage
      }
  ];  
  

function Store()
{
  const messageError = false;
  return (
    <div>
      <Header />
      
        <div className="container mx-auto p-4" role="main">
            
            {/* Mensaje de error */}
            <div className="mb-4">
                <div className="bg-red-500 text-white p-4 rounded" role="alert">
                <p>{/* messageError */}</p>
                </div>
            </div>
            
            {/* Título */}
            <div className="mb-4">
                <h3 className="text-left text-xl font-semibold">
                Explora nuestra amplia selección de contenido en toda y cada una de nuestras marcas certificadas a nivel mundial.
                </h3>
            </div>
            
            {/* Contenido */}
            <div>
                <div className="space-y-4">
                
                {/* Mensaje si no hay resultados */}
                { messageError && (
                    <div className="mb-4">
                    <div className="bg-red-500 text-white p-4 rounded" role="alert">
                        <p>{messageError}</p>
                    </div>
                    </div>
                )}
                
                {/* Buscador */}
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex-1">
                    <div className="flex">
                        <input className="form-input search block w-full border border-gray-300 rounded-md py-2 px-3" type="text" placeholder="Buscar..."/>
                        <button type="button" className="buttonCard ml-2 px-4 py-2 bg-blue-500 text-white rounded-md flex items-center space-x-2">
                         <i className="fas fa-search"></i> <span>Buscar</span>
                        </button>
                    </div>
                    </div>
                </div>
                
                {/* Tarjetas de contenido */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product, index) => (
                        <CardProduct key={product.id} product={product} />
                    ))}
                </div>
                
                {/* Paginación */}
                <div className="flex justify-center mt-4">
                    <div className="flex space-x-2">
                    <a className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md buttonCard">Anterior</a>
                    <a className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md buttonCard">1</a>
                    <a className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md buttonCard">Siguiente</a>
                    </div>
                </div>
                
                </div>
            </div>
        </div>
      
      <Footer />
    </div>
  );
}

export default Store;
