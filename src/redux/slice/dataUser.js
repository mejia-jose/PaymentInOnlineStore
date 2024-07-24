import { createSlice } from "@reduxjs/toolkit";

const initialState  =
{
    dataUser : {},
    name:'',
    email:'',
    telf:'',
    codPostal:0,
    dir:'',
    cardNumber:0,
    expiryDate:'',
    cvv:0,
    cuotas:0,
    idTokenCard:0,
    type:'',
    valideCVV:false,
    created_at:'',
    idTransaction:0,
    referencia:'',
    estadoCompra:'Pendiente',
}

export const getDataUserSlice = createSlice ({

    name:'dataUser',
    initialState ,
    reducers:
    {
      getDataUser: (state, action) =>
      {
        state.dataUser = action.payload;
      },
      updateFieldValueForm: (state,action) =>
      {
        const { name, value } = action.payload;
        state[name] = value;  // Actualiza el campo correspondiente en el estado
      },
      saveTokenCard : (state,action) =>
      {
        const { idTokenCard, type,valideCVV } = action.payload;
        state.idTokenCard = idTokenCard;
        state.type = type;
        state.valideCVV = valideCVV;
      },

      getTransactions : (state,action) =>
      {
          const { created_at, idTransaction, referencia,estadoCompra } = action.payload;
          state.created_at = created_at;
          state.idTransaction = idTransaction;
          state.referencia = referencia;
          state.estadoCompra = estadoCompra
      }
    }
  
});
  
export const { getDataUser,updateFieldValueForm,saveTokenCard,getTransactions } = getDataUserSlice.actions;
export default getDataUserSlice.reducer;
  