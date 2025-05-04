import { Router } from "express";
import { addSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier } from "./supliers.controller.js";
import { isAdmin } from "../../middlewares/validator.jwt.js";

const api = Router()

api.get('/getSuppliers', getSuppliers)
api.get('/getSupplierById', getSupplierById)
api.post('addSupplier', addSupplier)
api.put('/updateSupplier', [updateSupplier, isAdmin])
api.delete('/deleteSupplier', [deleteSupplier, isAdmin])

export default api
