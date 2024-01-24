import React, { Component, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ModalWebhook from "@/components/modal_create_Webhook";
import WebhookIcon from '@mui/icons-material/Webhook';
import ReorderIcon from '@mui/icons-material/Reorder';
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import MuiDataTable from "../../components/MuiDataTable";
import ContainerContent from "../../components/ContainerContent";
import * as utils from '../../helpers/utils'
import ModalEditWebhook from "../../components/modal_edit_webhook";
import webhook from "pages/api/configuracoes/webhook";
import * as token from "../../helpers/authorization"


export default function Webhook() {

    const [data, setData] = useState([]);
    const [isModalOpenWebhook, setIsModalOpenWebhook] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [open_message, setOpenMessage] = React.useState(false);
    const [open_message_edit, setOpenMessageEdit] = React.useState(false);

    var access = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_access
    var refresh = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_refresh

    const openModalWebhook = () => {
        setIsModalOpenWebhook(true);
    };

    const closeModalWebhook = () => {
        setIsModalOpenWebhook(false);
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/webhook?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();
            setData(responseData.data);

        } catch (err) {

            setData([]);

        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => getData(), [])

    const handleFormWebhookSubmit = async (WebhookData) => {
        try {

            var _token = await token.verify(access, refresh)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${_token}`);

            var raw = JSON.stringify({
                "tipo": WebhookData.tipo,
                "webhook": WebhookData.webhook,
                "is_active": WebhookData.status
            })

            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Webhook/`, {
                method: 'POST',
                body: raw,
                headers: myHeaders,
            })

            let data = await result.json()
            closeModalWebhook()
            setOpenMessage(true);
            getData()

        } catch (err) {

            setData([]);

        } finally {
            // setLoading(false);
        }

    }

    const handleSubmitEdit = async (editWebhook) => {

        var _token = await token.verify(access, refresh)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${_token}`);
        const data_hora = utils.getDataHoraAtual();

        var raw = JSON.stringify({
            "id": editWebhook.idEdit,
            "tipo": editWebhook.tipo,
            "webhook": editWebhook.webhook,
            "is_active": editWebhook.status,
            "atualizado_em": data_hora
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Webhook/${editWebhook.idEdit}/`, requestOptions);
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
            label: "AÇÕES",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const link_acoes = `/url?id=${value}`
                    return (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ModalEditWebhook id={value} onSubmit={handleSubmitEdit} token_access={access} token_refresh={refresh}/>
                            </div>
                        </>
                    )
                },
            }
        },
        {
            name: "is_active",
            label: "Status",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const handleStatusToggle = async () => {
                        try {
                            const updatedData = [...data];
                            const rowIndex = tableMeta.rowIndex;
                            const status = updatedData[rowIndex].is_active;
                            const _token =  await token.verify(access, refresh)

                            // Alternar o status (ativar/desativar)
                            updatedData[rowIndex].is_active = !status;

                            // Enviar a requisição para atualizar o status no backend
                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Webhook/${updatedData[rowIndex].id}/`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${_token}`
                                },
                                body: JSON.stringify({ is_active: updatedData[rowIndex].is_active }),
                            });

                            if (response.ok) {
                                // Atualizar o estado local com os dados atualizados
                                setData(updatedData);
                                setOpenMessageEdit(true);
                            } else {
                                // Reverter o status se a atualização no backend falhar
                                updatedData[rowIndex].is_active = status;
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
            name: "tipo",
            label: "TIPO",
        },
        {
            name: "webhook",
            label: "WEBHOOK",
        },
        {
            name: "atualizado_em",
            label: "ATUALIZADO EM",
        }
    ];

    const rows = data.map((row, idx) => {
        return {
            id: row.id,
            tipo: row.tipo,
            webhook: row.webhook,
            is_active: row.is_active,
            atualizado_em: utils.render_datetime(row.atualizado_em)
        };
    });

    return (

        <ContainerContent title="Gerência de webhooks">

            <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<WebhookIcon />}
                    disableElevation
                    onClick={openModalWebhook}
                >
                    Adicionar novo Webhook
                </Button>

                <ModalWebhook isOpen={isModalOpenWebhook} onClose={closeModalWebhook} onSubmit={handleFormWebhookSubmit} ></ModalWebhook>

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
                    Webhook adicionado com sucesso!
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


