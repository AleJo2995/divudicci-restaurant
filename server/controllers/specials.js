import Special from '../models/special.js';

export const getSpecials = async (req, res) => {
    try {
        const specials = await Special.find({}, { _id: 0 });
        res.status(200).json(specials);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getSpecialByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const specials = await Special.findOne(query, { _id: 0 });
        res.status(200).json(specials);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createSpecial = async (req, res) => {
    const special = req.body;
    const newSpecial = new Special(special);
    try {
        await newSpecial.save();
        res.status(201).json(newSpecial);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editSpecial = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const special = await Special.findOneAndUpdate(query, req.body);
        res.status(200).json(special);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const query = {'specialName': req.body.specialName};
    try {
        const special = await Special.findOne(query);
        if(special.password = req.body.password){
            res.status(200).json(special);
        } else {
            res.status(500).json(special);
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
