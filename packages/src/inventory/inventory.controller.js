import Product from '../products/products.model.js'
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

export const valorTotalInventario = async (req, res) => {
    try {
        const productos = await Product.find({}, 'stock price'); // Solo traemos stock y precio

        const valorTotal = productos.reduce((total, producto) => {
            return total + (producto.stock * producto.price);
        }, 0);

        return res.status(200).json({ valorTotal });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'Error interno del servidor', error: e.message });
    }
};

