import express from 'express';
import {getTables, createTable, getTablesByRestaurant, editTable, getTableByCode} from '../controllers/tables.js'

const router = express.Router();

router.get('/', getTables);
router.get('/getTablesByRestaurant/:restaurantName', getTablesByRestaurant);
router.get('/getTableByCode/:code', getTableByCode);
router.patch('/edit/:code', editTable);
router.post('/create', createTable);

export default router;