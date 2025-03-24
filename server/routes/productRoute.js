import express from "express";
import { allProducts, product, createProduct, products } from "../controllers/productController.js";
const router = express.Router();

// post request
router.post("/create",createProduct);

// insert many
router.post('/products',products)

// all products
router.get("/all-products",allProducts);

// single product
router.get("/:productId",product)

export default router;