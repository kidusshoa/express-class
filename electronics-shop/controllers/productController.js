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
        res.status(500).json({message: error.message});
    }
} 

export const getProducts = async (req,res) => {
    try{
        const products = await Product.find({});
        res.json(products);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const updateProduct = async (req, res) => {
    const { name, description, price, category, stock } = req.body;
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.category = category || product.category;
            product.stock = stock || product.stock;

            const updateProduct = await product.save();
            res.json(updateProduct);
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

export const deleteProduct = async(req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            await product.deleteOne();
            res.json({message: 'Product removed'});
        }else{
            res.status(404).json({message: "Product not found"});
        }
    }catch(error){
        res.status(500).json({message: error.message});
    }
}