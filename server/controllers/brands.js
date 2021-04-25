import Brand from '../models/brand.js';

export const getBrands = async (req, res) => {
    try {
        const brands = await Brand.find({}, { _id: 0 });
        res.status(200).json(brands);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getBrandByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const brands = await Brand.findOne(query, { _id: 0 });
        res.status(200).json(brands);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createBrand = async (req, res) => {
    const brand = req.body;
    const newBrand = new Brand(brand);
    try {
        await newBrand.save();
        res.status(201).json(newBrand);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editBrand = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const brand = await Brand.findOneAndUpdate(query, req.body);
        res.status(200).json(brand);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const query = {'brandName': req.body.brandName};
    try {
        const brand = await Brand.findOne(query);
        if(brand.password = req.body.password){
            res.status(200).json(brand);
        } else {
            res.status(500).json(brand);
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
