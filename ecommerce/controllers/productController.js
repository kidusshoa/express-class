import Product from '../models/Product.js';

export const createProduct = async (req,res)=> {
    const { name, description, price, stock, category, imageUrl } = req.body;

    const product = new Product({
        name,
        price,
        user: req.user._id,
        description,
        stock,
        category,
        imageUrl
    })

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
}

export const getProducts = async (req, res) => {
    try{
        const products =  await Product.find({});
        res.json(products);
    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }else {
            res.status(404).json({message: 'Product not found'});
        }
    }catch(err){
        res.status(404).json({message: 'Product not found'});
    }
}

export const updateProduct = async (req, res) => {
    try{
        const { name, description, price, stock, category, imageUrl } = req.body;
        const product = await Product.findById(req.params.id);

        if(product){
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.stock = stock || product.stock;
            product.category = category || product.category;
            product.imageUrl = imageUrl || product.imageUrl;

            const updatedProduct = await product.save();
            res.json(updatedProduct);
        }else{
            res.status(404).json({message: 'Product not found'});
        }


    }catch(err){
        res.status(500).json({message: 'Server error'});
    }
}