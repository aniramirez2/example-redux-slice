import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from '../redux/authReducer';
import productReducer from '../redux/productReducer';

const store = configureStore({
  reducer: {
    authReducer,
    productReducer
    },
  middleware: [thunk]
});
  
export default store;