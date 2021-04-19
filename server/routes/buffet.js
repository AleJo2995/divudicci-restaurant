import express from 'express';
import {getBuffets, createBuffet, getBuffetByCode, editBuffet, login} from '../controllers/buffet.js'

const router = express.Router();

router.get('/', getBuffets);
router.get('/getBuffetByCode/:code', getBuffetByCode);
router.patch('/edit/:code', editBuffet);
router.post('/create', createBuffet);
router.post('/login', login);

export default router;