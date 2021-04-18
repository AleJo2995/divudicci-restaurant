import Consecutive from '../models/consecutive.js';

export const getConsecutives = async (req, res) => {
    try {
        const consecutives = await Consecutive.find();
        res.status(200).json(consecutives);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createConsecutive = async (req, res) => {
    const consecutive = req.body;
    const newConsecutive = new Consecutive(consecutive);
    try {
        await newConsecutive.save();

        res.status(201).json(newConsecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getNextConsecutiveValue = async (req, res) => {
    const query = {'code': req.query.code}
    const selectedFields = { 'actualValue':1,  'initialValue':1, 'code':1};
    try {
        const consecutive =await Consecutive.findOne(query).select(selectedFields);
        res.status(200).json(consecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const updateConsecutiveActualValue = async (req, res) => {
    const query = {'code': req.query.code};
    try {
        const consecutive =await Consecutive.findOneAndUpdate(query, req.body);
        res.status(200).json(consecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const handleConsecutives = async (consecutiveType, valueToIncrement) => {
    try {
        return await Consecutive.find({ type: consecutiveType }).updateOne({ actualValue: valueToIncrement})
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getConsecutiveByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const users = await Consecutive.findOne(query, { _id: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getConsecutiveByType = async (req, res) => {
    const consecutiveType = req.query.type;
    try {
        const consecutive = await Consecutive.find({ type: consecutiveType });
        res.status(200).json(consecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editConsecutive = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const consecutive = await Consecutive.findOneAndUpdate(query, req.body);
        res.status(200).json(consecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}