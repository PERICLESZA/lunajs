import express from 'express';
import { getAllLogins, getLoginById, addLogin, updateLogin, deleteLogin } from '../controllers/cadLoginController.js';

const router = express.Router();

router.get('/logins', getAllLogins);
router.get('/logins/:id', getLoginById);
router.post('/logins', addLogin);
router.put('/logins/:id', updateLogin);
router.delete('/logins/:id', deleteLogin);

export default router;
