import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ to, label = 'Regresar' }) => {
    const navigate = useNavigate();

 const regresar = () =>
 {
    if (to) {
      navigate(to); // Navegar a la ruta que se le especifica específica
    } else {
      navigate(-1);  // Regresar a la página anterior
    }
  };

  return (
    <button onClick={regresar} className="buttonReject px-4 py-2 bg-gray-300 text-gray-800 rounded-md flex items-center justify-center">
     <i className="fa-solid fa-arrow-left p-2"></i>  { label}
    </button>
  );
};

export default BackButton;
