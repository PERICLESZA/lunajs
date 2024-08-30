import bankModel from '../models/bankModel.js'; // Certifique-se de que a exportação padrão está correta no model

export const getAllBanks = async (req, res) => {
  try {
    const banks = await bankModel.getAllBanks();
    res.json({ success: true, data: banks });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar bancos' });
  }
};

export const getBankById = async (req, res) => {
  try {
    const bank = await bankModel.getBankById(req.params.id);
    if (bank) {
      res.json(bank);
    } else {
      res.status(404).json({ message: 'Banco não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar banco' });
  }
};

export const addBank = async (req, res) => {
  try {
    const id = await bankModel.addBank(req.body.name);
    res.status(201).json({ message: 'Banco criado', id });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar banco' });
  }
};

export const updateBank = async (req, res) => {
  try {
    await bankModel.updateBank(req.params.id, req.body.name);
    res.json({ message: 'Banco atualizado' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar banco' });
  }
};

export const deleteBank = async (req, res) => {
  try {
    await bankModel.deleteBank(req.params.id);
    res.json({ message: 'Banco excluído' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir banco' });
  }
};
