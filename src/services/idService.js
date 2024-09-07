import axios from 'axios';

const API_URL = 'http://localhost:3001/api/identifications';

const getAllIdentifications = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar identificações:", error);
        throw error;
    }
};

const getIdentificationById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Erro ao buscar a identificação com id ${id}:`, error);
        throw error;
    }
};

const addIdentification = async (identification) => {
    const response = await axios.post(API_URL, { name: identification.nameidentification });
    return response.data.id;
};

const updateIdentification = async (id, identification) => {
    const response = await axios.put(`${API_URL}/${id}`, { name: identification.nameidentification });
    return response.data.message;
};

const deleteIdentification = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
};

export default {
    getAllIdentifications,
    getIdentificationById,
    addIdentification,
    updateIdentification,
    deleteIdentification
};
