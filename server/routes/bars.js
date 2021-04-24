import express from 'express';
import {getBars, createBar, getBarsByRestaurant, editBar, getBarByCode} from '../controllers/bars.js'

const router = express.Router();

router.get('/', getBars);
router.get('/getBarsByRestaurant/:restaurantName', getBarsByRestaurant);
router.get('/getBarByCode/:code', getBarByCode);
router.patch('/edit/:code', editBar);
router.post('/create', createBar);

export default router;