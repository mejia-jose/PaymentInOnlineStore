// src/components/Loader.js
import React from 'react';

//Componente de carga, y si muestra mientras no se rendiriza el contenido
const Loanding = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full border-blue-600" role="status">
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Loanding;
