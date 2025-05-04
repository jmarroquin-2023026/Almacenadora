import Staff from '../src/staff/staff.model.js'

/* export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Email ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
} */

/* export const existUsername = async(username,user)=>{
    const alreadyUsermame = await User.findOne({username})
    if(alreadyUsermame && alreadyUsermame._id != user.uid){
        console.error(`Username ${username} is already taken`)
        throw new Error(`Email ${username} is already taken`)
    }
} */

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