'use strict'

import jwt from 'jsonwebtoken'
import { findUser } from '../utils/db.validator.js'

export const validateJwt = async(req,res,next)=>{
    try{
        let secretKey=process.env.SECRET_KEY
        let{authorization}=req.headers
        if(!authorization)return res.status(401).send({message:'Unauthorized'})
            let staff=jwt.verify(authorization,secretKey)
            const validateUser=await findUser(staff.uid)
            if(!validateUser)return res.status(404).send({
                success:false,
                message:'User not found-unauthorized'
            })
            req.staff=staff
            next()
    }catch(e){
        console.error(e)
        return res.status(401).send({message:'Invalid Credentials'})
    }
}

export const isAdmin=async(req,res,next)=>{
    try{
        const{staff}=req
        if(!staff || staff.role !=='ADMIN') return res.status(403).send(
            {
                sucess:false,
                message:`You dont have access | username: ${staff.name}`
            }
        )
        next()
    }catch(e){
        console.error
        return res.status(403).send(
            {
                success: false,
                message: 'Internal server error',
                e
            }
        )
    }
}