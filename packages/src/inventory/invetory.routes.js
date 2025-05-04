import { Router } from "express";
import { avaliableStock, inventoryMovements, inventoryOfProduct, 
        registerEntry, registerExit, stock, TotalPriceInventory } from "./inventory.controller.js";
import { isAdmin, isAdminOrClient, validateJwt } from "../../middlewares/validator.jwt.js";

const api=Router()

api.get('/ProductStock/:id',[validateJwt,isAdminOrClient],stock)
api.get('/totalStock', [validateJwt,isAdmin],avaliableStock)
api.get('/stockValue',[validateJwt,isAdmin],TotalPriceInventory)
api.post('/entries',[validateJwt,isAdminOrClient],registerEntry)
api.post('/exists',[validateJwt,isAdminOrClient],registerExit)
api.get('/productMovement/:productId',[validateJwt,isAdminOrClient],inventoryOfProduct)
api.get('/movements',[validateJwt,isAdminOrClient],inventoryMovements)

export default api