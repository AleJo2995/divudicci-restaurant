import express from 'express';
import {getCashiers, createCashier, getCashierByCode, editCashier} from '../controllers/cashiers.js'

const router = express.Router();

router.get('/', getCashiers);
router.get('/getcashierByCode/:code', getCashierByCode);
router.patch('/edit/:code', editCashier);
router.post('/create', createCashier);

export default router;