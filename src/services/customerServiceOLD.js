import axios from 'axios';

const API_URL = 'http://localhost:3001/api/customers';

const getCustomers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.data;
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
};

const addCustomer = async (customer) => {
    const response = await axios.post(API_URL, customer);
    return response.data.id;
};

const updateCustomer = async (id, customer) => {
    const response = await axios.put(`${API_URL}/${id}`, customer);
    return response.data.message;
};

const deleteCustomer = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data.message;
};

export default {
    getCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
