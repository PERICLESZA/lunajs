import express from 'express';
import cors from 'cors';
import bankRoutes from './routes/bankRoutes.js'; // Ajuste a extensão para .js
import loginRoutes from './routes/loginRoutes.js'; // Ajuste a extensão para .js

const app = express();
app.use(cors());
app.use(express.json());

// Usar rotas
app.use('/api/banks', bankRoutes);
app.use('/api/logins', loginRoutes);
// Adicionar outras rotas

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
});
