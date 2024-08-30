import cadLoginModel from '../models/cadLoginModels.js';

export const getAllLogins = async (req, res) => {
    try {
        const logins = await cadLoginModel.getAllLogins();
        res.json({ success: true, data: logins });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar logins' });
    }
};

export const getLoginById = async (req, res) => {
    try {
        const login = await cadLoginModel.getLoginById(req.params.id);
        if (login) {
            res.json({ success: true, data: login });
        } else {
            res.status(404).json({ success: false, message: 'Login não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar login' });
    }
};

export const addLogin = async (req, res) => {
    try {
        const id = await cadLoginModel.addLogin(req.body);
        res.json({ success: true, id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao adicionar login' });
    }
};

export const updateLogin = async (req, res) => {
    try {
        const affectedRows = await cadLoginModel.updateLogin(req.params.id, req.body);
        if (affectedRows > 0) {
            res.json({ success: true, message: 'Login atualizado com sucesso' });
        } else {
            res.status(404).json({ success: false, message: 'Login não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar login' });
    }
};

export const deleteLogin = async (req, res) => {
    try {
        const affectedRows = await cadLoginModel.deleteLogin(req.params.id);
        if (affectedRows > 0) {
            res.json({ success: true, message: 'Login excluído com sucesso' });
        } else {
            res.status(404).json({ success: false, message: 'Login não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao excluir login' });
    }
};
