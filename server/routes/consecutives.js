import express from 'express';
import { getConsecutives, getConsecutiveByType, 
    getNextConsecutiveValue, createConsecutive, editConsecutive, updateConsecutiveActualValue } from '../controllers/consecutives.js'

const router = express.Router();

router.get('/', getConsecutives);
router.get('/getByType', getConsecutiveByType);
router.get('/get/lastConsecutive', getNextConsecutiveValue);
router.patch('/update/lastConsecutive', updateConsecutiveActualValue);
router.post('/create', createConsecutive);
router.patch('/edit', editConsecutive);

export default router;