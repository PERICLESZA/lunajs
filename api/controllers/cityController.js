import cityModel from '../models/cityModel.js';
console.log('entrei no citymodel')
export const getAllCities = async (req, res) => {
    try {
        const cities = await cityModel.getAllCities();
        res.json({ success: true, data: cities });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar cidades' });
    }
};

export const getCityById = async (req, res) => {
    try {
        const city = await cityModel.getCityById(req.params.id);
        if (city) {
            res.json(city);
        } else {
            res.status(404).json({ message: 'Cidade não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar cidade' });
    }
};

export const addCity = async (req, res) => {
    try {
        const id = await cityModel.addCity(req.body.name);
        res.status(201).json({ message: 'Cidade adicionada com sucesso', id });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar cidade' });
    }
};

export const updateCity = async (req, res) => {
    try {
        await cityModel.updateCity(req.params.id, req.body.name);
        res.json({ message: 'Cidade atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar cidade' });
    }
};

export const deleteCity = async (req, res) => {
    try {
        await cityModel.deleteCity(req.params.id);
        res.json({ message: 'Cidade excluída com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao excluir cidade' });
    }
};
