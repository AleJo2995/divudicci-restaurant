import express from 'express';
import {getProducts, createProduct, getProductByCode, editProduct, login} from '../controllers/products.js'

const router = express.Router();

router.get('/', getProducts);
router.get('/getProductByCode/:code', getProductByCode);
router.patch('/edit/:code', editProduct);
router.post('/create', createProduct);
router.post('/login', login);

export default router;