import Staff from '../staff/staff.model.js'

export const addEmployee = async(req, res) =>{
    try{
        let data = req.body
        Staff.role = 'EMPLOYEE'
        let staff = new Staff(data)
        await staff.save()
        return res.send({success: true, message: 'Employee saved succesfully'})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getEmployee = async(req, res) =>{
    try {
        const {limit = 20, skip =0}  = req.query
        const staff = await Staff.find({role: 'EMPLOYEE'}).skip(skip).limit(limit)
        if(staff.length === 0)return res.status(404).send(
            {
                success: false, 
                message: 'Empleoyees not found'
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getEmployeeById = async(req,res)=>{
    try {
        const {id} = req.params
        const employee = await Staff.findById(id)
        if (!employee) return res.status(404).send(
            {
                success:false, message: 'Employee not found'
            }
        )
        return res.send({success:true, message: 'Employee found: ',employee})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updateStaff = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        const updatedStaff = await Staff.findByIdAndUpdate(id, data, {new: true})
        if (!updatedStaff) return res.status(404).send(
            {
                success:false,
                message:'Employee not found'
            }
        )
        return res.send({success:true, message:'Employee updated successfully', updatedStaff})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const deleteStaff = async (req, res) => {
    try {
        const {id} = req.params
        const deletedStaff = await Staff.findByIdAndDelete(id)
        if (!deletedStaff) return res.status(404).send(
            { 
                success: false,
                message: 'Employee not found' 
            }
        )
        return res.send({success: false, message:'Employee deleted successfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message:'General Error', e})
    }
}


