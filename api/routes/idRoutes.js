import express from 'express';
import { getAllIdentifications, getIdentificationById, addIdentification, updateIdentification, deleteIdentification } from '../controllers/idController.js';

const router = express.Router();

router.get('/', getAllIdentifications);
router.get('/:id', getIdentificationById);
router.post('/', addIdentification);
router.put('/:id', updateIdentification);
router.delete('/:id', deleteIdentification);

export default router;
