import { Box } from "@mui/system";
import {
    Modal,
    Switch,
    Button,
    Select,
    MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import FormControlLabel from "@mui/material/FormControlLabel";
import EditIcon from '@mui/icons-material/Edit';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import * as token from "../helpers/authorization"


const EditServico = ({ id, onSubmit , token_access, token_refresh}) => {

    const [open, setOpen] = useState(false);

    const [id_orgao, SetIdOrgao] = useState('');
    const [id_tipoService, SetIdTipoService] = useState('');
    const [nome, SetNome] = useState('');
    const [descricao, SetDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [idEdit, setIdEdit] = useState(id)

    const [services, setServices] = useState([]);
    const [orgaos, setOrgaos] = useState([]);

    const getData = async () => {
        try {
            var _token = await token.verify(token_access, token_refresh)
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${_token}`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Servico/${id}`,{
                method: 'GET',
                headers: myHeaders
            });

            let responseData = await response.json();

            SetIdOrgao(responseData.idOrgao)
            SetIdTipoService(responseData.id_tipoService)
            SetNome(responseData.nome)
            SetDescricao(responseData.descricao)
            setStatus(responseData.ativo)

        } catch (err) {
            //setData([]);
        } finally {

        }
    }

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

    const handleSubmit = () => {
        onSubmit({ idEdit, id_orgao, id_tipoService, nome, descricao, status })
        setOpen(false);
    };

    useEffect(() => {
        getData();
        fetchOrgaos();
        fetchTiposServices();
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
                        <h2>Edite as informações do serviço</h2>

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
                                value={id_orgao}
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
                            label="Nome do serviço"
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

                        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2, display: 'block' }}>Enviar alterações</Button>

                    </Box>

                </Modal>
            </div>
        </>
    )
}

export default EditServico;