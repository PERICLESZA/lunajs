import countryModel from '../models/countryModel.js';

export const getAllCountries = async (req, res) => {
  try {
    const countries = await countryModel.getAllCountries();
    res.json({ success: true, data: countries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao buscar países' });
  }
};

export const getCountryById = async (req, res) => {
  try {
    const country = await countryModel.getCountryById(req.params.id);
    if (country) {
      res.json(country);
    } else {
      res.status(404).json({ message: 'País não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar país' });
  }
};

export const addCountry = async (req, res) => {
  try {
    const id = await countryModel.addCountry(req.body.name);
    res.json({ success: true, id });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao adicionar país' });
  }
};

export const updateCountry = async (req, res) => {
  try {
    await countryModel.updateCountry(req.params.id, req.body.name);
    res.json({ success: true, message: 'País atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao atualizar país' });
  }
};

export const deleteCountry = async (req, res) => {
  try {
    await countryModel.deleteCountry(req.params.id);
    res.json({ success: true, message: 'País excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao excluir país' });
  }
};
