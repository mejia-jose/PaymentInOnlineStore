import { createSlice } from "@reduxjs/toolkit";

//const productsData = localStorage.getItem('products');
const initialState =
{
    products:  []
}

export const getProdustsSlice = createSlice ({

    name:'obtenerProductos',
    initialState,
    reducers:
    {
      getProdustsDetail: (state, action) =>
      {
        state.products = action.payload;
        //localStorage.setItem('products', JSON.stringify(state.products));
      }
    }
  
  });
  
  export const { getProdustsDetail } = getProdustsSlice.actions;
  export default getProdustsSlice.reducer;
  