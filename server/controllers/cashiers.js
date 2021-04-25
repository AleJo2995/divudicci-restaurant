import Cashier from '../models/cashier.js';

export const getCashiers = async (req, res) => {
    try {
        const cashiers = await Cashier.find({}, { _id: 0 });
        res.status(200).json(cashiers);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getCashierByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const cashiers = await Cashier.findOne(query, { _id: 0 });
        res.status(200).json(cashiers);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createCashier = async (req, res) => {
    const cashier = req.body;
    const newCashier = new Cashier(cashier);
    try {
        await newCashier.save();
        res.status(201).json(newCashier);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editCashier = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const cashier = await Cashier.findOneAndUpdate(query, req.body);
        res.status(200).json(cashier);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const login = async (req, res) => {
    const query = {'cashierName': req.body.cashierName};
    try {
        const cashier = await Cashier.findOne(query);
        if(cashier.password = req.body.password){
            res.status(200).json(cashier);
        } else {
            res.status(500).json(cashier);
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
