import { checkPassword, encrypt } from '../../utils/encrypt.js'
import Staff from '../staff/staff.model.js'

export const addEmployee = async(req, res) =>{
    try{
        let data = req.body
        console.log("Datos recibidos:", data); 
        let staff = new Staff(data)
        staff.password=await encrypt(staff.password)
        staff.role='EMPLOYEE'
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
        return res.status(200).send({
            success: true,
            message: 'Employees retrieved successfully',
            staff
          });
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
        const id = req.staff.uid
        const data = req.body
        const updatedStaff = await Staff.findByIdAndUpdate(id, data, {new: true})
        if (!updatedStaff) return res.status(404).send(
            {
                success:false,
                message:'Employee not found'
            }
        )
        return res.send(
            {
                success:true, 
                message:'Employee updated successfully', 
                updatedStaff
            })
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const updatePassword = async (req, res) => {
    try {
        let id = req.staff.uid
        let { newPassword, oldPassword } = req.body;
        let staff = await Staff.findById(id);
        if (!staff) return res.status(404).send({ message: 'Ustaff not found' });
        if (!staff.password) {
            return res.status(500).send({ message: 'Password not found in Ustaffts data' });
        }
        let compare = await checkPassword(staff.password, oldPassword);
        if (!compare) return res.status(400).send({ message: 'Incorrect Password' })
        staff.password = await encrypt(newPassword);
        await staff.save();
        return res.send(
            { 
                message: 'Password updated successfully' 
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Internal Server Error', error: e.message })
    }
}


export const deleteStaff = async(req, res) => {  
    try {  
        const { password } = req.body  
        const id = req.staff.uid  

        const staff = await Staff.findById(id)  
        if (!staff) return res.status(404).send({  
            message: 'Empoyee not found'  
        })  

        let compare = await checkPassword(staff.password, password); 
        if (!compare) return res.status(401).send({  
            message: 'Incorrect password'  
        })  

        const deletedUstaff = await Staff.findByIdAndDelete(id)  
        return res.send({  
            message: 'Employee deleted successfully',  
        })  
    } catch (e) {  
        console.error(e)  
        return res.status(500).send({  
            message: 'General error',  
            e  
        })  
    }  
}  