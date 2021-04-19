import UnitOfMeasure from '../models/unitOfMeasure.js';

export const getUnitOfMeasures = async (req, res) => {
    try {
        const unitOfMeasures = await UnitOfMeasure.find({}, { _id: 0 });
        res.status(200).json(unitOfMeasures);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getUnitOfMeasureByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const unitOfMeasures = await UnitOfMeasure.findOne(query, { _id: 0 });
        res.status(200).json(unitOfMeasures);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createUnitOfMeasure = async (req, res) => {
    const unitOfMeasure = req.body;
    const newUnitOfMeasure = new UnitOfMeasure(unitOfMeasure);
    try {
        await newUnitOfMeasure.save();
        res.status(201).json(newUnitOfMeasure);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editUnitOfMeasure = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const unitOfMeasure = await UnitOfMeasure.findOneAndUpdate(query, req.body);
        res.status(200).json(unitOfMeasure);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
