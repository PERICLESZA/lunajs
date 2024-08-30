import React, { Component } from 'react';
import cadLoginService from '../services/cadLoginService';
import "../styles/bankStyle.css"; // Reutilizando o estilo de Bank
import "../styles/loginStyle.css"; // Reutilizando o estilo de Bank
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class CadLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', active: '', email: '', login: '', nome: '', perfil: '', senha: '' },
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
            }, 3000);
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
            const logins = await cadLoginService.getLogins();
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
                await cadLoginService.updateLogin(this.state.formData.id, this.state.formData);
                this.showNotification('Login atualizado com sucesso!', 'success');
            } else {
                await cadLoginService.addLogin(this.state.formData);
                this.showNotification('Login adicionado com sucesso!', 'success');
            }
            this.fetchLogins();
            this.setState({ formData: { id: '', active: '', email: '', login: '', nome: '', perfil: '', senha: '' } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleDelete = async (id, login) => {
        this.showNotification(
            `Tem certeza que deseja excluir o login "${login}"?`,
            'warning',
            true,
            async () => {
                try {
                    await cadLoginService.deleteLogin(id);
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
                <h2 className="title">Logins Register</h2>
                <form onSubmit={this.handleSubmit} className="bank-form">
                    <div className="form-inline">
                        <div className="form-group">
                            <input
                                type="text"
                                id="loginName"
                                name="nome"
                                placeholder=" "
                                value={formData.nome}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="loginName">Nome</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="loginEmail"
                                name="email"
                                placeholder=" "
                                value={formData.email}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="loginEmail">Email</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="loginLogin"
                                name="login"
                                placeholder=" "
                                value={formData.login}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="loginLogin">Login</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="loginPerfil"
                                name="perfil"
                                placeholder=" "
                                value={formData.perfil}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="loginPerfil">Perfil</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="loginSenha"
                                name="senha"
                                placeholder=" "
                                value={formData.senha}
                                onChange={this.handleChange}
                                required
                            />
                            <label htmlFor="loginSenha">Senha</label>
                        </div>
                        <div className="form-group">
                            <input
                                type="checkbox"
                                id="loginActive"
                                name="active"
                                checked={formData.active}
                                onChange={(e) => this.setState({ formData: { ...formData, active: e.target.checked } })}
                            />
                            <label htmlFor="loginActive">Ativo</label>
                        </div>
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
                                <th>Email</th>
                                <th>Login</th>
                                <th>Perfil</th>
                                <th>Ativo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logins.length > 0 ? (
                                logins.map(login => (
                                    <tr key={login.idlogin}>
                                        <td>{login.idlogin}</td>
                                        <td>{login.nome}</td>
                                        <td>{login.email}</td>
                                        <td>{login.login}</td>
                                        <td>{login.perfil}</td>
                                        <td>{login.active ? 'Sim' : 'Não'}</td>
                                        <td>
                                            <FaEdit 
                                                className="action-icon" 
                                                onClick={() => this.setState({ formData: { id: login.idlogin, active: login.active, email: login.email, login: login.login, nome: login.nome, perfil: login.perfil, senha: login.senha } })} 
                                                title="Editar" 
                                            />
                                            <FaTrashAlt 
                                                className="action-icon" 
                                                onClick={() => this.handleDelete(login.idlogin, login.login)} 
                                                title="Excluir" 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">Nenhum login encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CadLogin;
