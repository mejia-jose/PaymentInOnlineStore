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
    valideCVV:false
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
      }
    }
  
});
  
export const { getDataUser,updateFieldValueForm,saveTokenCard } = getDataUserSlice.actions;
export default getDataUserSlice.reducer;
  