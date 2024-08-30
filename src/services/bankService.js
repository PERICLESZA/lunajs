import axios from 'axios';

const API_URL = 'http://localhost:3001/api/banks';

// const getBanks = async () => {
//     // alert('entrei o bankService/getBanks')
//     const response = await axios.get(API_URL);
//     alert("bankService: ")
//     return response.data.data; // Ajuste para acessar os dados corretamente
// };

const getBanks = async () => {
  try {
    const response = await axios.get(API_URL);
    // alert("Resposta da API:", response.data.data); // Verifique a estrutura aqui
    return response.data.data; // Ajuste o caminho conforme a estrutura da resposta
  } catch (error) {
    console.error("Erro ao buscar bancos:", error);
    throw error;
  }
};

const addBank = async (bank) => {
    const response = await axios.post(API_URL, { name: bank.name });
    return response.data.id;
};

const updateBank = async (id, bank) => {
    const response = await axios.put(`${API_URL}/${id}`, { name: bank.name });
    return response.data.message;
};

const deleteBank = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
};

export default {
    getBanks,
    addBank,
    updateBank,
    deleteBank
};
