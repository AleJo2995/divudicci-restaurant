import express from 'express';
import {getUsers, createUser, getUserByCode, editUser} from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.get('/getUserByCode/:code', getUserByCode);
router.patch('/edit/:code', editUser);
router.post('/create', createUser);

export default router;