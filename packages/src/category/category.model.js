import { Schema, model } from "mongoose";

const categorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        maxLength: [25, `Can't be more than 25 characters`],
        unique: [true, 'This categorie already exist']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: [128, `Can't be more than 128 characters`]
    }
})

export default model('Category', categorySchema)