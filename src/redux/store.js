// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import getCantidad from './slice/counterProduct';
import getProdusts from './slice/getProducts';
import getDataUser from './slice/dataUser';

export const store = configureStore(
{
  reducer:
  {
    counterProduct: getCantidad,
    getProdusts:getProdusts,
    getDataUser:getDataUser
  },
});

export default store;
