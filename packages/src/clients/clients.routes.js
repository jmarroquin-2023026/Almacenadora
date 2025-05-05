import { Router } from "express";
import { getClients, getClientById, updateClient, addClient, deleteClient } from "./clients.controller.js";
import { updateUSerValidator, registerUserValidator } from "../../middlewares/validator.js";
import { isAdmin } from "../../middlewares/validator.jwt.js";

const api = Router()

api.get('/getClients', getClients)
api.get('/getClientById/:id', getClientById)
api.post('/addClient', [registerUserValidator ,addClient])
api.put('/updateClient/:id', [updateClient, updateUSerValidator, isAdmin])
api.delete('/deleteClient/:id', [deleteClient, isAdmin])

export default api