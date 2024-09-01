import customerModel from '../models/customerModel.js'; // Certifique-se de que a exportação padrão está correta no model

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await customerModel.getAllCustomers();
    res.json({ success: true, data: customers });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar clientes' });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await customerModel.getCustomerById(req.params.id);
    if (customer) {
      res.json({ success: true, data: customer });
    } else {
      res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar cliente' });
  }
};

export const addCustomer = async (req, res) => {
  try {
    const id = await customerModel.addCustomer(req.body);
    res.status(201).json({ success: true, message: 'Cliente criado', id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao criar cliente' });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const affectedRows = await customerModel.updateCustomer(req.params.id, req.body);
    if (affectedRows > 0) {
      res.json({ success: true, message: 'Cliente atualizado' });
    } else {
      res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar cliente' });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const affectedRows = await customerModel.deleteCustomer(req.params.id);
    if (affectedRows > 0) {
      res.json({ success: true, message: 'Cliente excluído' });
    } else {
      res.status(404).json({ success: false, message: 'Cliente não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao excluir cliente' });
  }
};
