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
    cvv:0
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
      }
    }
  
});
  
export const { getDataUser,updateFieldValueForm } = getDataUserSlice.actions;
export default getDataUserSlice.reducer;
  