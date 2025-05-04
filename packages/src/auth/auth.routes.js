import { Router } from "express";
import { Login } from "./auth.controller.js";

const api=Router()

api.post('/login',Login)

export default api