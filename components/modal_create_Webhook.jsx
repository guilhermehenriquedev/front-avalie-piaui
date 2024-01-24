import React, { useState } from 'react';
import { Button, Modal, Box, TextField, Switch, FormControlLabel } from '@mui/material';

const Webhook = ({ isOpen, onClose, onSubmit }) => {
    const [tipo, Settipo] = useState('');
    const [webhook, Setwebhook] = useState('');
    const [status, setStatus] = useState(true); // Valor padrão "ativo"

    const handleSubmit = () => {
        onSubmit({ tipo, status, webhook });
    };

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                <h2>Adicione um novo Webhook</h2>

                <TextField
                    label="Tipo"
                    margin="normal"
                    value={tipo}
                    onChange={(e) => Settipo(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="Webhook"
                    margin="normal"
                    value={webhook}
                    onChange={(e) => Setwebhook(e.target.value)}
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

export default Webhook;
