import { Router } from "express";
import { deleteCategory, updateCategory, getCategory, getCategoryById, addCategory, test} from "./category.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validator.jwt.js";

const api = Router()

api.get('/testCategory', test)
api.post('/addCategory' ,[validateJwt,isAdmin],addCategory)
api.get('/getCateogries', getCategory)
api.get('/getCategory/:id', getCategoryById)
api.put('/updateCategory/:id', [validateJwt,isAdmin],updateCategory)
api.delete('/deleteCategory/:id' ,[validateJwt,isAdmin], deleteCategory,)

export default api