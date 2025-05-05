import { Router } from "express";
import { addSupplier, getSuppliers, getSupplierById, updateSupplier, deleteSupplier } from "./supliers.controller.js";
import { updateUSerValidator, registerUserValidator } from "../../middlewares/validator.js";
import { isAdmin } from "../../middlewares/validator.jwt.js";

const api = Router()

api.get('/getSuppliers', getSuppliers)
api.get('/getSupplierById/:id', getSupplierById)
api.post('/addSupplier', [addSupplier, registerUserValidator])
api.put('/updateSupplier/:id', [updateSupplier, updateUSerValidator, isAdmin])
api.delete('/deleteSupplier/:id', [deleteSupplier, isAdmin])

export default api