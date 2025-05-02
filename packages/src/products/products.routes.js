import { Router } from "express";
import { addProduct, updateProduct, deleteProduct } from "./products.controller.js";
import {isAdmin, validateJwt} from '../../middlewares/validator.jwt.js'

const api = Router()

api.post('/addProduct', validateJwt, isAdmin,addProduct)
api.put('/updateProduct', updateProduct)
api.delete('/deleteProduct', deleteProduct)

export default api