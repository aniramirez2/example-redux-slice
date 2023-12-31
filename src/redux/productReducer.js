import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    productos: [],
    pruductosFiltrados: null,
    producto: {}
};
  
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {            
            state.productos = action.payload;         
        },
        setpruductosFiltrados: (state, action) => {            
            state.pruductosFiltrados = action.payload;         
        },
        addProduct: (state, action) => {
            state.productos = [...state.productos, action.payload]
        },
        updateProduct: (state, action) => {
            state.productos = state.productos.map((product)=>product.id === action.payload.id ? {
                ...action.payload
            }: product)
        },
        deleteProduct: (state, action) => {
            state.productos = [...state.productos.slice(0, action.payload)]
        }
    }
})

export const { setProducts, addProduct, updateProduct, deleteProduct, setpruductosFiltrados } = productSlice.actions;
  
export default productSlice.reducer;