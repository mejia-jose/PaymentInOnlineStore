import React, { useEffect, useState } from 'react';
import Header from '../components/layout/Header';
import CardProduct from '../components/layout/CardProduct';
import Footer from '../components/layout/Footer';
import '../assets/styles/Store.css';
import { AllProducts}  from '../services/api.service';

function Store()
{
  const messageError = false;
  const [products, setProducts] = useState([]); // Estado para almacenar los productos
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
      const loadProducts = async () => {
          try {
              const productData = await AllProducts(); // Llama al servicio para obtener los datos
              setProducts(productData); // Establece los productos en el estado
          } catch (err) {
              setError(err.message); // Establece el mensaje de error en el estado
          } finally {
              setLoading(false); // Actualiza el estado de carga
          }
      };

      loadProducts();
  }, []); // Ejecuta el efecto solo una vez cuando el componente se monta

  if (loading) return <p>Loading...</p>; // Muestra mensaje de carga
  if (error) return <p>Error: {error}</p>; // Muestra mensaje de error


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
