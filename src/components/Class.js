import React, { Component } from 'react';
import classService from '../services/classService';
import "../styles/classStyle.css";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class Class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', description: '', seeincompany: false },
            notification: { message: '', type: '', showButtons: false, onConfirm: null },
            classes: []
        };
    }

    componentDidMount() {
        this.fetchClasses();
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

    fetchClasses = async () => {
        try {
            const classes = await classService.getClasses();
            this.setState({ classes });
        } catch (error) {
            this.showNotification('Falha ao buscar classes: ' + error.message, 'error');
        }
    };

    handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: type === 'checkbox' ? checked : value
            }
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (this.state.formData.id) {
                await classService.updateClass(this.state.formData.id, this.state.formData);
                this.showNotification('Classe atualizada com sucesso!', 'success');
            } else {
                await classService.addClass(this.state.formData);
                this.showNotification('Classe adicionada com sucesso!', 'success');
            }
            this.fetchClasses();
            this.setState({ formData: { id: '', description: '', seeincompany: false } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleDelete = async (id, description) => {
        this.showNotification(
            `Tem certeza que deseja excluir a classe "${description}"?`,
            'warning',
            true,
            async () => {
                try {
                    await classService.deleteClass(id);
                    this.showNotification('Classe excluída com sucesso!', 'success');
                    this.fetchClasses();
                } catch (error) {
                    this.showNotification('Erro: ' + error.message, 'error');
                }
            }
        );
    };

    render() {
        const { formData, notification, classes } = this.state;
        return (
            <div className="class-container">
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
                <h2 className="title">Classes</h2>
                <form onSubmit={this.handleSubmit} className="class-form">
                    <div className="form-inline">
                        <label htmlFor="classDescription">Descrição: </label>
                        <input
                            type="text"
                            id="classDescription"
                            name="description"
                            placeholder="Digite a descrição da classe"
                            value={formData.description}
                            onChange={this.handleChange}
                            required
                        />
                        <label htmlFor="classSeeInCompany">Ver na empresa: </label>
                        <input
                            type="checkbox"
                            id="classSeeInCompany"
                            name="seeincompany"
                            checked={formData.seeincompany}
                            onChange={this.handleChange}
                        />
                        <button type="submit" className="btn-submit">
                            {formData.id ? 'Atualizar' : 'Adicionar'}
                        </button>
                    </div>
                </form>

                <div className="class-grid">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Descrição</th>
                                <th>Ver na Empresa</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.length > 0 ? (
                                classes.map(cls => (
                                    <tr key={cls.idclasscustomer}>
                                        <td>{cls.idclasscustomer}</td>
                                        <td>{cls.description}</td>
                                        <td>{cls.seeincompany ? 'Sim' : 'Não'}</td>
                                        <td>
                                            <FaEdit
                                                className="action-icon"
                                                onClick={() => this.setState({ formData: { id: cls.idclasscustomer, description: cls.description, seeincompany: cls.seeincompany } })}
                                                title="Editar"
                                            />
                                            <FaTrashAlt
                                                className="action-icon"
                                                onClick={() => this.handleDelete(cls.idclasscustomer, cls.description)}
                                                title="Excluir"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">Nenhuma classe encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Class;
