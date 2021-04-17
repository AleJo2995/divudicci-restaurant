import express from 'express';
import {getCountries, createCountry, getCountryByCode, editCountry} from '../controllers/countries.js'

const router = express.Router();

router.get('/', getCountries);
router.get('/getCountryByCode/:code', getCountryByCode);
router.patch('/edit/:code', editCountry);
router.post('/create', createCountry);

export default router;