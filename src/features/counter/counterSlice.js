import {createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
  status: 'idle',
  arreglo: []
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
      state.arreglo = [...state.arreglo, state.value]
      console.log("arreglo", state.arreglo)
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload.increment;
      alert("Incrementé el valor en: " + action.payload.increment +" y el resultado fue: "+ state.value)
      state.value -= action.payload.decrement
      alert("Resté el valor en: " + action.payload.decrement +" y el resultado fue: "+ state.value)

    },
  },
  

});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
