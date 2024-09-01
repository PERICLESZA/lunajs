import axios from 'axios';

const API_URL = 'http://localhost:3001/api/countries';

const getCountries = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar países:", error);
    throw error;
  }
};

const addCountry = async (country) => {
    const response = await axios.post(API_URL, { name: country.name });
    return response.data.id;
};

const updateCountry = async (id, country) => {
    const response = await axios.put(`${API_URL}/${id}`, { name: country.name });
    return response.data.message;
};

const deleteCountry = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
};

export default {
    getCountries,
    addCountry,
    updateCountry,
    deleteCountry
};
