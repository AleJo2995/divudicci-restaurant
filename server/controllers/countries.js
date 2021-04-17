

import Country from '../models/country.js';

export const getCountries = async (req, res) => {
    try {
        const countries = await Country.find({}, { _id: 0 });
        res.status(200).json(countries);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getCountryByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const countries = await Country.findOne(query, { _id: 0 });
        res.status(200).json(countries);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createCountry = async (req, res) => {
    const country = req.body;
    const newCountry = new Country(country);
    try {
        await newCountry.save();
        res.status(201).json(newCountry);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editCountry = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const country = await Country.findOneAndUpdate(query, req.body);
        res.status(200).json(country);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}