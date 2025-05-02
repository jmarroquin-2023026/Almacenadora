import { Router } from "express";
import { avaliableStock, stock, TotalPriceInventory } from "./inventory.controller.js";

const api=Router()

api.get('/ProductStock/:id',stock)
api.get('/totalStock', avaliableStock)
api.get('/stockValue',TotalPriceInventory)

export default api