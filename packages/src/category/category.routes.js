import { Router } from "express";
import { deleteCategory, updateCategory, getCategory, getCategoryById, addCategory, test} from "./category.controller.js";
import { isAdmin } from "../../middlewares/validator.jwt.js";

const api = Router()

api.get('/testCategory', test)
api.post('/addCategory' ,addCategory, [isAdmin])
api.get('/getCateogries', getCategory)
api.get('/getCategory/:id', getCategoryById)
api.put('/updateCategory/:id',updateCategory, [isAdmin])
api.delete('/deleteCategory/:id', deleteCategory, [isAdmin])

export default api