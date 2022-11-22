import express from "express";
import asyncHandler from "express-async-handler";
import {protect, admin} from "../Middleware/AuthMiddleware.js";
import Order from './../Models/OrderModel';

const orderRouter = express.Router();
//Order create
    orderRouter.post(
        "/" ,
        protect,
        asyncHandler(
        async(req,res) =>{
            const {
                orderItems, 
                shippingAddress, 
                paymentMethod, 
                itemsPrice, 
                taxPrice, 
                shippingPrice, 
                totalPrice, 
            } =   req.body;
            if(orderItems && orderItems.length === 0){
                res.status(400);
                throw new Error ("No order items");
                return;
            }
            else{
                const order = new Order({
                    orderItems, 
                    user: req.user._id,
                    shippingAddress, 
                    paymentMethod, 
                    itemsPrice, 
                    taxPrice, 
                    shippingPrice, 
                    totalPrice, 
                });
                const createOrder = await order.save();
                res.status(201).json(createOrder);
            }
        })

    );
    //Get order by id
    orderRouter.get(
        "/:id" ,
        protect,
        asyncHandler(async(req, res) =>{
            const order= await Order.findById(req.params.id).populate(
                "user",
                "name email"
            );

            if (order) {
                res.json(order);
            }
            else{
                res.status(404);
                throw new Error("Order Not Found");
            }
        })

    );
    // order is paid
   
    orderRouter.put(
        "/:id/pay" ,
        protect,
        asyncHandler(async(req, res) =>{
            const order= await Order.findById(req.params.id);

            if (order) {
                order.isPaid = true
                order.paidAt =Date.now();
                order.paymentResult ={
                    id: req.body.id,
                    status: req.body.status,
                    update_time: req.body.update_time,
                    email_address: req.body.email_address,
                };
                const updatedOrder = await order.save();
                res.json(updatedOrder);
            }
            else{
                res.status(404);
                throw new Error("Order Not Found");
            }
        })

    );

// user login orders
// orderRouter.get(
//     "/all" ,
//     protect,
//     asyncHandler(async(req, res) =>{
//         const order= await Order.find({}).sort({_id: -1});

//             res.json(order);   
//     })

// );


//Admin get all order
orderRouter.get(
    "/",
    protect,
    admin,
    asyncHandler(async(req,res)=>{
    const orders= await Order.find({}).sort({_id:-1}).populate("user","id name email");
    res.json(orders);
}))

export default orderRouter;  