import express from 'express';
import {getUsers, createUser, getUserByCode, editUser, login} from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.get('/getUserByCode/:code', getUserByCode);
router.patch('/edit/:code', editUser);
router.post('/create', createUser);
router.post('/login', login);

export default router;