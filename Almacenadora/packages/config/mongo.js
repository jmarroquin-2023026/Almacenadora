import mongoose, { mongo } from "mongoose";

export const connect = async()=>{
    try {
        mongoose.connection.on('error', ()=>{
            console.log(`MongoDB ֎ Cloudn't be connect to mongodb `)
        })
        mongoose.connection.on('connecting', ()=>{
            console.log('MongoDB ֎ Try connecting ֎')
        })
        mongoose.connection.on('connected', ()=>{
            console.log('MongoDB ֎ Connected to mongodb ֎')
        })
        mongoose.connection.once('open', ()=>{
            console.log('MongoDB ֎ Reconected to mongodb ֎')
        })
        mongoose.connection.on('reconected', ()=>{
            console.log('MongoDb ֎ Reconnected to mongodb ֎')
        })
        mongoose.connection.on('disconnected', ()=>{
            console.log('MongoDB ֎ Disconnected ֎')
        })

    await mongoose.connect(
        `${process.env.DB_SERVICE}://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
        {
            maxPoolSize: 50,
            serverSelectionTimeoutMS: 5000
        }
    )

    } catch (e){
        console.error('Database connection failed',e)
    }
}