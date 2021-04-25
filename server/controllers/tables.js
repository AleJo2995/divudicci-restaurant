import Table from '../models/table.js';

export const getTables = async (req, res) => {
    try {
        const tables = await Table.find({}, { _id: 0 });
        res.status(200).json(tables);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getTablesByRestaurant = async (req, res) => {
    const query = {restaurant: req.params.restaurantName};
    try {
        const tables = await Table.find(query, { _id: 0 });
        res.status(200).json(tables);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getTableByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const buffets = await Table.findOne(query, { _id: 0 });
        res.status(200).json(buffets);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createTable = async (req, res) => {
    const table = req.body;
    const newTable = new Table(table);
    try {
        await newTable.save();
        res.status(201).json(newTable);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editTable = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const table = await Table.findOneAndUpdate(query, req.body);
        res.status(200).json(table);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

