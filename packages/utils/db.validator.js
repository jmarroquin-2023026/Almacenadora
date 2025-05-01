import User from '../models/user.model.js';
import Category from '../models/category.model.js';

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existUsername = async(username,user)=>{
    const alreadyUsermame = await User.findOne({username})
    if(alreadyUsermame && alreadyUsermame._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Email ${username} is already taken`)
    }
}

export const objetctIdValid = async(objectId)=>{
    if(!isValidObjectId(objectId)) throw new Error('Category is not a valid ObjectId')
}

export const notRequiredField = (field)=>{
    if(field){
        throw Error(`${field} is not required`)
    }
}