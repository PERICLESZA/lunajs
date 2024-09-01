import db from '../config/db.js';

const getAllCities = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM city');
        return rows;
    } catch (err) {
        console.error('Erro ao buscar cidades:', err);
        throw err;
    }
};

const getCityById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM city WHERE idcity = ?', [id]);
        return rows[0];
    } catch (err) {
        console.error('Erro ao buscar cidade por ID:', err);
        throw err;
    }
};

const addCity = async (name) => {
    try {
        const result = await db.query('INSERT INTO city (name_city) VALUES (?)', [name]);
        return result.insertId;
    } catch (err) {
        console.error('Erro ao adicionar cidade:', err);
        throw err;
    }
};

const updateCity = async (id, name) => {
    try {
        const result = await db.query('UPDATE city SET name_city = ? WHERE idcity = ?', [name, id]);
        return result;
    } catch (err) {
        console.error('Erro ao atualizar cidade:', err);
        throw err;
    }
};

const deleteCity = async (id) => {
    try {
        const result = await db.query('DELETE FROM city WHERE idcity = ?', [id]);
        return result;
    } catch (err) {
        console.error('Erro ao excluir cidade:', err);
        throw err;
    }
};

export default {
    getAllCities,
    getCityById,
    addCity,
    updateCity,
    deleteCity
};
