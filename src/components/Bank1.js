import React, { Component } from 'react';
import axios from 'axios';
import "../styles/bankStyle.css";

class Bank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', name: '' },
            notification: { message: '', type: '' },
            banks: [] // Adicionando uma lista de bancos para exibição
        };
    }

    componentDidMount() {
        this.fetchBanks();
    }

    fetchBanks = async () => {
        try {
            const response = await axios.get('/api/banks');
            this.setState({ banks: response.data });
        } catch (error) {
            this.setState({ notification: { message: 'Failed to fetch banks', type: 'error' } });
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            formData: { ...this.state.formData, [name]: value }
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (this.state.formData.id) {
                // Editar
                await axios.put(`/api/banks/${this.state.formData.id}`, this.state.formData);
                this.setState({ notification: { message: 'Bank updated successfully!', type: 'success' } });
            } else {
                // Adicionar
                await axios.post('/api/banks', this.state.formData);
                this.setState({ notification: { message: 'Bank added successfully!', type: 'success' } });
            }
            this.fetchBanks(); // Atualizar a lista de bancos
        } catch (error) {
            this.setState({ notification: { message: 'An error occurred!', type: 'error' } });
        }
    };

    handleDelete = async (id) => {
        try {
            await axios.delete(`/api/banks/${id}`);
            this.setState({ notification: { message: 'Bank deleted successfully!', type: 'success' } });
            this.fetchBanks(); // Atualizar a lista de bancos
        } catch (error) {
            this.setState({ notification: { message: 'An error occurred!', type: 'error' } });
        }
    };

    render() {
        const { formData, notification, banks } = this.state;

        return (
            <div className="bank-container">
                {notification.message && (
                    <div className={`notification ${notification.type === 'error' ? 'error' : 'success'}`}>
                        {notification.message}
                    </div>
                )}
                <h2>Bank Management</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bankName">Bank Name</label>
                        <input
                            type="text"
                            id="bankName"
                            name="name"
                            placeholder="Enter bank name"
                            value={formData.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit">
                        {formData.id ? 'Update' : 'Add'}
                    </button>
                </form>
                <ul>
                    {banks.map(bank => (
                        <li key={bank.id}>
                            {bank.name}
                            <button onClick={() => this.handleDelete(bank.id)}>Delete</button>
                            <button onClick={() => this.setState({ formData: bank })}>Edit</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Bank;
