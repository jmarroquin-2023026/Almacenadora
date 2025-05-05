import { Router } from "express";
import { addProduct, updateProduct, deleteProduct, getByCategory, getByName, getProducts } from "./products.controller.js";
import {isAdmin, isAdminOrClient, validateJwt} from '../../middlewares/validator.jwt.js'
import { addProductValidator, productUpdateValidator } from "../../middlewares/validator.js";

const api = Router()

api.post('/addProduct', [validateJwt, isAdmin,addProductValidator],addProduct)
api.put('/updateProduct/:id',[validateJwt,isAdmin,productUpdateValidator], updateProduct)
api.delete('/deleteProduct/:id',[validateJwt,isAdmin], deleteProduct)
api.get('/listOfProducts',[validateJwt,isAdminOrClient],getProducts)
api.get('/productsByCategory/:id',[validateJwt,isAdminOrClient],getByCategory)
api.get('/productsByName/:name',[validateJwt,isAdminOrClient],getByName)
export default api