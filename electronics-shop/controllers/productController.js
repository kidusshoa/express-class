import Product from '../models/Product.js';

export const createProduct = async (req, res) => {
    try{
        const { name, description, price, category, stock } = req.body;
        const product = new Product({
            user: req.user._id,
            name,
            description,
            price,
            category,
            stock
        })
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    }catch(error){
        res.status(500).json({message: 'Server Error'})
    }
} 