import express from 'express';
import {getUsers, createUser, getUserByCode} from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.get('/getUserByCode/:code', getUserByCode);
router.post('/create', createUser);

export default router;