import User from '../user/user.model.js'
import argon from 'argon2'

const getClients =async(req, res)=>{
    try{
        const {limit = 20, skip= 0} = req.query
        const client = await User.find({role: "CLIENT"}).skip(skip).limit(limit);
        if(client.length === 0){
            return res.status(404).send({success: false, message: 'Clients not found'})
        }
        return res.send({success: true, message:'Clients found:', client})
    }catch (e){
        console.error(e)
        return res.status(500).send({success: false, message: 'General error', e})
    }
}



