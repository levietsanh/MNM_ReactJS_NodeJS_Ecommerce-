import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import { productDetailsReducer, 
       
        productListReducer, 
      }  from "./Reducers/ProductReducers";
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from "./Reducers/userReducers";




 const reducer = combineReducers({
   productList:productListReducer,
   productDetails:productDetailsReducer,
   userLogin:userLoginReducer,
   userRegister:userRegisterReducer,
   userDetails:userDetailsReducer,
   userUpdateProfile:userUpdateProfileReducer,
 });

//login
const userInfoFromLocalStorage=localStorage.getItem("userInfo")
?JSON.parse(localStorage.getItem("userInfo"))
:null;



 const initialState ={



  userLogin:{userInfo:userInfoFromLocalStorage},
 };

 const middleware =[thunk];
 const store =createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
 );
 export default store;