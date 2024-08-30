import React, { Component } from 'react';
import bankService from '../services/bankService';
import "../styles/bankStyle.css";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class Bank extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', name: '' },
            notification: { message: '', type: '', showButtons: false, onConfirm: null },
            banks: []
        };
    }

    componentDidMount() {
        this.fetchBanks();
    }

    componentWillUnmount() {
        this.clearNotificationTimeout();
    }

    clearNotificationTimeout = () => {
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
        }
    };

    showNotification = (message, type, showButtons = false, onConfirm = null) => {
        this.clearNotificationTimeout();
        this.setState({ notification: { message, type, showButtons, onConfirm } });

        if (!showButtons) {
            this.notificationTimeout = setTimeout(() => {
                this.setState({ notification: { message: '', type: '', showButtons: false, onConfirm: null } });
            }, 3000); // A notificação desaparecerá após 3 segundos
        }
    };

    handleConfirm = () => {
        const { onConfirm } = this.state.notification;
        if (onConfirm) onConfirm();
        this.setState({ notification: { message: '', type: '', showButtons: false, onConfirm: null } });
    };

    handleCancel = () => {
        this.setState({ notification: { message: '', type: '', showButtons: false, onConfirm: null } });
    };

    fetchBanks = async () => {
        try {
            const banks = await bankService.getBanks();
            this.setState({ banks });
        } catch (error) {
            this.showNotification('Falha ao buscar bancos: ' + error.message, 'error');
        }
    };

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
                this.showNotification('Banco atualizado com sucesso!', 'success');
            } else {
                await bankService.addBank(this.state.formData);
                this.showNotification('Banco adicionado com sucesso!', 'success');
            }
            this.fetchBanks();
            this.setState({ formData: { id: '', name: '' } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleDelete = async (id, name) => {
        this.showNotification(
            `Tem certeza que deseja excluir o banco "${name}"?`,
            'warning',
            true,
            async () => {
                try {
                    await bankService.deleteBank(id);
                    this.showNotification('Banco excluído com sucesso!', 'success');
                    this.fetchBanks();
                } catch (error) {
                    this.showNotification('Erro: ' + error.message, 'error');
                }
            }
        );
    };

    render() {
        const { formData, notification, banks } = this.state;
        return (
            <div className="bank-container">
                {notification.message && (
                    <div className={`notification ${notification.type}`}>
                        {notification.message}
                        {notification.showButtons && (
                            <div className="notification-buttons">
                                <button onClick={this.handleConfirm} className="btn-confirm">Sim</button>
                                <button onClick={this.handleCancel} className="btn-cancel">Não</button>
                            </div>
                        )}
                    </div>
                )}
                <h2 className="title">Banks</h2>
                <form onSubmit={this.handleSubmit} className="bank-form">
                    <div className="form-inline">
                        <label htmlFor="bankName">Banco: </label>
                        <input
                            type="text"
                            id="bankName"
                            name="name"
                            placeholder="Digite o nome do banco"
                            value={formData.name}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit" className="btn-submit">
                            {formData.id ? 'Atualizar' : 'Adicionar'}
                        </button>
                    </div>
                </form>

                <div className="bank-grid">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banks.length > 0 ? (
                                banks.map(bank => (
                                    <tr key={bank.idbank}>
                                        <td>{bank.idbank}</td>
                                        <td>{bank.namebank}</td>
                                        <td>
                                            <FaEdit 
                                                className="action-icon" 
                                                onClick={() => this.setState({ formData: { id: bank.idbank, name: bank.namebank } })} 
                                                title="Editar" 
                                            />
                                            <FaTrashAlt 
                                                className="action-icon" 
                                                onClick={() => this.handleDelete(bank.idbank, bank.namebank)} 
                                                title="Excluir" 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Nenhum banco encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Bank;
