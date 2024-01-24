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
import { method } from "lodash";


const EditOrgao = ({ id, onSubmit, token_access, token_refresh }) => {

    const [open, setOpen] = useState(false);
    const [id_sei, SetIdSei] = useState('');
    const [nome_orgao, SetNomeOrgao] = useState('');
    const [nome_curto, SetNomeCurto] = useState('');
    const [link, SetLink] = useState('');
    const [descricao, SetDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [idEdit, setIdEdit] = useState(id)
    
    const getData = async () => {

        var _token = await token.verify(token_access, token_refresh)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${_token}`);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Orgao/${id}`,{
                method: 'GET',
                headers: myHeaders
            });

            let responseData = await response.json();
            SetIdSei(responseData.idSEI)
            SetNomeCurto(responseData.nome_curto)
            SetNomeOrgao(responseData.nome)
            SetLink(responseData.link)
            SetDescricao(responseData.descricao)
            setStatus(responseData.ativo)

        } catch (err) {
            //setData([]);
        } finally {

        }
    }

    const handleSubmit = () => {
        onSubmit({ idEdit, id_sei, nome_orgao, nome_curto, link, descricao, status})
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
                        <h2>Edite as informações da {nome_curto}</h2>

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
            </div>
        </>
    )
}

export default EditOrgao;