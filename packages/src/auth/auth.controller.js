import { checkPassword } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'
import Staff from '../staff/staff.model.js'

export const Login=async(req,res)=>{
    try{
        let{userLogin,password}=req.body
        
        let staff=await Staff.findOne({
            $or:[
                {email:userLogin},  
                {cui:userLogin}
            ]
        })
        
        if(staff && await checkPassword(staff.password, password)){
            let loggedUser={
                uid: staff._id,
                name: staff.name,
                surname: staff.surname,
                role: staff.role
            }
            
            let token= await generateJwt(loggedUser)
            
            return res.send(
                {
                        message: `Welcome ${staff.name}`,
                        loggedUser,
                        token
                }
            )
        }
        return res.status(400).send({message:'Invalid Credentials'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'General error with login function',e})
    }
}