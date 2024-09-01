import db from '../config/db.js';

const getAllClasses = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM classcustomer');
        return rows;
    } catch (err) {
        console.error('Erro ao buscar classes:', err);
        throw err;
    }
};

const getClassById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM classcustomer WHERE idclasscustomer = ?', [id]);
        return rows[0];
    } catch (err) {
        console.error('Erro ao buscar classe por ID:', err);
        throw err;
    }
};

const addClass = async (description, seeincompany) => {
    try {
        const result = await db.query('INSERT INTO classcustomer (description, seeincompany) VALUES (?, ?)', [description, seeincompany]);
        return result.insertId;
    } catch (err) {
        console.error('Erro ao adicionar classe:', err);
        throw err;
    }
};

const updateClass = async (id, description, seeincompany) => {
    try {
        const result = await db.query('UPDATE classcustomer SET description = ?, seeincompany = ? WHERE idclasscustomer = ?', [description, seeincompany, id]);
        return result;
    } catch (err) {
        console.error('Erro ao atualizar classe:', err);
        throw err;
    }
};

const deleteClass = async (id) => {
    try {
        const result = await db.query('DELETE FROM classcustomer WHERE idclasscustomer = ?', [id]);
        return result;
    } catch (err) {
        console.error('Erro ao excluir classe:', err);
        throw err;
    }
};

export default {
    getAllClasses,
    getClassById,
    addClass,
    updateClass,
    deleteClass
};
