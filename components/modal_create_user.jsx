import React, { useState, useEffect } from 'react';
import { Button, Modal, Box, TextField, Select, MenuItem } from '@mui/material';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

const UserInfoModal = ({ isOpen, onClose, onSubmit, token_access, token_refresh }) => {
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = () => {
    onSubmit({ name, cpf, email, password });
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <h2>Informações do Usuário</h2>
        
        <TextField
          label="Nome"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Senha"
          margin="normal"
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />

        <TextField
          label="CPF"
          margin="normal"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          fullWidth
        />
        <TextField
          label="E-mail"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>Enviar</Button>
      </Box>
    </Modal>
  );
};

export default UserInfoModal;
