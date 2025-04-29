import Category from '../category/category.model.js'

export const test = (res)=>{
    console.log('Categories is running')
    res.send({message: 'Categories is running'})
}

export const addCategory = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({success:true, message: 'Categorie saved successfully'})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const getCategory = async(req, res)=>{
    try {
        const {limit = 20, skip = 0} = req.query
        let category = await Category.find().skip(skip).limit(limit)
        if(category.length === 0)return res.status(404).send(
            {
                success: false, 
                message: 'Categories not found'
            }
        )    
        return res.send({success:true, message: 'Categories found: ', category})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error'}, e)
    }
}

export const getCategoryById = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await Category.findById(id)
        if (!category) return res.status(404).send(
            {
                success:false, message: 'Category not found'
            }
        )
        return res.send({success:true, message: 'Category found: ',category})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General error', e})
    }
}

export const updateCategorie = async (req, res) => {
    try {
        const {id} = req.params
        const data = req.body
        const updatedCategory = await Category.findByIdAndUpdate(id, data, {new: true})
        if (!updatedCategory) return res.status(404).send(
            {
                success:false,
                message:'Categorie not found'
            }
        )
        return res.send({success:true, message:'Category updated successfully', updatedCategory})
    } catch (e) {
        console.error(e)
        return res.status(500).send({message: 'General Error', e})
    }
}

export const deleteCategorie = async (req, res) => {
    try {
        const {id} = req.params
        const deletedCategory = await Category.findByIdAndDelete(id)
        if (!deletedCategory) return res.status(404).send(
            { 
                success: false,
                message: 'Category not found' 
            }
        )
        return res.send({success: false, message:'Category deleted successfully'})
    } catch (e) {
        console.error(e);
        return res.status(500).send({message:'General Error', e})
    }
}