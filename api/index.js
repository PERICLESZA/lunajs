import express from 'express';
import cors from 'cors';
import bankRoutes from './routes/bankRoutes.js'; // Ajuste a extensão para .js
import cityRoutes from './routes/cityRoutes.js'; // Ajuste a extensão para .js
import loginRoutes from './routes/loginRoutes.js'; // Ajuste a extensão para .js
import classRoutes from './routes/classRoutes.js';
import countryRoutes from './routes/countryRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import idRoutes from './routes/idRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Usar rotas
app.use('/api/banks', bankRoutes);
app.use('/api/logins', loginRoutes);
app.use('/api/Cities', cityRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/countries', countryRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/identifications', idRoutes);

// Adicionar outras rotas

// Iniciar o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
});
