import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productos: [],
    producto: {}
};
  
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {            
            state.productos = action.payload;
            console.log("productos", state.productos)          
        }
    }
})

export const { setProducts } = productSlice.actions;
  
export default productSlice.reducer;