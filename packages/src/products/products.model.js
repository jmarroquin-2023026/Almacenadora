import { Schema, model } from 'mongoose'

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, `Can't be overcome 25 characters`]
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [128, `Can't be overcome 128 characters`]
    },
    brand: {
        type: String,
        required: [true, 'Branch is required'],
        maxLength: [25, `Can't be overcome 25 characters`]
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Category is required']
    },
    date:{
        type: Date,
        required: [true, 'Date is required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required']
    }
})

export default model('Product', productSchema)