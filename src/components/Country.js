import React, { Component } from 'react';
import countryService from '../services/countryService';
import "../styles/countryStyle.css";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

class Country extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', name: '' },
            notification: { message: '', type: '', showButtons: false, onConfirm: null },
            countries: []
        };
    }

    componentDidMount() {
        this.fetchCountries();
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

    fetchCountries = async () => {
        try {
            const countries = await countryService.getCountries();
            this.setState({ countries });
        } catch (error) {
            this.showNotification('Falha ao buscar países: ' + error.message, 'error');
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
                await countryService.updateCountry(this.state.formData.id, this.state.formData);
                this.showNotification('País atualizado com sucesso!', 'success');
            } else {
                await countryService.addCountry(this.state.formData);
                this.showNotification('País adicionado com sucesso!', 'success');
            }
            this.fetchCountries();
            this.setState({ formData: { id: '', name: '' } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleDelete = async (id, name) => {
        this.showNotification(
            `Tem certeza que deseja excluir o país "${name}"?`,
            'warning',
            true,
            async () => {
                try {
                    await countryService.deleteCountry(id);
                    this.showNotification('País excluído com sucesso!', 'success');
                    this.fetchCountries();
                } catch (error) {
                    this.showNotification('Erro: ' + error.message, 'error');
                }
            }
        );
    };

    render() {
        const { formData, notification, countries } = this.state;
        return (
            <div className="country-container">
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
                <h2 className="title">Countries</h2>
                <form onSubmit={this.handleSubmit} className="country-form">
                    <div className="form-inline">
                        <label htmlFor="countryName">País: </label>
                        <input
                            type="text"
                            id="countryName"
                            name="name"
                            placeholder="Digite o nome do país"
                            value={formData.name}
                            onChange={this.handleChange}
                            required
                        />
                        <button type="submit" className="btn-submit">
                            {formData.id ? 'Atualizar' : 'Adicionar'}
                        </button>
                    </div>
                </form>

                <div className="country-grid">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {countries.length > 0 ? (
                                countries.map(country => (
                                    <tr key={country.idcountry}>
                                        <td>{country.idcountry}</td>
                                        <td>{country.namecountry}</td>
                                        <td>
                                            <FaEdit 
                                                className="action-icon" 
                                                onClick={() => this.setState({ formData: { id: country.idcountry, name: country.namecountry } })} 
                                                title="Editar" 
                                            />
                                            <FaTrashAlt 
                                                className="action-icon" 
                                                onClick={() => this.handleDelete(country.idcountry, country.namecountry)} 
                                                title="Excluir" 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3">Nenhum país encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Country;
