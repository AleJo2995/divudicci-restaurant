import Bar from '../models/bar.js';

export const getBars = async (req, res) => {
    try {
        const bars = await Bar.find({}, { _id: 0 });
        res.status(200).json(bars);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getBarsByRestaurant = async (req, res) => {
    const query = {restaurant: req.params.restaurantName};
    try {
        const bars = await Bar.find(query, { _id: 0 });
        res.status(200).json(bars);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getBarByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const buffets = await Bar.findOne(query, { _id: 0 });
        res.status(200).json(buffets);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createBar = async (req, res) => {
    const bar = req.body;
    const newBar = new Bar(bar);
    try {
        await newBar.save();
        res.status(201).json(newBar);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editBar = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const bar = await Bar.findOneAndUpdate(query, req.body);
        res.status(200).json(bar);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}