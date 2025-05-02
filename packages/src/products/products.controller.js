import Product from './products.model.js'
import Category from '../category/category.model.js'

export const addProduct = async (req, res) => {
    try {
        let {category, ...data } = req.body
         let cat = await Category.findById(category)
        if (!cat) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        ) 
        let product = new Product({ ...data,category:cat._id })
        await product.save()
        return res.status(201).send({success: true, message: 'Product saved successfully', product})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updateProduct = async(req,res)=>{
    try{
        let {id} =req.params
        let data =req.body
        if (data.Category) {
            let category =await User.findById(data.Category)
            if (!category) return res.status(400).send(
                    {
                        success: false, 
                        message: 'Product not found' 
                    }
                )
            }
        
        let updatedProduct= await Product.findByIdAndUpdate(id, data, {new:true})
        if(!updatedProduct) return res.status(404).send(
            {
                success: false,
                message:'Product not found'
            }
        )
        return res.send({success: true, message: 'Product updated successfully', updatedProduct})
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const deleteProduct = async(req, res)=>{
    try {
        const {id} = req.params
        const deletedProduct= await Product.findByIdAndDelete(id)
        if (!deletedProduct)return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
            return res.send({sucess: true, message: 'Product deleted succesfully'})
    } catch (e) {
        console.error(e);
        return res.status(500).send({message: 'General Error', e})
    }   
}