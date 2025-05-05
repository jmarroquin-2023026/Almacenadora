import Staff from '../src/staff/staff.model.js'
import Category from '../src/category/category.model.js'
import Product from '../src/products/products.model.js'


export const existEmail = async(email, user)=>{
    const alreadyEmail = await Staff.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
} 

export const existCUI=async(CUI,user)=>{
    const alreadyCui=await Staff.findOne({CUI})
    if(alreadyCui&&alreadyCui._id != user.uid){
        console.error(`CUI ${CUI} is already taken`)
        throw new Error(`CUI ${CUI} is already taken`)
    }
}

export const existUsername = async(username,user)=>{
    const alreadyUsermame = await Staff.findOne({username})
    if(alreadyUsermame && alreadyUsermame._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Email ${username} is already taken`)
    }
} 


export const existPhone=async(phone,user)=>{
    const alreadyPhone=await Staff.findOne({phone})
    if(alreadyPhone && alreadyPhone._id != user._uid){
        console.error(`Phone ${phone} is already taken`)
        throw new Error(`Phone ${phone} is already taken`)
    }
}

export const existCategory = async(name,category)=>{
    const alreadycategory = await Category.findOne({name})
    if(alreadycategory && alreadycategory._id != category._id){
        console.error(`Category ${name} is already exist`)
        throw new Error(`Category ${name} is already exist`)
    }
}

export const existProduct = async(name, product)=>{
    const alreadyProduct = await Product.findOne({name})
    if(alreadyProduct && alreadyProduct._id != product._id){
        console.error(`Product ${name} is already exist`)
        throw new Error(`Product ${name} is already exist`)
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

export const findUser=async(id)=>{
    try{
        const userExist=await Staff.findById(id)
        if(!userExist)return false
        return userExist
    }catch(e){
        console.error(e)
        return e
    }
}