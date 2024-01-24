import React, { Component, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ContainerContent from "../../components/ContainerContent";
import AddIcon from '@mui/icons-material/Add';
import MuiDataTable from "../../components/MuiDataTable";
import ModalTipoService from "../../components/modal_create_tipo_service";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import ModalEditServico from "../../components/modal_edit_tipo_servico";

import * as token from "../../helpers/authorization"

export default function TipoServico() {

    const [data, setData] = useState([]);
    const [isModalOpenTipoService, setIsModalOpenTipoService] = useState(false);
    const [open_message, setOpenMessage] = React.useState(false);
    const [open_message_edit, setOpenMessageEdit] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);

    var access = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_access
    var refresh = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_refresh

    const openModalTipoService = () => {
        setIsModalOpenTipoService(true);
    };

    const closeModalTipoService = () => {
        setIsModalOpenTipoService(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMessage(false);
        setOpenMessageEdit(false);
    };

    const getData = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/tipos_servicos?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();

            setData(responseData.data);

        } catch (err) {

            setData([]);

        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => getData(), [])

    const handleFormServiceSubmit = async (TipoService) => {
        try {

            var _token = await token.verify(access, refresh)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${_token}`);

            var raw = JSON.stringify({
                "nome": TipoService.nome,
                "ativo": TipoService.status
            })

            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/TipoServico/`, {
                method: 'POST',
                body: raw,
                headers: myHeaders
            })

            let data = await result.json()
            closeModalTipoService()
            setOpenMessage(true);
            getData()

        } catch (err) {

            setData([]);

        } finally {
            // setLoading(false);
        }

    }

    const handleSubmitEdit = async (editTipoServico) => {

        var _token = await token.verify(access, refresh)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${_token}`);

        var raw = JSON.stringify({
            "id": editTipoServico.idEdit,
            "nome": editTipoServico.nome,
            "ativo": editTipoServico.status
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/TipoServico/${editTipoServico.idEdit}/`, requestOptions);
            getData();
            setOpenMessageEdit(true);
        } catch (err) {
            //setData([]);
        } finally {

        }
    };

    const columns = [
        {
            name: "id",
            label: "Editar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ModalEditServico id={value} onSubmit={handleSubmitEdit} token_access={access} token_refresh={refresh}/>
                            </div>
                        </>
                    )
                },
            }
        },
        {
            name: "ativo",
            label: "Status",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const handleStatusToggle = async () => {
                        try {
                            const updatedData = [...data];
                            const rowIndex = tableMeta.rowIndex;
                            const status = updatedData[rowIndex].ativo;
                            const _token =  await token.verify(access, refresh)

                            // Alternar o status (ativar/desativar)
                            updatedData[rowIndex].ativo = !status;

                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/TipoServico/${updatedData[rowIndex].id}/`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${_token}`
                                },
                                body: JSON.stringify({ ativo: updatedData[rowIndex].ativo }),
                            });

                            if (response.ok) {
                                setData(updatedData);
                                setOpenMessageEdit(true);
                            } else {
                                updatedData[rowIndex].ativo = status;
                            }
                        } catch (error) {
                            console.error("Erro ao alternar o status:", error);
                        }
                    };

                    return (
                        <>
                            <Switch
                                checked={value}
                                onChange={handleStatusToggle}
                                color="primary"
                                sx={{
                                    '& .MuiSwitch-thumb': {
                                        backgroundColor: value ? 'green' : 'red',
                                    },
                                    '& .Mui-checked': {
                                        color: value ? 'green' : 'red',
                                    },
                                }}
                            />
                            <Typography variant="body2" sx={{ marginLeft: 1, color: value ? 'green' : 'red' }}>
                                {value ? 'Ativo' : 'Inativo'}
                            </Typography>
                        </>
                    );
                },
            },
        },
        {
            name: "nome",
            label: "NOME",
        }
    ];

    const rows = data.map((row, idx) => {
        return {
            id: row.id,
            nome: row.nome,
            ativo: row.ativo
        };
    });

    return (

        <ContainerContent title="Tipos de Serviços">

            <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    disableElevation
                    onClick={openModalTipoService}
                >
                    Adicionar novo tipo de serviço
                </Button>

                <ModalTipoService isOpen={isModalOpenTipoService} onClose={closeModalTipoService} onSubmit={handleFormServiceSubmit}></ModalTipoService>

            </Stack>

            {isLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <MuiDataTable title={''} data={rows} columns={columns}></MuiDataTable>
            )}

            <Snackbar open={open_message} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Tipo de serviço adicionado com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar open={open_message_edit} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Dados alterados com sucesso!
                </Alert>
            </Snackbar>

        </ContainerContent >

    );
}


