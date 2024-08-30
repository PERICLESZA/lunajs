import axios from 'axios';

const API_URL = 'http://localhost:3001/api/banks'; // Atualize o URL conforme necessário

const getBanks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    throw new Error('Erro banco bankService: ' + error.message);
  }
};

const addBank = async (bankData) => {
  try {
    const response = await axios.post(API_URL, bankData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao adicionar banco: ' + error.message);
  }
};

const updateBank = async (id, bankData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, bankData);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao atualizar banco: ' + error.message);
  }
};

const deleteBank = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Erro ao excluir banco: ' + error.message);
  }
};

export default {
  getBanks,
  addBank,
  updateBank,
  deleteBank,
};
