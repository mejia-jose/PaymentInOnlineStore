import { createSlice } from '@reduxjs/toolkit';

//Se obtienen los datos desde localStorage o inicializa como un array vacío
//const savedData = localStorage.getItem('productData');

const initialState =  { productos: [],cantProductosSelected: 1,idProducto:null };

export const counterSlice = createSlice ({

  name:'cantSelectProducts',
  initialState,
  reducers:
  {
    getCantidad: (state, action) =>
    {
      const { cantProductosSelected, idProducto } = action.payload;
      state.cantProductosSelected = cantProductosSelected;

      // Busca si el producto ya existe en el array
      const productIndex = state.productos.findIndex(product => product.idProducto === idProducto);

      if (productIndex >= 0)
      {
        state.productos[productIndex].cantProductosSelected = cantProductosSelected;
      } else {
       state.productos.push({ idProducto, cantProductosSelected });
      }
    },
  }

});

export const { getCantidad } = counterSlice.actions;
export default counterSlice.reducer;
