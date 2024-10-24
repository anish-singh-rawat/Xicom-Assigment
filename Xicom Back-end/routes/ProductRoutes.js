import express from "express";
import { addProductData, addProductImage, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/producatController.js";

const ProductRouter = express.Router()

ProductRouter.get('/getProduct/:id', getProductById)
ProductRouter.get('/AllProduct', getAllProducts)
ProductRouter.post('/addProductImage', addProductImage)
ProductRouter.post('/addProductData', addProductData)
ProductRouter.delete('/deleteProduct/:id',deleteProduct)
ProductRouter.put('/updateProduct/:id', updateProduct)

export default ProductRouter