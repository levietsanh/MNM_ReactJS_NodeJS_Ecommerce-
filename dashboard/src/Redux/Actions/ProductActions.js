import { PRODUCT_CREATE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS } from "../Constants/ProductConstants";
import  axios  from 'axios';
import { logout } from "./UserAction";
import { PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_UPDATE_FAIL } from './../Constants/ProductConstants';

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


//Create Product
export const createProducts=(name,price,description,image,countInStock)=> async (dispatch,getState)=>{
    // const Toastobjects={
    //     pauseOnFocusLoss : false,
    //     draggable:false,
    //     pauseOnHover:false,
    //     autoClose:3000,
    //   }
    try{

            dispatch({type:PRODUCT_CREATE_REQUEST});
            const   {
                userLogin:{userInfo},
            }=getState();
        const config={
            headers:{
               Authorization:`Bearer ${userInfo.token}`,
            },
        };



           const {data}= await axios.post(`/api/products/`,{name,price,description,image,countInStock},config);
            
            dispatch({type:PRODUCT_CREATE_SUCCESS,payload:data});
          
    }catch(error){
        const message= error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        if(message=== "Not authorized, token failed"){
            dispatch(logout());
        }
      
        dispatch({
            type:PRODUCT_CREATE_FAIL,
            payload: message,
        });
       
    }
};


//edit product
export const EditProduct = (id) =>async(dispatch)=>{




    try{

            dispatch({type:PRODUCT_EDIT_REQUEST})
            const   {data}=await axios.get(`/api/products/${id}`);
            dispatch({type:PRODUCT_EDIT_SUCCESS, payload: data});
    }catch(error){
        const message= error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        if(message=== "Not authorized, token failed"){
            dispatch(logout());
        }
      
        dispatch({
            type:PRODUCT_EDIT_FAIL,
            payload: message,
        });
       
    }
};


//Update Product
export const updateProducts=(product)=> async (dispatch,getState)=>{
    // const Toastobjects={
    //     pauseOnFocusLoss : false,
    //     draggable:false,
    //     pauseOnHover:false,
    //     autoClose:3000,
    //   }
    try{

            dispatch({type:PRODUCT_UPDATE_REQUEST});
            const   {
                userLogin:{userInfo},
            }=getState();
        const config={
            headers:{
                "Content-Type":"application/json",
               Authorization:`Bearer ${userInfo.token}`,
            },
        };



           const {data}= await axios.put(`/api/products/${product._id}`,product,config);
            
            dispatch({type:PRODUCT_UPDATE_SUCCESS,payload:data});
            dispatch({type:PRODUCT_EDIT_SUCCESS,payload:data});
          
    }catch(error){
        const message= error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        if(message=== "Not authorized, token failed"){
            dispatch(logout());
        }
      
        dispatch({
            type:PRODUCT_UPDATE_FAIL,
            payload: message,
        });
       
    }
};