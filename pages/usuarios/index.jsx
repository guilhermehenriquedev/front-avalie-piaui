import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';


import UserInfoModal from '../../components/modal_create_user';
import MuiDataTable from "../../components/MuiDataTable";
import ContainerContent from "../../components/ContainerContent";

import Switch from '@mui/material/Switch';
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import * as token from "../../helpers/authorization"
import ModalPermission from "@/components/modal_edit_permissions"
import * as utils from "../../helpers/utils"


export default function Usuarios() {

    const [data, setData] = useState([]);
    const [isModalOpenUser, setIsModalOpenUser] = useState(false);
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

    const openModalUser = () => {
        setIsModalOpenUser(true);
    };

    const closeModalUser = () => {
        setIsModalOpenUser(false);
    };

    const handleFormUserSubmit = async (userData) => {
        
        try {

            var formdata = new FormData();
            formdata.append("username", userData.name);
            formdata.append("password", userData.password);
            formdata.append("user_group", userData.group);
            formdata.append("cpf", userData.cpf);
            formdata.append("email", userData.email);

            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/register/`, {
                method: 'POST',
                body: formdata
            })

            let data = await result.json()

            if (data.user_created) {
                closeModalUser()
                getData()
            } else {

            }


        } catch (err) {

            setData([]);

        } finally {
            // setLoading(false);
        }

    };

    const getData = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/user?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();
            setData(responseData.data);


        } catch (err) {

            setData([]);

        } finally {
            // setLoading(false);
        }
    }
    useEffect(() => getData(), [])


    const columns = [
        {
            name: "id",
            label: "Permissões",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <ModalPermission id={value}  token_access={access} token_refresh={refresh}/>
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
                            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/${updatedData[rowIndex].id}/`, {
                                method: 'PUT',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Authorization': `Bearer ${_token}`
                                },
                                body: JSON.stringify({ is_active: updatedData[rowIndex].is_active,
                                                        username: updatedData[rowIndex].username,
                                                        password: updatedData[rowIndex].password
                                }),
                            });

                            if (response.ok) {
                                setData(updatedData);
                                setOpenMessageEdit(true);
                            } else {
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
                                {value ? 'ativo' : 'inativo'}
                            </Typography>
                            
                        </>
                    );
                },
            },
        },
        {
            name: "nome",
            label: "Nome",
        },
        {
            name: "email",
            label: "Email",
        },
        {
            name: "is_superuser",
            label: "Status do super usuário"
        }
    ];

    const rows = data.map((row, idx) => {
        return {
            id: row.id,
            nome: row.username,
            password: row.password,
            email: row.email,
            is_active: row.is_active,
            is_superuser: utils.render_true_false(row.is_superuser)

        };
    });

    return (

        <ContainerContent title="Usuários">

            <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    disableElevation
                    onClick={openModalUser}
                >
                    Criar Novo Usuário
                </Button>

                <UserInfoModal isOpen={isModalOpenUser} onClose={closeModalUser} onSubmit={handleFormUserSubmit} token_access={access} token_refresh={refresh} />       

            </Stack>

            <MuiDataTable
                title={''}
                data={rows}
                columns={columns}>
            </MuiDataTable>


            <Snackbar open={open_message} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Usuário adicionado com sucesso!
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


