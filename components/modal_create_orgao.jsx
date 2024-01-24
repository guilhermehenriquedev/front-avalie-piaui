import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Switch, FormControlLabel } from '@mui/material';

const GroupInfoModal = ({ isOpen, onClose, onSubmit }) => {
    const [id_sei, SetIdSei] = useState('');
    const [nome_orgao, SetNomeOrgao] = useState('');
    const [nome_curto, SetNomeCurto] = useState('');
    const [link, SetLink] = useState('');
    const [descricao, SetDescricao] = useState('');
    const [status, setStatus] = useState(true); // Valor padrão "ativo"

    const handleSubmit = () => {
        onSubmit({ id_sei, nome_orgao, nome_curto, link, descricao, status });
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <h2>Informações de Orgão</h2>

                <TextField
                    label="ID SEI"
                    margin="normal"
                    value={id_sei}
                    onChange={(e) => SetIdSei(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Nome do Orgão"
                    margin="normal"
                    value={nome_orgao}
                    onChange={(e) => SetNomeOrgao(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Nome Curto"
                    margin="normal"
                    value={nome_curto}
                    onChange={(e) => SetNomeCurto(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Link"
                    margin="normal"
                    value={link}
                    onChange={(e) => SetLink(e.target.value)}
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
