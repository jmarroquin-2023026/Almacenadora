import { Schema, model } from 'mongoose'

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [64, `Can't be overcome 64 characters`]
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    brand: {
        type: String,
        required: [true, 'Branch is required']
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    }
})

export default model('Product', productSchema)