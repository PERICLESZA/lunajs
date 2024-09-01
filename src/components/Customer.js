import React, { Component } from 'react';
import customerService from '../services/customerService'; // Adaptar o nome do serviço
import "../styles/customerStyle.css"; // Adaptar o nome da folha de estilo
import { FaEdit, FaTrashAlt, FaPlus } from 'react-icons/fa';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                id: '',
                fk_idcity: '',
                fk_ididentification: '',
                fk_idcustomer: '',
                fk_idclasscustomer: '',
                fk_idcountry: '',
                typecustomer: '',
                name: '',
                address: '',
                phone: '',
                phone2: '',
                zipcode: '',
                state: '',
                email: '',
                dtbirth: '',
                numidentification: '',
                comissionpercent: '',
                attention: '',
                picture_path: '',
                active: '',
                restriction: ''
            },
            notification: { message: '', type: '', showButtons: false, onConfirm: null },
            customers: []
        };
    }

    componentDidMount() {
        this.fetchCustomers();
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

    fetchCustomers = async () => {
        try {
            const customers = await customerService.getCustomers();
            this.setState({ customers });
        } catch (error) {
            this.showNotification('Falha ao buscar clientes: ' + error.message, 'error');
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
                await customerService.updateCustomer(this.state.formData.id, this.state.formData);
                this.showNotification('Cliente atualizado com sucesso!', 'success');
            } else {
                await customerService.addCustomer(this.state.formData);
                this.showNotification('Cliente adicionado com sucesso!', 'success');
            }
            this.fetchCustomers();
            this.setState({ formData: { id: '', fk_idcity: '', fk_ididentification: '', fk_idcustomer: '', fk_idclasscustomer: '', fk_idcountry: '', typecustomer: '', name: '', address: '', phone: '', phone2: '', zipcode: '', state: '', email: '', dtbirth: '', numidentification: '', comissionpercent: '', attention: '', picture_path: '', active: '', restriction: '' } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleDelete = async (id, name) => {
        this.showNotification(
            `Tem certeza que deseja excluir o cliente "${name}"?`,
            'warning',
            true,
            async () => {
                try {
                    await customerService.deleteCustomer(id);
                    this.showNotification('Cliente excluído com sucesso!', 'success');
                    this.fetchCustomers();
                } catch (error) {
                    this.showNotification('Erro: ' + error.message, 'error');
                }
            }
        );
    };
    render() {
        const formatDate = (dateString) => {
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('pt-BR', options);
        };

        const { formData, notification, customers } = this.state;
        return (
            <div className="customer-container">
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
                <h2 className="title">Clientes</h2>
                <form onSubmit={this.handleSubmit} className="customer-form">
                    <div className="form-inline">
                        <label htmlFor="customerName">Nome: </label>
                        <input
                            type="text"
                            id="customerName"
                            name="name"
                            placeholder="Digite o nome do cliente"
                            value={formData.name}
                            onChange={this.handleChange}
                            required
                        />
                        {/* Adicione outros campos conforme necessário */}
                        <button type="submit" className="btn-submit">
                            {formData.id ? 'Atualizar' : 'Adicionar'}
                        </button>
                    </div>
                </form>

                <div className="customer-grid">
                    <div className="grid-header">
                        <FaPlus className="action-icon" 
                        onClick={() => this.setState({ 
                            formData: { 
                                        id: '', 
                                        fk_idcity: '', 
                                        fk_ididentification: '', 
                                        fk_idcustomer: '', 
                                        fk_idclasscustomer: '', 
                                        fk_idcountry: '', 
                                        typecustomer: '', 
                                        name: '', 
                                        address: '', 
                                        phone: '', 
                                        // phone2: '', 
                                        zipcode: '', 
                                        state: '', 
                                        email: '', 
                                        dtbirth: '', 
                                        numidentification: '', 
                                        comissionpercent: '', 
                                        attention: '', 
                                        picture_path: '', 
                                        active: '', 
                                        restriction: '' 
                                    } 
                                })} 
    title="Adicionar Cliente" 
/>
                        {/* Adicione outros ícones de ação se necessário */}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
                                {/* <th>Telefone 2</th> */}
                                <th>CEP</th>
                                <th>Estado</th>
                                <th>Email</th>
                                <th>Birthday</th>
                                <th>Cidade</th>
                                <th>Ativo</th>
                                <th>Restrição</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.length > 0 ? (
                                customers.map(customer => (
                                    <tr key={customer.idcustomer}>
                                        <td>{customer.idcustomer}</td>
                                        <td>{customer.name}</td>
                                        <td>{customer.address}</td>
                                        <td>{customer.phone}</td>
                                        {/* <td>{customer.phone2}</td> */}
                                        <td>{customer.zipcode}</td>
                                        <td>{customer.state}</td>
                                        <td>{customer.email}</td>
                                        <td>{formatDate(customer.dtbirth)}</td>
                                        <td>{customer.fk_idcity}</td>
                                        <td>{customer.active ? 'Sim' : 'Não'}</td>
                                        <td>{customer.restriction}</td>
                                        <td>
                                            <FaEdit 
                                                className="action-icon" 
                                                onClick={() => this.setState({ formData: { ...customer } })} 
                                                title="Editar" 
                                            />
                                            <FaTrashAlt 
                                                className="action-icon" 
                                                onClick={() => this.handleDelete(customer.idcustomer, customer.name)} 
                                                title="Excluir" 
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="19">Nenhum cliente encontrado.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Customer;
