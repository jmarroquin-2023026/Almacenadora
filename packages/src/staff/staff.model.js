import {Schema, model} from 'mongoose'

const staffSchema = Schema(
    {
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
        CUI:{
            type: String,
            required: [true, 'DPI number is required'],
            maxLength: [13, `Can't be overcome 13 characters`],
        },
        email: {
            type: String, 
            required: [true, 'Email is required'],
            unique: [true, 'This email already exists in database']
        },
        password:{
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
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
            enum: ['ADMIN', 'EMPLOYEE']
        }
    }
)

export default model('Staff', staffSchema)