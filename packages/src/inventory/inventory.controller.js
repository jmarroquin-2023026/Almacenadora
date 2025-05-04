import Product from '../products/products.model.js'
import Movement from './inventory.model.js'
import Employee from '../staff/staff.model.js'

export const stock=async (req,res)=>{
    try{
        const {id}=req.params
        const product = await Product.findById(id).populate('category', 'name -_id')
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
                product
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({ message:'Internal server error',e})
    }
}

export const avaliableStock = async (req, res) => {
    try {
        const productos = await Product.find({stock:{$gt:0}}).populate('category', 'name -_id')
        const totalStock = productos.reduce((sum, prod) => sum + prod.stock, 0)
        return res.status(200).send(
            {
                totalStock,
                productos
            }
        )
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
        const quantity = Number(data.quantity);
        product.stock = product.stock + quantity;
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


export const inventoryOfProduct = async (req, res) => {
  try {
    /* const { productId } = req.params;
    const movement1 = await Movement.find(); // sin filtro
    console.log('Product ID:', productId)
console.log(movement1);
    const movement = await Movement.find({ product: productId }) // <--- CAMBIADO
      .populate('employee', 'name surname')
      .populate('product', 'name')
      .sort({ date: -1 });

    res.status(200).send({
      success: true,
      movement
    });*/
  } catch (e) {
        console.error(e)
        return res.status(500).send({message:'Internal server error', error:e})
  } 
}



export const inventoryMovements = async (req, res) => {
    try {
      const { date } = req.body;
  
      if (!date) {
        return res.status(400).send({
          success: false,
          message: 'Date is required in the query (e.g., ?date=2024-05-10)',
        });
      }
  
      const queryDate = new Date(date);
      const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0))
      const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999))
  
      const entries = await Movement.find({
        type: 'Entry',
        date: { $gte: startOfDay, $lte: endOfDay },
      })
        .populate('product', 'name -_id') 
        .populate('employee','name -_id')
        .sort({ date: -1 });
  
      return res.status(200).send({
        success: true,
        date,
        count: entries.length,
        entries,
      })
    } catch (e) {
        console.error(e)
        return res.status(500).send({message:'Internal server error',error:e})
    }
  }
  