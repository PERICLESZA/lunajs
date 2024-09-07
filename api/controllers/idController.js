import idModel from '../models/idModel.js';

export const getAllIdentifications = async (req, res) => {
    try {
        const identifications = await idModel.getAllIdentifications();
        res.json({ success: true, data: identifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar identificações' });
    }
};

export const getIdentificationById = async (req, res) => {
    try {
        const identification = await idModel.getIdentificationById(req.params.id);
        if (identification) {
            res.json(identification);
        } else {
            res.status(404).json({ message: 'Identificação não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar identificação' });
    }
};

export const addIdentification = async (req, res) => {
    try {
        const id = await idModel.addIdentification(req.body.name);
        res.status(201).json({ message: 'Identificação adicionada com sucesso', id });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar identificação' });
    }
};

export const updateIdentification = async (req, res) => {
    try {
        await idModel.updateIdentification(req.params.id, req.body.name);
        res.json({ message: 'Identificação atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar identificação' });
    }
};

export const deleteIdentification = async (req, res) => {
    try {
        await idModel.deleteIdentification(req.params.id);
        res.json({ message: 'Identificação excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir identificação' });
    }
};
