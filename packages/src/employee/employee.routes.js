import { Router } from "express";
import {addEmployee, getEmployee, getEmployeeById, updateStaff, deleteStaff} from "./employee.controller";
import {isAdmin} from '../../middlewares/validator.jwt.js'

const api = Router()

api.post('/addEmployee', [addEmployee, isAdmin])
api.get('/getEmployee', [getEmployee, isAdmin])
api.get('/getEmployeeByI', [getEmployeeById, isAdmin])
api.put('/updateStaff', [updateStaff, isAdmin])
api.delete('/deleteStaff', [deleteStaff, isAdmin])

export default api

