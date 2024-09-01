import React, { Component } from 'react';
import cityService from '../services/cityService';
import "../styles/cityStyle.css";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', name: '' },
            notification: { message: '', type: '', showButtons: false, onConfirm: null },
            cities: []
        };
    }

    componentDidMount() {
        this.fetchCities();
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

    fetchCities = async () => {
        try {
            const cities = await cityService.getCities();
            this.setState({ cities });
        } catch (error) {
            this.showNotification('Falha ao buscar cidades: ' + error.message, 'error');
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
                await cityService.updateCity(this.state.formData.id, this.state.formData);
                this.showNotification('Cidade atualizada com sucesso!', 'success');
            } else {
                await cityService.addCity(this.state.formData);
                this.showNotification('Cidade adicionada com sucesso!', 'success');
            }
            this.fetchCities();
            this.setState({ formData: { id: '', name: '' } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleDelete = async (id, name) => {
        this.showNotification(
            `Tem certeza que deseja excluir a cidade "${name}"?`,
            'warning',
            true,
            async () => {
                try {
                    await cityService.deleteCity(id);
                    this.showNotification('Cidade excluída com sucesso!', 'success');
                    this.fetchCities();
                } catch (error) {
                    this.showNotification('Erro: ' + error.message, 'error');
                }
            }
        );
    };

    render() {
        const { formData, notification, cities } = this.state;
        return (
            <div className="city-container">
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
                <h2 className="title">Cities</h2>
                <form onSubmit={this.handleSubmit} className="city-form">
                    <div className="form-inline">
                        <label htmlFor="cityName">Cidade: </label>
                        <input
                            type="text"
                            id="cityName"
                            name="name"
                            placeholder="Digite o nome da cidade"
                            value={formData.name}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit" className="btn-submit">
                            {formData.id ? 'Atualizar' : 'Adicionar'}
                        </button>
                    </div>
                </form>

                <div className="city-grid">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cities.length > 0 ? (
                                cities.map(city => (
                                    <tr key={city.idcity}>
                                        <td>{city.idcity}</td>
                                        <td>{city.name_city}</td>
                                        <td>
                                            <FaEdit 
                                                className="action-icon" 
                                                onClick={() => this.setState({ formData: { id: city.idcity, name: city.name_city } })} 
                                                title="Editar" 
                                            />
                                            <FaTrashAlt 
                                                className="action-icon" 
                                                onClick={() => this.handleDelete(city.idcity, city.name_city)} 
                                                title="Excluir" 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Nenhuma cidade encontrada.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default City;
