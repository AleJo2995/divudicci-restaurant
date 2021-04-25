import express from 'express';
import {getRoles, createRole, getRoleByCode, editRole} from '../controllers/roles.js'

const router = express.Router();

router.get('/', getRoles);
router.get('/getRoleByCode/:code', getRoleByCode);
router.patch('/edit/:code', editRole);
router.post('/create', createRole);

export default router;