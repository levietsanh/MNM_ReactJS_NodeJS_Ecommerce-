import express from "express";
import asyncHandler from "express-async-handler";
import {protect, admin} from "../Middleware/AuthMiddleware.js";
import Order from './../Models/OrderModel';

const order = express.Router();

order.get(
    "/" ,
    protect,
    asyncHandler(async(req, res) =>{
        const order= await Order.find({user:req.user._id}).sort({_id: -1});

            res.json(order);   
    })

);



export default order;