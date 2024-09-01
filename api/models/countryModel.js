import db from '../config/db.js';

const getAllCountries = async () => {
  try {
    const [rows] = await db.query('SELECT * FROM country');
    return rows;
  } catch (err) {
    console.error('Erro ao buscar países:', err);
    throw err;
  }
};

const getCountryById = async (id) => {
  try {
    const [rows] = await db.query('SELECT * FROM country WHERE idcountry = ?', [id]);
    return rows[0];
  } catch (err) {
    console.error('Erro ao buscar país por ID:', err);
    throw err;
  }
};

const addCountry = async (name) => {
  try {
    const result = await db.query('INSERT INTO country (namecountry) VALUES (?)', [name]);
    return result.insertId;
  } catch (err) {
    console.error('Erro ao adicionar país:', err);
    throw err;
  }
};

const updateCountry = async (id, name) => {
  try {
    const result = await db.query('UPDATE country SET namecountry = ? WHERE idcountry = ?', [name, id]);
    return result;
  } catch (err) {
    console.error('Erro ao atualizar país:', err);
    throw err;
  }
};

const deleteCountry = async (id) => {
  try {
    const result = await db.query('DELETE FROM country WHERE idcountry = ?', [id]);
    return result;
  } catch (err) {
    console.error('Erro ao excluir país:', err);
    throw err;
  }
};

export default {
  getAllCountries,
  getCountryById,
  addCountry,
  updateCountry,
  deleteCountry
};
