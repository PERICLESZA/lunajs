import classModel from '../models/classModel.js';


export const getAllClasses = async (req, res) => {
    try {
        const classes = await classModel.getAllClasses();
        res.status(200).json({ data: classes });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar classes' });
    }
};

export const getClassById = async (req, res) => {
    const id = req.params.id;
    try {
        const cls = await classModel.getClassById(id);
        if (!cls) {
            return res.status(404).json({ error: 'Classe não encontrada' });
        }
        res.status(200).json({ data: cls });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar classe' });
    }
};

export const addClass = async (req, res) => {
    const { description, seeincompany } = req.body;
    try {
        const id = await classModel.addClass(description, seeincompany);
        res.status(201).json({ id });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao adicionar classe' });
    }
};

export const updateClass = async (req, res) => {
    const id = req.params.id;
    const { description, seeincompany } = req.body;
    try {
        const result = await classModel.updateClass(id, description, seeincompany);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Classe não encontrada' });
        }
        res.status(200).json({ message: 'Classe atualizada com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar classe' });
    }
};

export const deleteClass = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await classModel.deleteClass(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Classe não encontrada' });
        }
        res.status(200).json({ message: 'Classe excluída com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao excluir classe' });
    }
};
