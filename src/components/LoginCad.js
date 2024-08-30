import React, { Component } from 'react';
import loginService from '../services/loginService'; // Adaptar o nome do serviço também
import "../styles/loginStyle.css"; // Adaptar o nome da folha de estilo
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class LoginCad extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', name: '' },
            notification: { message: '', type: '', showButtons: false, onConfirm: null },
            logins: []
        };
    }

    componentDidMount() {
        this.fetchLogins();
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

    fetchLogins = async () => {
        try {
            const logins = await loginService.getLogins(); // Adaptar o método no serviço
            this.setState({ logins });
        } catch (error) {
            this.showNotification('Falha ao buscar logins: ' + error.message, 'error');
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
                await loginService.updateLogin(this.state.formData.id, this.state.formData); // Adaptar o método no serviço
                this.showNotification('Login atualizado com sucesso!', 'success');
            } else {
                await loginService.addLogin(this.state.formData); // Adaptar o método no serviço
                this.showNotification('Login adicionado com sucesso!', 'success');
            }
            this.fetchLogins();
            this.setState({ formData: { id: '', name: '' } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleDelete = async (id, name) => {
        this.showNotification(
            `Tem certeza que deseja excluir o login "${name}"?`,
            'warning',
            true,
            async () => {
                try {
                    await loginService.deleteLogin(id); // Adaptar o método no serviço
                    this.showNotification('Login excluído com sucesso!', 'success');
                    this.fetchLogins();
                } catch (error) {
                    this.showNotification('Erro: ' + error.message, 'error');
                }
            }
        );
    };

    render() {
        const { formData, notification, logins } = this.state;
        return (
            <div className="login-container">
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
                <h2 className="title">Logins</h2>
                <form onSubmit={this.handleSubmit} className="login-form">
                    <div className="form-inline">
                        <label htmlFor="loginName">Login: </label>
                        <input
                            type="text"
                            id="loginName"
                            name="name"
                            placeholder="Digite o nome do login"
                            value={formData.name}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit" className="btn-submit">
                            {formData.id ? 'Atualizar' : 'Adicionar'}
                        </button>
                    </div>
                </form>

                <div className="login-grid">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logins.length > 0 ? (
                                logins.map(login => (
                                    <tr key={login.idlogin}>
                                        <td>{login.idlogin}</td>
                                        <td>{login.namelogin}</td>
                                        <td>
                                            <FaEdit 
                                                className="action-icon" 
                                                onClick={() => this.setState({ formData: { id: login.idlogin, name: login.namelogin } })} 
                                                title="Editar" 
                                            />
                                            <FaTrashAlt 
                                                className="action-icon" 
                                                onClick={() => this.handleDelete(login.idlogin, login.namelogin)} 
                                                title="Excluir" 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Nenhum login encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default LoginCad;
