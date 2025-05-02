import Product from '../products/products.model.js'
import Movement from './inventory.model.js'
import Employee from '../staff/staff.model.js'

export const stock=async (req,res)=>{
    try{
        const {id}=req.params
        const product = await Product.findById(id)
        if(!product){
            return res.status(404).send(
                {
                    success:false,
                    message:'Product not found'
                }
            )
        }
        return res.status(200).send(
            {
                success:true,
                messsage:'Stock of product',
                name:product.name,
                stock:product.stock
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({ message:'Internal server error',e})
    }
}

export const avaliableStock = async (req, res) => {
    try {
        const productos = await Product.find({stock:{$gt:0}}, 'name stock')

        return res.status(200).send(productos)
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            { 
                message: 'Error interno del servidor', 
                error: e 
            }
        )
    }
}

export const TotalPriceInventory = async (req, res) => {
    try {
        const productos = await Product.find({},'stock price')

        const valorTotal = productos.reduce((total, producto) => {
            return total + (producto.stock * producto.price)
        }, 0)

        return res.status(200).send(
            { 
                valorTotal 
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send({ message: 'Internal server error', error: e})
    }
}


export const registerEntry=async(req,res)=>{
    try{
        const {employeeId,productId,...data}=req.body
        const product=await Product.findById(productId)
        const employee=await Employee.findById(employeeId)
        if(!product || !employee){
            return res.status(404).send(
                {
                    success:false,
                    message: !product ? 'Producto not found' : 'Employee not found'
                }
            )
        }
        product.stock+=data.quantity
        await product.save()
        const movement=await new Movement({...data, product:product._id, employee:employee._id})
        await movement.save()
        return res.status(200).send(
            {
                success:true,
                message:'Movement register successfully'
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server error', error:e})
    }
}


export const registerExit=async(req,res)=>{
    try{
        const {employeeId,productId,...data}=req.body
        const product=await Product.findById(productId)
        const employee=await Employee.findById(employeeId)
        if(!product || !employee){
            return res.status(404).send(
                {
                    success:false,
                    message: !product ? 'Producto not found' : 'Employee not found'
                }
            )
        }
        if(product.stock<data.quantity){
            return res.status(400).send(
                {
                    success:false,
                    message:'stock not available'
                }
            )
        }
        product.stock-=data.quantity
        await product.save()
        const movement=await new Movement({...data, product:product._id, employee:employee._id})
        await movement.save()
        return res.status(200).send(
            {
                success:true,
                message:'Movement register successfully'
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server error', error:e})
    }
}

export const inventoryOfProduct=async(req,res)=>{
    try{
        const {productId}=req.params
        const movement=Movement.find({product:productId})
            .populate('employee','name surname')
            .populate('product','product')
            .sort({date: -1})
            res.status(200).send(
                {
                    success:true,
                    movement
                }
            )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server error',error:e})
    }
}

export const inventoryMovements=async(req,res)=>{
    try{
        const movement=await Movement.find()
            .populate('employee','name surname')
            .populate('product','product')
            .sort({date: -1})
            res.status(200).send(
                {
                    success:true,
                    movement
                }
            )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server error',error:e})
    }
}