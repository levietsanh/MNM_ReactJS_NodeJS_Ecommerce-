import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddProductMain from "./../components/products/AddProductMain";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from "react";
import { toast } from 'react-toastify';
import { PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET } from "../Redux/Constants/ProductConstants";

const AddProduct = () => {
  
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddProductMain />
      </main>
    </>
  );
};

export default AddProduct;
