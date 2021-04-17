import Restaurant from '../models/restaurant.js';

export const getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find({}, { _id: 0 });
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const getRestaurantByCode = async (req, res) => {
    const query = {code: req.params.code};
    try {
        const restaurants = await Restaurant.findOne(query, { _id: 0 });
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createRestaurant = async (req, res) => {
    const restaurant = req.body;
    const newRestaurant = new Restaurant(restaurant);
    try {
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editRestaurant = async (req, res) => {
    const query = {'code': req.params.code};
    try {
        const restaurant = await Restaurant.findOneAndUpdate(query, req.body);
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
