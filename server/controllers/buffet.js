import Buffet from '../models/buffet.js';

export const getBuffets = async (req, res) => {
    try {
        const buffets = await Buffet.find({}, { _id: 0 });
        res.status(200).json(buffets);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getBuffetByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const buffets = await Buffet.findOne(query, { _id: 0 });
        res.status(200).json(buffets);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createBuffet = async (req, res) => {
    const buffet = req.body;
    const newBuffet = new Buffet(buffet);
    try {
        await newBuffet.save();
        res.status(201).json(newBuffet);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editBuffet = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const buffet = await Buffet.findOneAndUpdate(query, req.body);
        res.status(200).json(buffet);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const query = {'buffetName': req.body.buffetName};
    try {
        const buffet = await Buffet.findOne(query);
        if(buffet.password = req.body.password){
            res.status(200).json(buffet);
        } else {
            res.status(500).json(buffet);
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
