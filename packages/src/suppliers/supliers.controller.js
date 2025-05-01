import User from "../user/user.model.js";

export const getSuppliers =async(req, res)=>{
    try{
        const {limit = 20, skip= 0} = req.query
        const suplier = await User.find({role: "SUPPLIER"}).skip(skip).limit(limit);
        if(suplier.length === 0)return res.status(404).send(
            {
                success: false, 
                message: 'Suppliers not found'
            }
        )
        return res.send({success: true, message:'Suppliers found:', suplier})
    }catch (e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getSupplierById = async(req,res)=>{
    try {
        const {id} = req.params
        const supplier = await User.findById(id)
        if (!supplier) return res.status(404).send(
            {
                success:false, message: 'Supplier not found'
            }
        )
        return res.send({success:true, message: 'Supplier found: ', supplier})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const addSupplier = async(req, res)=>{
    try {
        let data = req.body
        User.role='SUPPLIER'
        let supplier = new User(data)
        await supplier.save()
        return res.send({success:true, message: 'Supplier saved successfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updateSupplier = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        const updatedSupplier = await User.findByIdAndUpdate(id, data, {new: true})
        if (!updatedSupplier) return res.status(404).send(
            {
                success:false,
                message:'Supplier not found'
            }
        )
        return res.send({success:true, message:'Supplier updated successfully', updatedSupplier})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        const {id} = req.params
        const deletedSupplier = await User.findByIdAndDelete(id)
        if (!deletedSupplier) return res.status(404).send(
            { 
                success: false,
                message: 'Supplier not found' 
            }
        )
        return res.send({success: false, message:'Supplier deleted successfully'})
    } catch (e) {
        console.error(e);
        return res.status(500).send({message:'General Error', e})
    }
}
