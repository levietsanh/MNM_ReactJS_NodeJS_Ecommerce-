import React,{useEffect} from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { createProduct, createProducts } from './../../Redux/Actions/ProductActions';

const Toastobjects={
      pauseOnFocusLoss : false,
      draggable:false,
      pauseOnHover:false,
      autoClose:3000,
    }
const AddProductMain = () => {
  const [name,setName]=useState("");
  const [price,setPrice]=useState(0);
  const [image,setImage]=useState("");
  const [countInStock,setCoutInstock]=useState(0);
  const [description,setDescription]=useState("");
  
  const dispatch=useDispatch();
  const createProduct=useSelector((state)=>state.createProduct)
  const{loading,error,product}=createProduct;

  useEffect(()=>{
    if(product){
      toast.success("Product Added ",Toastobjects);
      dispatch({type:PRODUCT_CREATE_RESET});
      setName("");
      setDescription("");
      setPrice(0);
      setImage("");
      setCoutInstock(0);
    }
  },[product,dispatch]);

  const submitHandler =(e)=>{
    e.preventDefault();
    dispatch(createProducts(name,price,description,image,countInStock));
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
            <h2 className="content-title">Add product</h2>
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
                  {error && <Message variant={"alert-danger"}>{error}</Message>}
                  {loading && <Loading/>}
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
                      placeholder="Inter Image URL"
                      value={image}
                      required
                      onChange={(e)=>setImage(e.target.value)}
                    />
                    <input className="form-control mt-3" type="file" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
