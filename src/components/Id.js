import React, { Component } from 'react';
import idService from '../services/idService';
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
import Grid from '@mui/material/Grid';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';

class Identification extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: { ididentification: '', nameidentification: '' },
            identifications: [],
            notification: { message: '', type: '' },
            deleteDialogOpen: false,
            idToDelete: null
        };
    }

    componentDidMount() {
        this.fetchIdentifications();
    }

    fetchIdentifications = async () => {
        try {
            const identifications = await idService.getAllIdentifications();
            this.setState({ identifications });
            
        } catch (error) {
            this.showNotification('Falha ao buscar identificações: ' + error.message, 'error');
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
            if (this.state.formData.ididentification) {
                await idService.updateIdentification(this.state.formData.ididentification, this.state.formData);
                this.showNotification('Identificação atualizada com sucesso!', 'success');
            } else {
                await idService.addIdentification(this.state.formData);
                this.showNotification('Identificação adicionada com sucesso!', 'success');
            }
            this.fetchIdentifications();
            this.setState({ formData: { ididentification: '', nameidentification: '' } });
        } catch (error) {
            this.showNotification('Erro: ' + error.message, 'error');
        }
    };

    handleEdit = (id) => {
        this.setState({ formData: { ididentification: id.ididentification, nameidentification: id.nameidentification } });
    };

    handleDelete = async () => {
        const { idToDelete } = this.state;
        if (idToDelete) {
            try {
                await idService.deleteIdentification(idToDelete.ididentification);
                this.showNotification('Identificação excluída com sucesso!', 'success');
                this.fetchIdentifications();
            } catch (error) {
                this.showNotification('Erro: ' + error.message, 'error');
            }
            this.handleCloseDeleteDialog();
        }
    };

    handleOpenDeleteDialog = (id) => {
        this.setState({ deleteDialogOpen: true, idToDelete: id });
    };

    handleCloseDeleteDialog = () => {
        this.setState({ deleteDialogOpen: false, idToDelete: null });
    };

    render() {
        const { formData, identifications, notification, deleteDialogOpen, idToDelete } = this.state;
        return (
            <Container maxWidth="md" sx={{ height: '80vh' }}>
                <Paper elevation={3} sx={{ padding: 2, height: '100%' }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Identifications
                    </Typography>
                    <Box sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item xs={10}>
                                    <TextField
                                        label="Identification"
                                        name="nameidentification"
                                        value={formData.nameidentification}
                                        onChange={this.handleChange}
                                        placeholder="Digite o nome da identificação"
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
                                        {formData.ididentification ? 'Atualizar' : 'Adicionar'}
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
                                    <TableCell>Identification</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {identifications.length > 0 ? (
                                    identifications.map(id => (
                                        <TableRow key={id.ididentification}>
                                            <TableCell>{id.ididentification}</TableCell>
                                            <TableCell>{id.nameidentification}</TableCell>
                                            <TableCell>
                                                <IconButton onClick={() => this.handleEdit(id)} title="Editar">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => this.handleOpenDeleteDialog(id)} title="Excluir">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3}>Nenhuma identificação encontrada.</TableCell>
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
                            Tem certeza que deseja excluir a identificação "{idToDelete?.nameidentification}"?
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

export default Identification;
