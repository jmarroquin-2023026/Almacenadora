import User from '../user/user.model.js'

export const getClients =async(req, res)=>{
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

export const getClientById = async(req,res)=>{
    try {
        const {id} = req.params
        const user = await User.findById(id)
        if (!user) return res.status(404).send(
            {
                success:false, message: 'Client not found'
            }
        )
        return res.send({success:true, message: 'Client found: ',user})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const addClient = async(req, res)=>{
    try {
        let data = req.body
        User.role='CLIENT'
        let user = new User(data)
        await user.save()
        return res.send({success:true, message: 'Client saved successfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updateClient = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        const updatedClient = await User.findByIdAndUpdate(id, data, {new: true})
        if (!updatedClient) return res.status(404).send(
            {
                success:false,
                message:'Client not found'
            }
        )
        return res.send({success:true, message:'Client updated successfully', updatedClient})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const deleteClient = async (req, res) => {
    try {
        const {id} = req.params
        const deletedClient = await User.findByIdAndDelete(id)
        if (!deletedClient) return res.status(404).send(
            { 
                success: false,
                message: 'Client not found' 
            }
        )
        return res.send({success: false, message:'Client deleted successfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message:'General Error', e})
    }
}


