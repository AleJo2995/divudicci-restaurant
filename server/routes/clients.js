import express from 'express';
import {getClients, createClient, getClientByCode, editClient} from '../controllers/clients.js'

const router = express.Router();

router.get('/', getClients);
router.get('/getClientByCode/:code', getClientByCode);
router.patch('/edit/:code', editClient);
router.post('/create', createClient);

export default router;