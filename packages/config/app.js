import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors'
import categoryRoutes from '../src/category/category.routes.js'
import clientsRoutes from '../src/clients/clients.routes.js'
import employeeRoutes from '../src/employee/employee.routes.js'
import productsRoutes from '../src/products/products.routes.js'
import suppliersRoutes from '../src/suppliers/supliers.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import inventoryRoutes from '../src/inventory/invetory.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(categoryRoutes)
    app.use(clientsRoutes)
    app.use(employeeRoutes)
    app.use(productsRoutes)
    app.use(suppliersRoutes)
    app.use(authRoutes)
    app.use(inventoryRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`)
    }catch (e){
        console.error('Server init failed', e)
    }
}