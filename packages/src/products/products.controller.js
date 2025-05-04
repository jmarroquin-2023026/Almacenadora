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
        product = await Product.findById(product._id).populate('category', 'name -_id')
        return res.status(201).send(
            {
                success: true, 
                message: 'Product saved successfully', 
                product
            })
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
            let category =await User.findById(data.Category).populate('category', 'name -_id')
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

export const getByCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { limit = 10, skip = 0 } = req.query
        const products = await Product.find({ category: id })
            .populate('category', 'name -_id')
            .skip(skip)
            .limit(limit)
            console.log('Searching for products in category:', id)

        if (!products.length) {
            return res.status(404).send({
                success: false,
                message: 'No products found for this category'
            })
        }

        return res.status(200).send({
            success: true,
            message: 'Products found',
            products
        })
    } catch (e) {
        console.error(e)
        return res.status(500).send({ message: 'Internal server error', e })
    }
}

export const getByName=async(req,res)=>{
    try{
        const {name}=req.params
        const {limit=10,skip=0}=req.query
        const filter={}
        if(name){
            filter.name={$regex:name,$options:'i'}
        }
        const product = await Product.find(filter)
        .populate('category', 'name -_id')
        .skip(skip)
        .limit(limit)
        if(!product.length){
            return res.status(404).send(
                {
                    success:false,
                    message:'There are no matches '
                }
            )
        }
        return res.status(200).send({
            success: true,
            message: 'Products found',
            product
        })
    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                message:'Internal server error',
                e
            }
        )
        
    }
}


export const getProducts=async(req,res)=>{
    try{
        const {limit=10,skip=0}=req.query
        const products=await Product.find()
        .populate('category', 'name -_id')
        .skip(skip)
        .limit(limit)
        if(!products)return res.status(404).send(
            {
                success:false,
                message:'Products not found'
            }
        )
        return res.status(200).send(
            {
                success:true,
                message:'Products found',
                products
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message:'Internal server error',e})
    }
}