import { Router } from "express";
import {addEmployee, getEmployee, getEmployeeById, updateStaff, deleteStaff, updatePassword} from "./employee.controller.js";
import {isAdmin, validateJwt} from '../../middlewares/validator.jwt.js'

const api = Router()

api.post('/addEmployee',validateJwt, isAdmin,addEmployee)
api.get('/getEmployee', validateJwt,getEmployee, isAdmin)
api.get('/getEmployeeById/:id',validateJwt, getEmployeeById, isAdmin)
api.put('/updateStaff', validateJwt,isAdmin, updateStaff)
api.put('/updatePassword',validateJwt,updatePassword)
api.delete('/deleteStaff', validateJwt, deleteStaff)

export default api

