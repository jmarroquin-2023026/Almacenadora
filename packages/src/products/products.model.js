    import { Schema, model } from 'mongoose'

    const productSchema = Schema({
        name: {
            type: String,
            required: [true, 'Name is required']
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
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        },
        stock: {
            type: Number,
            required: [true, 'Stock is required']
        },
        expirationDate:{
            type:Date,
            required:[false]
        }
    })

    export default model('Product', productSchema)