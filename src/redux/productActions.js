import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import {setProducts} from './productReducer';
const productCollection = collection(firestore, "productos")

export const getProductsFromFirestore = () => {
    return async (dispatch) => {
        try {
            const querySnapshot = await getDocs(productCollection);
            const tempArr = []
            querySnapshot.forEach((doc) => {
                tempArr.push({ id: doc.id, ...doc.data() })
            });
            console.log("tempArr", tempArr)
            dispatch(setProducts(tempArr))
        } catch (error) {
            console.log("error", error.error);
        }
    };
};

