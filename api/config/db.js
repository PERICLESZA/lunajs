import mysql from 'mysql2/promise';

// Cria a conexão com o banco de dados
const db = await mysql.createConnection({
  host: 'mysql.cedroinfo.com.br',
  user: 'cedroibr7',
  password: 'Acd3590t',
  database: 'cedroibr7',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000  // tempo em milissegundos
});

try {
  // Verifica a conexão
  await db.connect();
  console.log('Conectado ao banco de dados MySQL');
} catch (err) {
  console.error('Erro ao conectar ao banco de dados:', err);
}

// Verifica a conexão periodicamente
setInterval(async () => {
  try {
    await db.ping();
  } catch (err) {
    console.log('Ping error:', err);
  }
}, 15000);

export default db;
