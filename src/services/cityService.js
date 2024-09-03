import axios from 'axios';

const API_URL = 'http://localhost:3001/api/cities';

const getAllCities = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar cidades:", error);
        throw error;
    }
};

const getCityById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Erro ao buscar a cidade com id ${id}:`, error);
        throw error;
    }
};

const addCity = async (city) => {
    const response = await axios.post(API_URL, { name: city.name });
    return response.data.id;
};

const updateCity = async (id, city) => {
    const response = await axios.put(`${API_URL}/${id}`, { name: city.name });
    return response.data.message;
};

const deleteCity = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
};

export default {
    getAllCities,
    getCityById,
    addCity,
    updateCity,
    deleteCity
};
