import express from 'express';
import {getRestaurants, createRestaurant, getRestaurantByCode, editRestaurant} from '../controllers/restaurants.js'

const router = express.Router();

router.get('/', getRestaurants);
router.get('/getRestaurantByCode/:code', getRestaurantByCode);
router.patch('/edit/:code', editRestaurant);
router.post('/create', createRestaurant);

export default router;