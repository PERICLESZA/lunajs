import axios from 'axios';

const API_URL = 'http://localhost:3001/api/logins';

const getLogins = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar logins:", error);
        throw error;
    }
};

const addLogin = async (login) => {
    const response = await axios.post(API_URL, login);
    return response.data.id;
};

const updateLogin = async (id, login) => {
    const response = await axios.put(`${API_URL}/${id}`, login);
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
