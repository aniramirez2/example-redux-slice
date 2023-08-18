import { setIsLogged, setUserLogged } from "./authReducer";
import { 
    signOut, 
    GoogleAuthProvider, 
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

export const login = () => {
    const provider = new GoogleAuthProvider();
    return async (dispatch) => {
        try {
            const userCredential = await signInWithPopup(auth, provider);
            console.log("respuesta de google", userCredential);
            dispatch(setUserLogged(userCredential));
            dispatch(setIsLogged(true));
        } catch (error) {
            console.log("error", error.error);
            dispatch(setIsLogged(false));
        }
    };
};

export const logout = () => {
    return async (dispatch) => {
        try {
            await signOut(auth)
            dispatch(setUserLogged(null));
            dispatch(setIsLogged(false));
        } catch (error) {
            console.log("error", error.error);
        }
    };
}