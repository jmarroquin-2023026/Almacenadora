import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from 'cors'
import categoryRoutes from '../src/category/category.routes.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use(categoryRoutes)

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