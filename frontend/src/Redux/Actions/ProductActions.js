import { PRODUCT_LIST_FAIL } from "../Constants/ProductConstants"
import  axios  from 'axios';
import { PRODUCT_LIST_REQUEST } from './../Constants/ProductConstants';

export const lisProduct =() => async(dispatch)=>{
    try {
        dispatch ({type:PRODUCT_LIST_REQUEST})
    } catch (error) {
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload:
            error.response && error.response.data.message ? error.response.data.message
            :error.message,
        });
    }
}; 