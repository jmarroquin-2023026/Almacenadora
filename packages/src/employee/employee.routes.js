import { Router } from "express";
import {addEmployee, getEmployee, getEmployeeById, updateStaff, deleteStaff, updatePassword} from "./employee.controller.js";
import {isAdmin, isAdminOrClient, validateJwt} from '../../middlewares/validator.jwt.js'
import { categoryUpdateValidator, registerValidator, updateStaffValidator } from "../../middlewares/validator.js";

const api = Router()

api.post('/addEmployee',[registerValidator],addEmployee)
api.get('/getEmployee',[ validateJwt,isAdmin],getEmployee)
api.get('/getEmployeeById/:id',[validateJwt, isAdmin], getEmployeeById)
api.put('/updateStaff', [validateJwt,isAdminOrClient,categoryUpdateValidator], updateStaff)
api.put('/updatePassword',[validateJwt,isAdminOrClient],updatePassword)
api.delete('/deleteStaff', [validateJwt, isAdminOrClient], deleteStaff)

export default api

