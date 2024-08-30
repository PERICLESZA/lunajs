import db from '../config/db.js'; // Certifique-se de que a extensão está correta

const getAllBanks = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM bank');
    console.log('Resultado da consulta:', rows);
    return rows;
  } catch (err) {
    console.error('Erro ao buscar bancos:', err);
    throw err;
  }
};

const getBankById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM bank WHERE idbank = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error('Erro ao buscar banco por ID:', err);
    throw err;
  }
};

const addBank = async (name) => {
  try {
    const result = await db.query('INSERT INTO bank (namebank) VALUES (?)', [name]);
    return result.insertId;
  } catch (err) {
    console.error('Erro ao adicionar banco:', err);
    throw err;
  }
};

const updateBank = async (id, name) => {
  try {
    const result = await db.query('UPDATE bank SET namebank = ? WHERE idbank = ?', [name, id]);
    return result;
  } catch (err) {
    console.error('Erro ao atualizar banco:', err);
    throw err;
  }
};

const deleteBank = async (id) => {
  try {
    const result = await db.query('DELETE FROM bank WHERE idbank = ?', [id]);
    return result;
  } catch (err) {
    console.error('Erro ao excluir banco:', err);
    throw err;
  }
};

// Exporta todas as funções como um objeto
export default {
  getAllBanks,
  getBankById,
  addBank,
  updateBank,
  deleteBank
};
