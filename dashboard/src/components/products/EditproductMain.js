import React from "react";
import Toast from "./../LoadingError/Toast";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { EditProduct } from "../../Redux/Actions/ProductActions";
import { PRODUCT_UPDATE_RESET } from "../../Redux/Constants/ProductConstants";
import { updateProducts } from './../../Redux/Actions/ProductActions';
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";


const Toastobjects={
  pauseOnFocusLoss : false,
  draggable:false,
  pauseOnHover:false,
  autoClose:3000,
}
const EditProductMain = (props) => {
  const { productId } = props;
  const [name,setName]=useState("");
  const [price,setPrice]=useState(0);
  const [image,setImage]=useState("");
  const [countInStock,setCoutInstock]=useState(0);
  const [description,setDescription]=useState("");

  const dispatch=useDispatch();
  const productEdit=useSelector((state)=>state.productEdit)
  const{loading,error,product}=productEdit;

  const productUpdate=useSelector((state)=>state.productUpdate)
  const{loading:loadingUpdate,error:errorUpdate,success:successUpdate}=productUpdate;

  useEffect(()=>{
    if (successUpdate) {
      dispatch({type:PRODUCT_UPDATE_RESET});
      toast.success("Product updated",Toastobjects);
    } else {
      if(!product.name||product.id !==product.Id){
        //toast.success("Product Added ");
        dispatch(EditProduct(productId));
       
      }else{
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setImage(product.image);
        setCoutInstock(product.countInStock);
      }
      
    }
   
  },[product,dispatch,productId,successUpdate]);

  const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(updateProducts({_id:productId,name,price,description,image,countInStock}));
  };

  return (
    <>
      <Toast/>
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Update Product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-8 col-lg-8">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                {errorUpdate && <Message variant={"alert-danger"}>{error}</Message>}
                {loadingUpdate && <Loading/>}
                {
                  loading ? <Loading/>:error?(<Message variant={"alert-danger"}>{error}</Message>)
                  :
                  (
                    <>
                    <div className="mb-4">
                    <label htmlFor="product_title" className="form-label">
                      Product title
                    </label>
                    <input
                      type="text"
                      placeholder="Type here"
                      className="form-control"
                      id="product_title"
                      required
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Price
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={price}
                      onChange={(e)=>setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="product_price" className="form-label">
                      Count In Stock
                    </label>
                    <input
                      type="number"
                      placeholder="Type here"
                      className="form-control"
                      id="product_price"
                      required
                      value={countInStock}
                      onChange={(e)=>setCoutInstock(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea
                      placeholder="Type here"
                      className="form-control"
                      rows="7"
                      required
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <input
                      className="form-control"
                      type="text"
                      value={image}
                      required
                      onChange={(e)=>setImage(e.target.value)}
                    />
                  </div>
                    </>
                  )
                }
               
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditProductMain;
