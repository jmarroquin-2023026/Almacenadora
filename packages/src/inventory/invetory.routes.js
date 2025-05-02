import { Router } from "express";
import { avaliableStock, stock, valorTotalInventario } from "./inventory.controller.js";

const api=Router()

api.get('/ProductStock/:id',stock)
api.get('/totalStock', avaliableStock)
api.get('/stockValue',valorTotalInventario)

export default api