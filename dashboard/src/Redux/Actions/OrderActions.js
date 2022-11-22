
import { ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS } from './../Constants/OrderConstants';
import  axios  from "axios";
import { logout } from "./UserAction";


// get All user
export const listOrders=()=> async (dispatch,getState)=>{
    // const Toastobjects={
    //     pauseOnFocusLoss : false,
    //     draggable:false,
    //     pauseOnHover:false,
    //     autoClose:3000,
    //   }
    try{

            dispatch({type:ORDER_LIST_REQUEST});
            const   {
                userLogin:{userInfo},
            }=getState();
        const config={
            headers:{
               Authorization:`Bearer ${userInfo.token}`,
            },
        };



            const   {data}=await axios.get(`/api/orders/all`,config);
            
            dispatch({type:ORDER_LIST_SUCCESS, payload: data});
          
    }catch(error){
        const message= error.response && error.response.data.message
        ? error.response.data.message
        :error.message;
        if(message=== "Not authorized, token failed"){
            dispatch(logout());
        }
      
        dispatch({
            type:ORDER_LIST_FAIL,
            payload: message,
        });
       
    }
};
