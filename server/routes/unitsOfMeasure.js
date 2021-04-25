import express from 'express';
import {getUnitOfMeasures, createUnitOfMeasure, getUnitOfMeasureByCode, editUnitOfMeasure} from '../controllers/unitOfMeasure.js'

const router = express.Router();

router.get('/', getUnitOfMeasures);
router.get('/getUnitOfMeasureByCode/:code', getUnitOfMeasureByCode);
router.patch('/edit/:code', editUnitOfMeasure);
router.post('/create', createUnitOfMeasure);

export default router;