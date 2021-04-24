import Product from '../models/product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}, { _id: 0 });
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getProductByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const products = await Product.findOne(query, { _id: 0 });
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createProduct = async (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editProduct = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const product = await Product.findOneAndUpdate(query, req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const query = {'productName': req.body.productName};
    try {
        const product = await Product.findOne(query);
        if(product.password = req.body.password){
            res.status(200).json(product);
        } else {
            res.status(500).json(product);
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
