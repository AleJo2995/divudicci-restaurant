import express from 'express';
import {getUsers, createUser} from '../controllers/users.js'

const router = express.Router();

router.get('/', getUsers);
router.post('/create', createUser);

export default router;