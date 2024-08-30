import express from 'express';
import { getAllBanks, getBankById, addBank, updateBank, deleteBank } from '../controllers/bankController.js';

const router = express.Router();

router.get('/', getAllBanks);
router.get('/:id', getBankById);
router.post('/', addBank);
router.put('/:id', updateBank);
router.delete('/:id', deleteBank);

export default router;
