import React, { Component } from 'react';
import customerService from '../services/customerService';
import cityService from '../services/cityService';
import idService from '../services/idService';
import Autosuggest from 'react-autosuggest'; 
import { FormControl, TextField, Button, Select, MenuItem, Container, Snackbar, Alert, Typography, Box, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid';

class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                idcustomer: '',
                fk_idcity: 0,
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
                numidentification: ' ',
                comissionpercent: '',
                attention: '',
                picture_path: '',
                active: '',
                restriction: ''
            },
            customers: [],
            suggestions: [],
            searchQuery: '', 
            notification: { message: '', type: '', showButtons: false, onConfirm: null },
            cities: [],
            ids:[],
            selectedCity: null,
            selectedId: null
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
            const customers = await customerService.getCustomers();
            const cities = await cityService.getAllCities();
            const ids = await idService.getAllIdentifications();
            
            this.setState({ customers, cities, ids });

            if (this.state.formData.fk_idcity) {
                const selectedCity = await cityService.getCityById(this.state.formData.fk_idcity);
                this.setState({ selectedCity });
            }
            if (this.state.formData.fk_ididentification) {
                const selectedId = await idService.getIdentificationById(this.state.formData.fk_ididentification);
                this.setState({ selectedId });
            }
            
        } catch (error) {
            this.showNotification('Erro ao carregar clientes ou cidades: ' + error.message, 'error');
        }
    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0 ? [] : this.state.customers.filter(
            customer => `${customer.name} ${customer.phone}`.toLowerCase().includes(inputValue)
        );
    };

    getSuggestionValue = (suggestion) => `${suggestion.name} ${suggestion.phone}`;

    renderSuggestion = (suggestion) => (
        <div>{`${suggestion.name} ${suggestion.phone}`}</div>
    );

    handleSearchChange = (e, { newValue }) => {
        this.setState({ searchQuery: newValue });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({ suggestions: this.getSuggestions(value) });
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] });
    };

    handleSelect = (event, { suggestion }) => {
        const selectedCustomer = suggestion;
        if (selectedCustomer) {
            this.setState({
                formData: { ...selectedCustomer },
                searchQuery: `${selectedCustomer.name} ${selectedCustomer.phone}`
            });
        }
    };

    handleChange = async (e) => {
        const { name, value } = e.target;
        this.setState({
            formData: { ...this.state.formData, [name]: value }
        });

        if (name === 'fk_idcity') {
            const selectedCity = await cityService.getCityById(value);
            this.setState({ selectedCity });
        }
        if (name === 'fk_ididentification') {
            const selectedId = await idService.getIdentidicationById(value);
            this.setState({ selectedId });
        }
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
        const { formData, searchQuery, suggestions, notification } = this.state;
        const inputProps = {
            placeholder: "Pesquisar por Name + Phone...",
            value: searchQuery,
            onChange: this.handleSearchChange
        };

        // Define o tema personalizado para o Autosuggest com a linha branca quando vazio
        const theme = {
            input: {
                width: '100%',
                padding: '10px',
                fontSize: '16px',
                border: `1px solid ${searchQuery ? '#ccc' : '#fff'}`, // Borda branca se o campo estiver vazio
                borderRadius: '4px',
                outline: 'none',
                transition: 'border-color 0.3s ease',
            },
            container: {
                position: 'relative'
            },
            suggestionsContainer: {
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 10,
                width: '100%',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                maxHeight: '200px',
                overflowY: 'auto'
            },
            suggestion: {
                padding: '10px',
                borderBottom: '1px solid #ccc'
            },
            suggestionHighlighted: {
                backgroundColor: '#ddd'
            }
        };

        return (
            <Container maxWidth="md" sx={{ height: '80vh' }}>
                <Box 
                    sx={{
                        backgroundColor: 'white', 
                        padding: 3, 
                        borderRadius: 2, 
                        boxShadow: 3, 
                        marginTop: 3 
                    }}
                >
                    {notification.message && (
                        <Snackbar open={!!notification.message} autoHideDuration={3000} onClose={() => this.setState({ notification: { message: '' } })}>
                            <Alert severity={notification.type}>{notification.message}</Alert>
                        </Snackbar>
                    )}

                    <Typography variant="h4" gutterBottom>
                        Customer Register
                    </Typography>

                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps}
                        onSuggestionSelected={this.handleSelect}
                        theme={theme} // Aplica o tema aqui
                    />
                    <br/>
                    <form onSubmit={this.handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="ID Customer"
                                    name="idcustomer"
                                    value={formData.idcustomer}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Name Customer"
                                    name="name"
                                    value={formData.name}
                                    onChange={this.handleChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel
                                            id="id-label"
                                            sx={{
                                                backgroundColor: 'white',
                                                paddingX: 0.5,
                                                position: 'absolute',
                                                top: '-2px', // Ajuste conforme necessário
                                                left: '8px', // Ajuste conforme necessário
                                                fontSize: '14px',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >City
                                    </InputLabel>                                    
                                    <Select
                                        name="fk_idcity"
                                        value={formData.fk_idcity}
                                        onChange={this.handleChange}
                                        fullWidth
                                    >
                                        <MenuItem value="">Select City</MenuItem>
                                        {this.state.cities.map((city) => (
                                            <MenuItem key={city.idcity} value={city.idcity}>
                                                {city.name_city}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel
                                            id="id-label"
                                            sx={{
                                                backgroundColor: 'white',
                                                paddingX: 0.5,
                                                position: 'absolute',
                                                top: '-2px', // Ajuste conforme necessário
                                                left: '8px', // Ajuste conforme necessário
                                                fontSize: '14px',
                                                transform: 'translateY(-50%)',
                                            }}
                                        >
                                            Identification
                                    </InputLabel>                                    
                                    <Select
                                    name="fk_ididentification"
                                    value={formData.fk_ididentification}
                                    onChange={this.handleChange}
                                    fullWidth
                                >
                                    <MenuItem value="">Select Id</MenuItem>
                                    {this.state.ids.map((identification) => (
                                        <MenuItem key={identification.ididentification} value={identification.ididentification}>
                                            {identification.nameidentification}
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="fk_idcustomer"
                                    type="text"
                                    id="fk_idcustomer"
                                    name="fk_idcustomer"
                                    value={formData.fk_idcustomer}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="fk_idclasscustomer"
                                    type="text"
                                    id="fk_idclasscustomer"
                                    name="fk_idclasscustomer"
                                    value={formData.fk_idclasscustomer}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="fk_idcountry"
                                    type="text"
                                    id="fk_idcountry"
                                    name="fk_idcountry"
                                    value={formData.fk_idcountry}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="typecustomer"
                                    type="text"
                                    id="typecustomer"
                                    name="typecustomer"
                                    value={formData.typecustomer}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Address"
                                    type="text"
                                    id="andress"
                                    name="andress"
                                    value={formData.andress}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Phone"
                                    type="text"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={this.handleChange}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Phone2"
                                    type="text"
                                    id="phone2"
                                    name="phone2"
                                    value={formData.phone2}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Zipcode"
                                    type="text"
                                    id="zipcode"
                                    name="zipcode"
                                    value={formData.zipcode}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="State"
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={formData.state}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="E-mail"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Birth"
                                    type="date"
                                    id="dtbirth"
                                    name="dtbirth"
                                    value={formData.dtbirth}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Number Identification"
                                    type="text"
                                    id="numidentification"
                                    name="numidentification"
                                    value={formData.numidentification}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Comission %"
                                    type="text"
                                    id="comissionpercent"
                                    name="comissionpercent"
                                    value={formData.comissionpercent}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Observation"
                                    type="text"
                                    id="attention"
                                    name="attention"
                                    value={formData.attention}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Picture Path"
                                    type="text"
                                    id="picture_path"
                                    name="picture_path"
                                    value={formData.picture_path}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Active"
                                    type="checkbox"
                                    id="active"
                                    name="active"
                                    checked={formData.active}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Restriction"
                                    type="text"
                                    id="restriction"
                                    name="restriction"
                                    value={formData.restriction}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>

                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={this.handleSubmit}
                            sx={{ marginTop: 2 }}
                        >
                            {formData.idcustomer ? 'Atualizar' : 'Adicionar'}
                        </Button>
                    </form>
                </Box>
            </Container>
        );
    }
}

export default Customer;
