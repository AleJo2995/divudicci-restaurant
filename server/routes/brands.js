import express from 'express';
import {getBrands, createBrand, getBrandByCode, editBrand, login} from '../controllers/brands.js'

const router = express.Router();

router.get('/', getBrands);
router.get('/getBrandByCode/:code', getBrandByCode);
router.patch('/edit/:code', editBrand);
router.post('/create', createBrand);
router.post('/login', login);

export default router;