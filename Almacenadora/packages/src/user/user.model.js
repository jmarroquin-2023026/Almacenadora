import {Schema, model} from 'mongoose'

const userSchema = Schema(
    {
        company: {
            type: String,
            maxLength: [40, `Can't be overcome 40 characters`]
        },
        name: {
            type: String, 
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        surname: {
            type: String, 
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        email: {
            type: String, 
            required: [true, 'Email is required'],
            unique: [true, 'This email already exists in database']
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            unique: [true, 'This phone already exist in database'],
            maxLength: [8, `Can't be overcome 8 numbers`]
        },
        role:{
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['CLIENT', 'SUPPLIER']
        }
    }
)

export default model('User', userSchema)