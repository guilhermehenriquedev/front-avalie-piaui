import React, { Component, useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import ModalEditOrgao from "@/components/modal_edit_orgao";
import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import CircularProgress from '@mui/material/CircularProgress';

import MuiDataTable from "../../components/MuiDataTable";
import ModalOrgao from "../../components/modal_create_orgao";
import ContainerContent from "../../components/ContainerContent";

import * as token from "../../helpers/authorization"


export default function Orgao() {

    const [data, setData] = useState([]);
    const [isModalOpenOrgao, setIsModalOpenOrgao] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [open_message, setOpenMessage] = React.useState(false);
    const [open_message_edit, setOpenMessageEdit] = React.useState(false);

    var access = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_access
    var refresh = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_refresh

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMessage(false);
        setOpenMessageEdit(false);
    };

    const openModalOrgao = () => {
        setIsModalOpenOrgao(true);
    };

    const closeModalOrgao = () => {
        setIsModalOpenOrgao(false);
    };

    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/orgaos?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();
            setData(responseData.data);

        } catch (err) {

            setData([]);

        } finally {
            setIsLoading(false);
        }
    }

    const handleFormOrgaoSubmit = async (orgaoData) => {
        try {

            var raw = JSON.stringify({
                "idSEI": orgaoData.id_sei,
                "nome": orgaoData.nome_orgao,
                "nome_curto": orgaoData.nome_curto,
                "link": orgaoData.link,
                "descricao": orgaoData.descricao,
                "ativo": orgaoData.ativo
            })

            const _token =  await token.verify(access, refresh)

            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${_token}`);

            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Orgao/`, {
                method: 'POST',
                body: raw,
                headers: myHeaders
            })  

            closeModalOrgao()
            getData()
            setOpenMessage(true)

        } catch (err) {

            //setData([]);

        } finally {
            // setLoading(false);
        }

    }

    const handleSubmitEdit = async (editOrgao) => {

        const _token =  await token.verify(access, refresh)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${_token}`);

        var raw = JSON.stringify({
            "id": editOrgao.idEdit,
            "idSEI": editOrgao.id_sei,
            "nome": editOrgao.nome_orgao,
            "nome_curto": editOrgao.nome_curto,
            "link": editOrgao.link,
            "descricao": editOrgao.descricao,
            "ativo": editOrgao.status
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        try {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/Orgao/${editOrgao.idEdit}/`, requestOptions);
            setOpenMessageEdit(true);
            getData();
        } catch (err) {
            //setData([]);
        } finally {

        }
    };

    useEffect(() => getData(), [])

    const columns = [
        {
            name: "id",
            label: "Editar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ModalEditOrgao id={value} onSubmit={handleSubmitEdit} token_access={access} token_refresh={refresh}/>
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

                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Orgao/${updatedData[rowIndex].id}/`, {
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
            name: "id_sei",
            label: "Id SEI",
        },
        {
            name: "sigla",
            label: "Sigla",
        },
        {
            name: "nome",
            label: "Nome",
        },
        {
            name: "link",
            label: "Link",
        }
    ];

    const rows = data.map((row, idx) => {
        return {
            id: row.id,
            id_sei: row.idSEI,
            sigla: row.nome_curto,
            nome: row.nome,
            link: row.link,
            ativo: row.ativo
        };
    });

    return (

        <ContainerContent title="Orgãos">

            <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    disableElevation
                    onClick={openModalOrgao}
                >
                    Adicionar Órgão
                </Button>

                <ModalOrgao isOpen={isModalOpenOrgao} onClose={closeModalOrgao} onSubmit={handleFormOrgaoSubmit} ></ModalOrgao>

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
                    Orgão adicionado com sucesso!
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


