import { Box } from "@mui/system";
import {
    Modal,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    FormControlLabel,
    Switch,
    Tooltip,
    IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import * as token from "../helpers/authorization";

const EditOrgao = ({ id, onSubmit, token_access, token_refresh }) => {
    const [open, setOpen] = useState(false);
    const [permissions, setPermissions] = useState([]);
    const [idEdit, setIdEdit] = useState(id);
    const [permissions_user, setPermUser] = useState([]);

    const getData = async () => {
        try {
            var _token = await token.verify(token_access, token_refresh);
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${_token}`);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Auth/list_permissions/?user_id=${id}`, {
                method: 'GET',
                headers: myHeaders
            });

            let responseData = await response.json();
            setPermUser(responseData);
        } catch (err) {
            console.error("Error fetching permissions:", err);
        }
    };

    const handleAccordionChange = (key) => {
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [key]: !prevPermissions[key],
        }));
    };

    const handleSubmit = () => {
        onSubmit({ idEdit, permissions });
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
                        <AddModeratorIcon color="primary" />
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
                        <h2>Configuração de permissões</h2>

                        {/* Adicionando o código do Accordion */}
                        {Object.entries(permissions_user).map(([key, value]) => (
                            <Accordion key={key}>
                                <AccordionSummary>
                                    <Typography>{key}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <FormControlLabel
                                        control={<Switch checked={value} onChange={() =>    (key)} />}
                                        label="Permitir"
                                    />
                                </AccordionDetails>
                            </Accordion>
                        ))}

                        <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2, display: 'block' }}>Enviar Alterações</Button>
                    </Box>
                </Modal>
            </div>
        </>
    );
};

export default EditOrgao;
