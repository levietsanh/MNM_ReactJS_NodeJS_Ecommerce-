import { PRODUCT_DELETE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from "../Constants/ProductConstants";

//GET ALL product
export const productListReducer = (state = {products:[] }, action ) => {

    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return { loading:true,products:[]};
        case PRODUCT_LIST_SUCCESS:
            return {loading :false, products:action.payload};
        case PRODUCT_LIST_FAIL:
            return {loading :false, error:action.payload};
    
        default:
            return state;
    }
};

//Delete Product
export const productDeleteReducer = (state = { }, action ) => {

    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return { loading:true,products:[]};
        case PRODUCT_DELETE_SUCCESS:
            return {loading :false, success:true};
        case PRODUCT_DELETE_FAIL:
            return {loading :false, error:action.payload};
    
        default:
            return state;
    }
};