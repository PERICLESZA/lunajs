import db from '../config/db.js';

const getAllIdentifications = async () => {
    try {
        const [rows] = await db.query('SELECT * FROM identification');
        return rows;
    } catch (err) {
        console.error('Erro ao buscar identificações:', err);
        throw err;
    }
};

const getIdentificationById = async (id) => {
    try {
        const [rows] = await db.query('SELECT * FROM identification WHERE ididentification = ?', [id]);
        return rows[0];
    } catch (err) {
        console.error('Erro ao buscar identificação por ID:', err);
        throw err;
    }
};

const addIdentification = async (name) => {
    try {
        const result = await db.query('INSERT INTO identification (nameidentification) VALUES (?)', [name]);
        return result.insertId;
    } catch (err) {
        console.error('Erro ao adicionar identificação:', err);
        throw err;
    }
};

const updateIdentification = async (id, name) => {
    try {
        const result = await db.query('UPDATE identification SET nameidentification = ? WHERE ididentification = ?', [name, id]);
        return result;
    } catch (err) {
        console.error('Erro ao atualizar identificação:', err);
        throw err;
    }
};

const deleteIdentification = async (id) => {
    try {
        const result = await db.query('DELETE FROM identification WHERE ididentification = ?', [id]);
        return result;
    } catch (err) {
        console.error('Erro ao excluir identificação:', err);
        throw err;
    }
};

export default {
    getAllIdentifications,
    getIdentificationById,
    addIdentification,
    updateIdentification,
    deleteIdentification
};
