import React, { Component } from 'react';
import customerService from '../services/customerService'; // Adaptar o nome do serviço
import "../styles/customerStyle.css"; // Adaptar o nome da folha de estilo
import Autocomplete from 'react-autocomplete';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                idcustomer: '',
                fk_idcity: '',
                fk_ididentification: '',
                fk_idcustomer: '',
                fk_idclasscustomer: '',
                fk_idcountry: '',
                typecustomer: '',
                name: '',
                andress: '',
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
            customers: [],
            filteredCustomers: [], // Adicione isto
            searchQuery: '', 
            notification: { message: '', type: '', showButtons: false, onConfirm: null }
        };
    }

      clearNotificationTimeout = () => {
        if (this.notificationTimeout) {
            clearTimeout(this.notificationTimeout);
            this.notificationTimeout = null;
        }
    };

      async componentDidMount() {
        try {
            const customers = await customerService.getCustomers(); // Método para buscar todos os clientes
            this.setState({ customers });
        } catch (error) {
            this.showNotification('Erro ao carregar clientes: ' + error.message, 'error');
        }
    }

    handleSearchChange = (e) => {
        const query = e.target.value;
        this.setState({
            searchQuery: query,
            filteredCustomers: this.state.customers.filter(customer => 
                `${customer.name} ${customer.phone}`.toLowerCase().includes(query.toLowerCase())
            )
        });
    };

    handleSelect = (value) => {
        const selectedCustomer = this.state.customers.find(
            (customer) => `${customer.name} ${customer.phone}` === value
        );

        if (selectedCustomer) {
            this.setState({ formData: { ...selectedCustomer }, searchQuery: value });
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
            if (this.state.formData.idcustomer) {
                await customerService.updateCustomer(this.state.formData.idcustomer, this.state.formData);
                this.showNotification('Customer atualizado com sucesso!', 'success');
            } else {
                await customerService.addCustomer(this.state.formData);
                this.showNotification('Customer adicionado com sucesso!', 'success');
            }
            this.setState({ formData: { ...this.initialFormState } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
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

    render() {
        const { formData, customers, searchQuery,notification } = this.state;
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
                <h2 className="title">Customer Register</h2>
               <div className="autocomplete-container">
                    <Autocomplete
                        getItemValue={(item) => `${item.name} ${item.phone}`}
                        items={this.state.filteredCustomers}
                        renderItem={(item, isHighlighted) =>
                            <div key={item.idcustomer} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                {`${item.name} ${item.phone}`}
                            </div>
                        }
                        value={this.state.searchQuery}
                        onChange={this.handleSearchChange}
                        onSelect={this.handleSelect}
                        inputProps={{ className: 'autocomplete-input', placeholder: 'Pesquisar por Name + Phone...' }}
                    />
                    <button type="submit" className="btn-submit" onClick={this.handleSubmit}>
                        {formData.idcustomer ? 'Atualizar' : 'Adicionar'}
                    </button>
                </div>

                <form onSubmit={this.handleSubmit} className="customer-form">


                  <div className="form-group-inline">
                        <div className="form-group">
                            <label htmlFor="idcustomer">ID Customer:</label>
                            <input
                                type="text"
                                id="idcustomer"
                                name="idcustomer"
                                value={formData.idcustomer}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                    </div>


                    <div className="form-group">
                        <label htmlFor="fk_idcity">City ID:</label>
                        <input
                            type="text"
                            id="fk_idcity"
                            name="fk_idcity"
                            value={formData.fk_idcity}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fk_ididentification">Identification ID:</label>
                        <input
                            type="text"
                            id="fk_ididentification"
                            name="fk_ididentification"
                            value={formData.fk_ididentification}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fk_idcustomer">Customer ID:</label>
                        <input
                            type="text"
                            id="fk_idcustomer"
                            name="fk_idcustomer"
                            value={formData.fk_idcustomer}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fk_idclasscustomer">Class Customer:</label>
                        <input
                            type="text"
                            id="fk_idclasscustomer"
                            name="fk_idclasscustomer"
                            value={formData.fk_idclasscustomer}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fk_idcountry">Country ID:</label>
                        <input
                            type="text"
                            id="fk_idcountry"
                            name="fk_idcountry"
                            value={formData.fk_idcountry}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="typecustomer">Type Customer:</label>
                        <input
                            type="text"
                            id="typecustomer"
                            name="typecustomer"
                            value={formData.typecustomer}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="andress">Address:</label>
                        <input
                            type="text"
                            id="andress"
                            name="andress"
                            value={formData.andress}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone2">Phone 2:</label>
                        <input
                            type="text"
                            id="phone2"
                            name="phone2"
                            value={formData.phone2}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zipcode">Zipcode:</label>
                        <input
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            value={formData.zipcode}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dtbirth">Date of Birth:</label>
                        <input
                            type="date"
                            id="dtbirth"
                            name="dtbirth"
                            value={formData.dtbirth}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numidentification">Identification Number:</label>
                        <input
                            type="text"
                            id="numidentification"
                            name="numidentification"
                            value={formData.numidentification}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="comissionpercent">Commission Percent:</label>
                        <input
                            type="text"
                            id="comissionpercent"
                            name="comissionpercent"
                            value={formData.comissionpercent}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="attention">Attention:</label>
                        <input
                            type="text"
                            id="attention"
                            name="attention"
                            value={formData.attention}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="picture_path">Picture Path:</label>
                        <input
                            type="text"
                            id="picture_path"
                            name="picture_path"
                            value={formData.picture_path}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="active">Active:</label>
                        <input
                            type="checkbox"
                            id="active"
                            name="active"
                            checked={formData.active}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="restriction">Restriction:</label>
                        <input
                            type="text"
                            id="restriction"
                            name="restriction"
                            value={formData.restriction}
                            onChange={this.handleChange}
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default Customer;
