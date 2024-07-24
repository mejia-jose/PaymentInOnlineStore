import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const NotFound = () => {
  return (
    <div>
      <Header />
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="text-2xl font-semibold mt-4">Página no encontrada</p>
            <p className="mt-2 text-gray-600">Lo sentimos, la página que estás buscando no existe.</p>
            <a href="/" className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
            Volver al inicio
            </a>
        </div>
        </div>
        <Footer />
    </div>
  );
};

export default NotFound;
