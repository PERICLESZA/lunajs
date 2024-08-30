import axios from 'axios';

const API_URL = 'http://localhost:3001/api/logins';

const getLogins = async () => {
  try {
    const response = await axios.get(API_URL);
    // alert("Resposta da API:", response.data.data); // Verifique a estrutura aqui
    return response.data.data; // Ajuste o caminho conforme a estrutura da resposta
  } catch (error) {
    console.error("Erro ao buscar logins:", error);
    throw error;
  }
};

const addLogin = async (login) => {
    const response = await axios.post(API_URL, { name: login.name });
    return response.data.id;
};

const updateLogin = async (id, login) => {
    const response = await axios.put(`${API_URL}/${id}`, { name: login.name });
    return response.data.message;
};

const deleteLogin = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
};

export default {
    getLogins,
    addLogin,
    updateLogin,
    deleteLogin
};
