import express from 'express';
import loginController from '../controllers/loginController.js'; // Certifique-se de usar a extensão correta

const router = express.Router();

// Rota para validar o login
router.post('/login', loginController.validateLogin);

// Rotas para login
router.get('/', loginController.getAllLogins);
router.get('/:id', loginController.getLoginById);
router.post('/', loginController.addLogin);
router.put('/:id', loginController.updateLogin);
router.delete('/:id', loginController.deleteLogin);

export default router;
