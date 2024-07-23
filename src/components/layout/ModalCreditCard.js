import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import Delivery from '../../pages/Delivery';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {getDataUser,updateFieldValueForm,saveTokenCard} from '../../redux/slice/dataUser';
import { TokenCard}  from '../../services/api.service';

Modal.setAppElement('#root');

const ModalCreditCard = ({ isOpen, closeModal }) => 
{
    const dispatch = useDispatch(); //Para disparar la acion en redux
    const dataUser = useSelector((state) => state.getDataUser.dataUser);//Para obtener el estado con la info de redux
    const navigate = useNavigate();//Permite navegar entre componentes

    const deliveryDetail = () => { //Función para ir al componente de detalle de entrega
        navigate(`/detail-delivery`);
    };

    <Delivery/>
 
    const [errors, setErrors] = useState({}); //Permite guardarm el estado delos errores

    //Permite manejar el estado de los campos del formulario
    const [formData, setFormData] = useState(dataUser);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      setFormData(dataUser);
    }, [dataUser]);

    //Función que permite validar los campos del formulario
    const validateForm = () => 
    {
        let formErrors = {};

        if(!validateEmail(formData.email))
        {
          formErrors.email = "Email inválido";
        }

        if (!cardNumberValidate(formData.cardNumber))
        {
          formErrors.cardNumber = 'Número de tarjeta inválido';
        }

        if (!validateDateExpyre(formData.expiryDate))
        {
         formErrors.expiryDate = 'La fecha de expiración inválida';
        }
        
        if (!validateCVV(formData.cvv)) {
            formErrors.cvv = 'El CVV ingresado es inválido';
        }

        if(!formData.name || formData.name < 3)
        {
            formErrors.name = "El nombre no es valido."
        }
        
        if (!formData.dir || formData.dir.length < 6) {
          formErrors.dir = "La dirección debe tener al menos 6 caracteres.";
        }

        if(!validateCodPostal(formData.codPostal))
        {
          formErrors.codPostal = "El código postal es inválido";
        }

        const validationMessage = validateCuotas(formData.cuotas);
        if (!validationMessage) {
          formErrors.cuotas = 'El número de cuotas no es válido.';
        }

        if (formData.cuotas > 36) {
          formErrors.cuotas = 'Por favor, el máximo de cuotas es 36.';
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    //Función para validar el email
    const validateEmail = (email) => {
      // Expresión regular para validar correos electrónicos
      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return regex.test(email);
    };
   
    //Función que permite validar el codigo postal
    const validateCodPostal = (postalCode) => {
      // Verifica que el código postal tenga entre 3 y 10 caracteres, que pueden ser letras, números, espacios o guiones
      const regex = /^[a-zA-Z0-9\s\-]{3,10}$/;
      return regex.test(postalCode);
    };
    
    //Función que permite validar el cvv
    const validateCVV = (cvv) => 
    {
        const sanitizarCVV = cvv.replace(/\D/g, '');
      
        return sanitizarCVV.length === 3 || sanitizarCVV.length === 4;
    };

    //Función que permite validar el número de cuotas
    const validateCuotas = (cuotas) =>
    {
      
      if (!cuotas) { return false;}
      //Se Verifica que sea numérico y contenga solo dos dígitos
      const cuotasRegex = /^\d{2}$/;
      if (!cuotasRegex.test(cuotas)) { return false; }
      // Si todas las validaciones pasan
      return true;
    }
    
    //Función que permite validar la fecha de expiración de la tarjeta
    const validateDateExpyre = (date) =>
    {
        const [month, year] = date.split('/').map(Number);
      
        if (!month || !year) {
          return false;
        }
      
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1; 
      
        if (month < 1 || month > 12) {
          return false;
        }
      
        if (year < currentYear % 100) {
          return false;
        } else if (year === currentYear % 100 && month < currentMonth) {
          return false;
        }
      
        return true;
    };

    //Función que permite realizar la validación de los números de tarjetas
    const cardNumberValidate = (number) => 
    {
        const sanitizarNumero = number.replace(/\D/g, '');
      
        if (sanitizarNumero.length < 13 || sanitizarNumero.length > 19) {
          return false;
        }
      
        let sum = 0;
        let valorDouble = false;
      
        //Se utiliza el algoritmo de Luhn
        for (let i = sanitizarNumero.length - 1; i >= 0; i--)
        {
          let posit = parseInt(sanitizarNumero.charAt(i), 10);
      
          if (valorDouble) {
            posit *= 2;
            if (posit > 9) {
              posit -= 9;
            }
          }
      
          sum += posit;
          valorDouble = !valorDouble;
        }
      
        return sum % 10 === 0;
    };
      
    //Función para capturar y mantener el estado de los campos del formulario
    const stateChangeInpus = (e) => 
    {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      dispatch(updateFieldValueForm({ name, value }));
    };

    const tokenCard = async () =>
    {
        setLoading(true);
        const [month, year] = formData.expiryDate.split('/');
    
        try
        {
         
          const response = await TokenCard({
            number: formData.cardNumber,
            cvc: formData.cvv,
            exp_month: month,
            exp_year: year,
            card_holder: formData.name,
          });
    
          const responseData = response.data; 

          if (responseData.status !== 'CREATED') 
          {
            throw new Error('No se pudo validar la tarjeta de crédito');
          }

          dispatch(saveTokenCard({ idTokenCard:responseData.data.id, type:responseData.data.brand,valideCVV:responseData.data.created_with_cvc}));
          dispatch(getDataUser(formData));
          closeModal();
          deliveryDetail();
         
        } catch (error){  alert(error) } finally {  setLoading(false); }
    }

    //Función para obtener la informacion del formulario
    const saveData = async (e) =>
    {
      e.preventDefault();
      if (validateForm()){  tokenCard(); }
    };

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-75"
    overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
    contentLabel="Formulario de Pago"
  >
    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-screen overflow-y-auto p-4 sm:p-6 mx-auto">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Información de Pago</h2>
      { loading && <div class="loader-container">
          <div class="loader"></div>
          <div class="loader-text">Validando información...</div>
        </div>
      }
      <form onSubmit={saveData}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Nombre completo <span className='require'>*</span></label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={stateChangeInpus}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
              required
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Correo Electrónico <span className='require'>*</span></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={stateChangeInpus}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.email ? 'border-red-500' : ''}`}
              required
            />
             {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Teléfono <span className='require'>*</span></label>
            <input
              type="tel"
              name="telf"
              value={formData.telf}
              onChange={stateChangeInpus}
              className="w-full p-2 border rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Código Postal <span className='require'>*</span></label>
            <input
              type="text"
              name="codPostal"
              value={formData.codPostal}
              onChange={stateChangeInpus}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.codPostal ? 'border-red-500' : ''}`}
              required
            />
            {errors.codPostal && <p className="text-red-500 text-sm">{errors.codPostal}</p>}
          </div>
        </div>
        <div className="mb-4">
            <label className="block text-gray-700">Dirección <span className='require'>*</span></label>
            <input
              type="text"
              name="dir"
              value={formData.dir}
              onChange={stateChangeInpus}
              placeholder="Ejemplo: Calle 123, Kra 45, Ciudad de Ejemplo, Estado, País"
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.dir ? 'border-red-500' : ''}`}
              required
            />
             {errors.dir && <p className="text-red-500 text-sm">{errors.dir}</p>}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700">Número de Tarjeta <span className='require'>*</span></label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={stateChangeInpus}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.cardNumber ? 'border-red-500' : ''}`}
              required
            />
            {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Fecha de Expiración <span className='require'>*</span></label>
            <input
              type="text"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={stateChangeInpus}
              placeholder="MM/YY"
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.expiryDate ? 'border-red-500' : ''}`}
              required
            />
            {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CVV <span className='require'>*</span></label>
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={stateChangeInpus}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.cvv ? 'border-red-500' : ''}`}
              required
            />
            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Número de cuotas <span className='require'>*</span></label>
            <input
              type="text"
              name="cuotas"
              value={formData.cuotas}
              onChange={stateChangeInpus}
              className={`w-full p-2 border rounded focus:outline-none focus:border-blue-500 ${errors.cuotas ? 'border-red-500' : ''}`}
              required
            />
            {errors.cuotas && <p className="text-red-500 text-sm">{errors.cuotas}</p>}
          </div>
        </div>
        <div className="flex justify-end">
          <button type="button" onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Cancelar
          </button>
          <button type="submit" className="buttonCard text-white px-4 py-2 rounded">
            Continuar con el pago
          </button>
        </div>
      </form>
    </div>
  </Modal>
  
  );
};

export default ModalCreditCard;
