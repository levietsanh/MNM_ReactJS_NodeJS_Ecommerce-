import express from "express";

import dotenv from "dotenv";
import connectDatabase from "./config/MongoDd.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
dotenv.config();
connectDatabase();
const app = express();

// Load product from server


// app.get("/api/products",(req,res) => {
//   res.json(products);
// });

// Single product from server
// app.get("/api/products/:id",(req,res) => {
//     const product = products.find((p) => p._id === req.params.id);
//     res.json(products);
// });
// Api
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);

app.get ("/", (req,res) =>{
  res.send("API is running");
});
const PORT = process.env.PORT || 1000;

app.listen(PORT,console.log(`server running in port ${PORT}`));