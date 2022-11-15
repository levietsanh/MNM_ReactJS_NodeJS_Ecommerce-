import express from "express";
import products from "./data/Products.js";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDd.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
dotenv.config();
connectDatabase();
const app = express();

//Error Handler
app.use(notFound);
app.use(errorHandler);



//Load product from server


app.get("/api/products",(req,res) => {
  res.json(products);
});

//Single product from server
app.get("/api/products/:id",(req,res) => {
    const product = products.find((p) => p._id === req.params.id);
    res.json(products);
});

const PORT = process.env.PORT || 1000;

app.listen(PORT,console.log(`server running in port ${PORT}`));