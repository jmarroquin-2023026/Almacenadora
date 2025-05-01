import { Router } from "express";
import { addProduct, updateProduct, deleteProduct } from "./products.controller";
import {isAdmin} from '../../middlewares/validator.jwt.js'

const api = Router()

api.post('/addProduct'[addProduct, isAdmin])
api.put('/updateProduct', [updateProduct, isAdmin])
api.delete('/deleteProduct', [deleteProduct, isAdmin])

export default api