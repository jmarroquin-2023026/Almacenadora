import { Router } from "express";
import { avaliableStock, inventoryMovements, inventoryOfProduct, 
        registerEntry, registerExit, stock, TotalPriceInventory } from "./inventory.controller.js";

const api=Router()

api.get('/ProductStock/:id',stock)
api.get('/totalStock', avaliableStock)
api.get('/stockValue',TotalPriceInventory)
api.post('/entries',registerEntry)
api.post('/exists',registerExit)
api.get('/productMovement/:id',inventoryOfProduct)
api.get('/movements',inventoryMovements)

export default api