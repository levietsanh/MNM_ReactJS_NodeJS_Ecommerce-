import { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants";
import  axios  from 'axios';
import { logout } from "./UserAction";
import { PRODUCT_DELETE_FAIL } from './../Constants/ProductConstants';

// get All user
export const listProducts=()=> async (dispatch,getState)=>{
    // const Toastobjects={
    //     pauseOnFocusLoss : false,
    //     draggable:false,
    //     pauseOnHover:false,
    //     autoClose:3000,
    //   }
    try{

            dispatch({type:PRODUCT_LIST_REQUEST});
            const   {
                userLogin:{userInfo},
            }=getState();
        const config={
            headers:{
               Authorization:`Bearer ${userInfo.token}`,
            },
        };



            const   {data}=await axios.get(`/api/products/all`,config);
            
            dispatch({type:PRODUCT_LIST_SUCCESS, payload: data});
          
    }catch(error){
        const message= error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        if(message=== "Not authorized, token failed"){
            dispatch(logout());
        }
      
        dispatch({
            type:PRODUCT_LIST_FAIL,
            payload: message,
        });
       
    }
};


//delete Product
export const deleteProducts=(id)=> async (dispatch,getState)=>{
    // const Toastobjects={
    //     pauseOnFocusLoss : false,
    //     draggable:false,
    //     pauseOnHover:false,
    //     autoClose:3000,
    //   }
    try{

            dispatch({type:PRODUCT_DELETE_REQUEST});
            const   {
                userLogin:{userInfo},
            }=getState();
        const config={
            headers:{
               Authorization:`Bearer ${userInfo.token}`,
            },
        };



            await axios.delete(`/api/products/${id}`,config);
            
            dispatch({type:PRODUCT_DELETE_SUCCESS});
          
    }catch(error){
        const message= error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        if(message=== "Not authorized, token failed"){
            dispatch(logout());
        }
      
        dispatch({
            type:PRODUCT_DELETE_FAIL,
            payload: message,
        });
       
    }
};