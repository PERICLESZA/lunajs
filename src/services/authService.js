import axios from 'axios';

const API_URL = 'http://localhost:3001/api/logins'; // Atualize o URL para apontar para a rota correta

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export default {
  login,
};
