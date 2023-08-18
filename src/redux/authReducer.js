import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    userLogged: null
};
  
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLogged: (state, action) => {
            state.isLogged = action.payload;
        },
        setUserLogged: (state, action) => {
            state.userLogged = action.payload;
        }
    }
})

export const { setIsLogged, setUserLogged } = authSlice.actions;
  
export default authSlice.reducer;