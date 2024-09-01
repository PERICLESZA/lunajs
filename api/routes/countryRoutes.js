import express from 'express';
import {
    getAllCountries,
    getCountryById,
    addCountry,
    updateCountry,
    deleteCountry
} from '../controllers/countryController.js';

const router = express.Router();

router.get('/', getAllCountries);
router.get('/:id', getCountryById);
router.post('/', addCountry);
router.put('/:id', updateCountry);
router.delete('/:id', deleteCountry);

export default router;
