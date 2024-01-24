import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Switch, Select, FormControlLabel, MenuItem, IconButton  } from '@mui/material';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import CloseIcon from '@mui/icons-material/Close';

const GroupInfoModal = ({ isOpen, onClose, onSubmit, token_access, token_refresh }) => {

    const [idOrgao, SetIdOrgao] = useState('');
    const [id_tipoService, SetIdTipoService] = useState('');
    const [nome, SetNome] = useState('');
    const [descricao, SetDescricao] = useState('');
    const [status, setStatus] = useState(true); // Valor padrão "ativo"

    const [services, setServices] = useState([]);
    const [orgaos, setOrgaos] = useState([]);

    const handleSubmit = () => {
        onSubmit({ idOrgao, id_tipoService, nome, descricao, status });
    };

    const handleClose = () => {
        // Clear input fields when closing the modal
        SetIdOrgao('');
        SetIdTipoService('');
        SetNome('');
        SetDescricao('');
        setStatus(true); // Reset status to 'Ativo'
        onClose();
    };


    const fetchTiposServices = async () => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/tipos_servicos?access=${token_access}&refresh=${token_refresh}`, {
            method: 'GET',
        })

        let data = await response.json()
        setServices(data.data);

    };

    const fetchOrgaos = async () => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/orgaos?access=${token_access}&refresh=${token_refresh}`, {
            method: 'GET',
        })

        let data = await response.json()
        setOrgaos(data.data);

    };

    useEffect(() => {
        fetchTiposServices();
        fetchOrgaos();
    }, []);


    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <h2>Informações de Serviços</h2>

                <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1 }}>
                    <CloseIcon />
                </IconButton>

                <FormControl fullWidth>
                    <InputLabel>Selecione o tipo de serviço</InputLabel>
                    <Select
                        label="Tipo Serviço"
                        value={id_tipoService}
                        onChange={(e) => SetIdTipoService(e.target.value)}
                        fullWidth
                    >
                        {services.map((service) => (
                            <MenuItem key={service.id} value={service.id}>
                                {service.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth style={{ marginTop: '20px' }}>
                    <InputLabel>Selecione o orgão</InputLabel>
                    <Select
                        label="Orgão"
                        value={idOrgao}
                        onChange={(e) => SetIdOrgao(e.target.value)}
                        fullWidth
                    >
                        {orgaos.map((service) => (
                            <MenuItem key={service.id} value={service.id}>
                                {service.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Nome"
                    margin="normal"
                    value={nome}
                    onChange={(e) => SetNome(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Descrição"
                    margin="normal"
                    value={descricao}
                    onChange={(e) => SetDescricao(e.target.value)}
                    fullWidth
                />

                <FormControlLabel
                    value={status}
                    control={<Switch checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                    label={status ? 'Ativo' : 'Inativo'}
                />

                <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2, display: 'block' }}>Enviar</Button>

            </Box>
        </Modal>
    );
};

export default GroupInfoModal;
