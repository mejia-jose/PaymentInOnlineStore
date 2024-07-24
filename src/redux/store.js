// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer,persistStore  } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import getCantidad from './slice/counterProduct';
import getProdusts from './slice/getProducts';
import getDataUser from './slice/dataUser';


const persistConfig =
{
  key:'root',
  storage,
  whitelist:['getCantidad','getProdusts','getDataUser']
}

const rootReducer = combineReducers({
  getCantidad:getCantidad,
  getProdusts:getProdusts,
  getDataUser:getDataUser
});

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const store = configureStore(
{
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desactiva la verificación de serialización
  }),
});

//export default store;
export const persistor = persistStore(store);
