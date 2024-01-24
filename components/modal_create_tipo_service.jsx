import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Switch, FormControlLabel } from '@mui/material';

const GroupInfoModal = ({ isOpen, onClose, onSubmit }) => {
    const [nome, SetNome] = useState('');
    const [status, setStatus] = useState(true); // Valor padrão "ativo"

    const handleSubmit = () => {
        onSubmit({ nome, status });
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <h2>Informações de Tipos De Serviço</h2>

                <TextField
                    label="NOME"
                    margin="normal"
                    value={nome}
                    onChange={(e) => SetNome(e.target.value)}
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
