import { Router } from "express";
import { deleteCategory, updateCategory, getCategory, getCategoryById, addCategory, test} from "./category.controller.js";

const api = Router()

api.get('/testCategory', test)
api.post('/addCategory' ,addCategory)
api.get('/getCateogries', getCategory)
api.get('/getCategory/:id', getCategoryById)
api.put('/updateCategory/:id',updateCategory)
api.delete('/deleteCategory/:id', deleteCategory)

export default api