import { Box } from "@mui/system";
import {
    Modal,
    Switch,
    Button,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from "@mui/material/FormControlLabel";
import EditIcon from '@mui/icons-material/Edit';

import * as token from "../helpers/authorization"

const EditOrgao = ({ id, onSubmit, token_access, token_refresh }) => {

    const [open, setOpen] = useState(false);
    const [nome, SetNome] = useState('');
    const [status, setStatus] = useState('');
    const [idEdit, setIdEdit] = useState(id)

    const getData = async () => {

        try {
            var _token = await token.verify(token_access, token_refresh)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${_token}`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/TipoServico/${id}`,{
                method: 'GET',
                headers: myHeaders
            });

            let responseData = await response.json();
            SetNome(responseData.nome)
            setStatus(responseData.ativo)

        } catch (err) {
            //setData([]);
        } finally {

        }
    }

    const handleSubmit = () => {
        onSubmit({ idEdit, nome, status})
        setOpen(false);
      };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div>

                <Tooltip title="Editar">
                    <IconButton onClick={() => setOpen(true)}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>

                <Modal
                    open={open}
                    onClose={() => setOpen(false)}

                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,

                    }}
                        style={{ backgroundColor: 'white', border: '2px solid #000' }}
                    >
                        <h2>Edite as informações do Tipo do Serviço</h2>

                        <TextField
                            label="Nome"
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

                        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2, display: 'block' }}>Enviar Alterações</Button>

                    </Box>

                </Modal>
            </div>
        </>
    )
}

export default EditOrgao;