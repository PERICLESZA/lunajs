import axios from 'axios';

const API_URL = 'http://localhost:3001/api/classes';

const getClasses = async () => {
    try {
        
        const response = await axios.get(API_URL);
        return response.data.data;

    } catch (error) {
        console.error("Erro ao buscar classes:", error);
        throw error;
    }
};

const addClass = async (cls) => {
    const response = await axios.post(API_URL, { description: cls.description, seeincompany: cls.seeincompany });
    return response.data.id;
};

const updateClass = async (id, cls) => {
    const response = await axios.put(`${API_URL}/${id}`, { description: cls.description, seeincompany: cls.seeincompany });
    return response.data.message;
};

const deleteClass = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
};

export default {
    getClasses,
    addClass,
    updateClass,
    deleteClass
};
