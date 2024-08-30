import React, { Component } from 'react';
import bankService from '../services/bankService';
import "../styles/bankStyle.css";

class Bank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', name: '' },
            notification: { message: '', type: '' },
            banks: []
        };
    }

    componentDidMount() {
        this.fetchBanks();
    }

    fetchBanks = async () => {
        try {
            const banks = await bankService.getBanks();
            this.setState({ banks });
        } catch (error) {
            this.setState({ notification: { message: 'Falha ao buscar banco BankJS: ' + error.message, type: 'error' } });
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
                await bankService.updateBank(this.state.formData.id, this.state.formData);
                this.setState({ notification: { message: 'Banco atualizado com sucesso!', type: 'success' } });
            } else {
                await bankService.addBank(this.state.formData);
                this.setState({ notification: { message: 'Banco adicionado com sucesso!', type: 'success' } });
            }
            this.fetchBanks(); 
        } catch (error) {
            this.setState({ notification: { message: 'Ocorreu um erro: ' + error.message, type: 'error' } });
        }
    };

    handleDelete = async (id) => {
        try {
            await bankService.deleteBank(id);
            this.setState({ notification: { message: 'Banco excluído com sucesso!', type: 'success' } });
            this.fetchBanks();
        } catch (error) {
            this.setState({ notification: { message: 'Ocorreu um erro: ' + error.message, type: 'error' } });
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
                <h2>Gestão de Bancos</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="bankName">Nome do Banco</label>
                        <input
                            type="text"
                            id="bankName"
                            name="name"
                            placeholder="Digite o nome do banco"
                            value={formData.name}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <button type="submit">
                        {formData.id ? 'Atualizar' : 'Adicionar'}
                    </button>
                </form>
                <ul>
                    {banks.map(bank => (
                        <li key={bank.id}>
                            {bank.name}
                            <button onClick={() => this.handleDelete(bank.id)}>Excluir</button>
                            <button onClick={() => this.setState({ formData: bank })}>Editar</button>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Bank;
