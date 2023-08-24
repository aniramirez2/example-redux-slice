import { collection, getDocs, addDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebaseConfig";
import {setProducts, addProduct, updateProduct, deleteProduct} from './productReducer';

const productCollection = collection(firestore, "productos")

export const getProductsFromFirestore = () => {
    return async (dispatch) => {
        try {
            const querySnapshot = await getDocs(productCollection);
            const tempArr = []
            querySnapshot.forEach((doc) => {
                tempArr.push({ id: doc.id, ...doc.data() })
            });
            dispatch(setProducts(tempArr))
        } catch (error) {
            console.log("error", error.error);
        }
    };
};

export const addProductToFirestore = (product) => {
    return async (dispatch) => {
        try {
            const querySnapshot = await addDoc(productCollection, product);
            dispatch(addProduct({id: querySnapshot.id, ...product}))
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const updateProductToFirestore = (product) => {
    const documentRef = doc(productCollection, product.id);
    return async (dispatch) => {
        try {
            dispatch(updateProduct(product))
            delete product.id;
            await setDoc(documentRef, product);
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const deleteProductToFirestore = (id, index) => {
    return async (dispatch) => {
        try {
            await deleteDoc(doc(productCollection, id));
            dispatch(deleteProduct(index))
        } catch (error) {
            console.log("error", error);
        }
    };
};


/**
 * 
 [
    id: {}
 ]
 * 
 [
    {
        id, nombre, precio
    },
    {}
 ]
 */