import express from 'express';
import { getAllCities, getCityById, addCity, updateCity, deleteCity } from '../controllers/cityController.js';

const router = express.Router();

router.get('/', getAllCities);
router.get('/:id', getCityById);
router.post('/', addCity);
router.put('/:id', updateCity);
router.delete('/:id', deleteCity);

export default router;
