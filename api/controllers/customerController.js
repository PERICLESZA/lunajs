import customerModel from '../models/customerModels.js';

export const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerModel.getAllCustomers();
        res.json({ success: true, data: customers });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar customers' });
    }
};

export const getCustomerById = async (req, res) => {
    try {
        const customer = await customerModel.getCustomerById(req.params.id);
        if (customer) {
            res.json({ success: true, data: customer });
        } else {
            res.status(404).json({ success: false, message: 'Customer não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao buscar customer' });
    }
};

export const addCustomer = async (req, res) => {
    try {
        const id = await customerModel.addCustomer(req.body);
        res.json({ success: true, id });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao adicionar customer' });
    }
};

export const updateCustomer = async (req, res) => {
    try {
        const affectedRows = await customerModel.updateCustomer(req.params.id, req.body);
        if (affectedRows > 0) {
            res.json({ success: true, message: 'Customer atualizado com sucesso' });
        } else {
            res.status(404).json({ success: false, message: 'Customer não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao atualizar customer' });
    }
};

export const deleteCustomer = async (req, res) => {
    try {
        const affectedRows = await customerModel.deleteCustomer(req.params.id);
        if (affectedRows > 0) {
            res.json({ success: true, message: 'Customer deletado com sucesso' });
        } else {
            res.status(404).json({ success: false, message: 'Customer não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Erro ao deletar customer' });
    }
};
