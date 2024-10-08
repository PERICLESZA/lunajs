import React, { Component } from 'react';
import cityService from '../services/cityService';
import { 
    Box, 
    Container, 
    TextField, 
    Button, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Typography, 
    IconButton, 
    Snackbar, 
    Alert, 
    Dialog, 
    DialogActions, 
    DialogContent, 
    DialogContentText, 
    DialogTitle 
} from '@mui/material';
// import Grid2 from '@mui/material-next/Grid2';
import Grid from '@mui/material/Grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

class City extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { id: '', name: '' },
            cities: [],
            notification: { message: '', type: '' },
            deleteDialogOpen: false,
            cityToDelete: null
        };
    }

    componentDidMount() {
        this.fetchCities();
    }

    fetchCities = async () => {
        try {
            const cities = await cityService.getAllCities();
            this.setState({ cities });
        } catch (error) {
            this.showNotification('Falha ao buscar cidades: ' + error.message, 'error');
        }
    };

    showNotification = (message, type) => {
        this.setState({ notification: { message, type } });
        setTimeout(() => {
            this.setState({ notification: { message: '', type: '' } });
        }, 3000);
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ formData: { ...this.state.formData, [name]: value } });
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

    handleEdit = (city) => {
        this.setState({ formData: { id: city.idcity, name: city.name_city } });
    };

    handleDelete = async () => {
        const { cityToDelete } = this.state;
        if (cityToDelete) {
            try {
                await cityService.deleteCity(cityToDelete.idcity);
                this.showNotification('Cidade excluída com sucesso!', 'success');
                this.fetchCities();
            } catch (error) {
                this.showNotification('Erro: ' + error.message, 'error');
            }
            this.handleCloseDeleteDialog();
        }
    };

    handleOpenDeleteDialog = (city) => {
        this.setState({ deleteDialogOpen: true, cityToDelete: city });
    };

    handleCloseDeleteDialog = () => {
        this.setState({ deleteDialogOpen: false, cityToDelete: null });
    };

    render() {
        const { formData, cities, notification, deleteDialogOpen, cityToDelete } = this.state;
        return (
            <Container maxWidth="md" sx={{ height: '80vh' }}>
                <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Cities
                    </Typography>
                    <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={10}>
                                    <TextField
                                        label="Cidade"
                                        name="name"
                                        value={formData.name}
                                        onChange={this.handleChange}
                                        placeholder="Digite o nome da cidade"
                                        fullWidth
                                        required
                                    />
                                </Grid>
                                <Grid xs={2}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ width: '70%', marginLeft:2}}
                                    >
                                        {formData.id ? 'Atualizar' : 'Adicionar'}
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Box>

                    <TableContainer component={Paper} sx={{ marginTop: 2, height: 'calc(92% - 80px)' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#f0f0f0' }}>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cities.length > 0 ? (
                                    cities.map(city => (
                                        <TableRow key={city.idcity}>
                                            <TableCell>{city.idcity}</TableCell>
                                            <TableCell>{city.name_city}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => this.handleEdit(city)} title="Editar">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleOpenDeleteDialog(city)} title="Excluir">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}>Nenhuma cidade encontrada.</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>

                <Dialog
                    open={deleteDialogOpen}
                    onClose={this.handleCloseDeleteDialog}
                >
                    <DialogTitle>Confirmar Exclusão</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Tem certeza que deseja excluir a cidade "{cityToDelete?.name_city}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDeleteDialog} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={this.handleDelete} color="secondary">
                            Excluir
                        </Button>
                    </DialogActions>
                </Dialog>

                <Snackbar
                    open={!!notification.message}
                    autoHideDuration={3000}
                    onClose={() => this.setState({ notification: { message: '', type: '' } })}
                >
                    <Alert severity={notification.type}>
                        {notification.message}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

export default City;
