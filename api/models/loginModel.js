import db from '../config/db.js'; // Ajuste a extensão para .js

const getAllLogins = async () => {
  const [rows] = await db.query('SELECT * FROM login');
  return rows;
};

const getLoginById = async (id) => {
  const [rows] = await db.query('SELECT * FROM login WHERE idlogin = ?', [id]);
  return rows;
};

const addLogin = async (loginData) => {
  const { active, email, login, nome, perfil, senha } = loginData;
  const result = await db.query('INSERT INTO login (active, email, login, nome, perfil, senha) VALUES (?, ?, ?, ?, ?, ?)', [active, email, login, nome, perfil, senha]);
  return result;
};

const updateLogin = async (id, loginData) => {
  const { active, email, login, nome, perfil, senha } = loginData;
  const result = await db.query('UPDATE login SET active = ?, email = ?, login = ?, nome = ?, perfil = ?, senha = ? WHERE idlogin = ?', [active, email, login, nome, perfil, senha, id]);
  return result;
};

const deleteLogin = async (id) => {
  const result = await db.query('DELETE FROM login WHERE idlogin = ?', [id]);
  return result;
};

const getLoginByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM login WHERE login = ?', [username]);
  return rows;
};

export default {
  getAllLogins,
  getLoginById,
  addLogin,
  updateLogin,
  deleteLogin,
  getLoginByUsername
};
