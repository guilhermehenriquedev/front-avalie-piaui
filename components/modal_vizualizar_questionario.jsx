import { Box } from "@mui/system";
import {
    Card,
    Select,
    MenuItem,
    Modal,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ContainerContent from "./ContainerContent";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import * as token from "../helpers/authorization"

function VizuQuest(id) {

    {/* Variaveis para os selects */ }
    const [data, setData] = useState([]);

    const [open, setOpen] = useState(false);

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [orgao, setOrgao] = useState('');
    const [tipo_servico, setTipoServico] = useState('');
    const [perguntas, setPerguntas] = useState([]);

    const getData = async () => {

        var _token = await token.verify(id.token_acess, id.token_refresh)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Pesquisas/get_per_id/?id=${id.id}`, {
                headers: {"Authorization": `Bearer ${_token}`}
            });

            let responseData = await response.json();
            let data = responseData[0]

            setTitulo(data.titulo)
            setDescricao(data.descricao)
            setOrgao(data.nome_orgao)
            setTipoServico(data.tipo_servico)
            setPerguntas(data.perguntas)

        } catch (err) {
            setData([]);
        } finally {

        }
    }


    useEffect(() => {
        getData();
    }, []);

    return (
        <div>

            <Tooltip title="Visualizar">
                <IconButton onClick={() => setOpen(true)}>
                    <VisibilityIcon />
                </IconButton>
            </Tooltip>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflowY: 'auto', // Adicionando rolagem na vertical
                }}
            >
                <div style={{ width: 1200, margin: 'auto', marginTop: 50, backgroundColor: 'white', padding: 10 }}>

                    <Box sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Box sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            gap: "2rem",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>


                            {/* COMEÇA O FORMULÁRIO */}

                            <Card sx={{ width: "100%" }}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: ".5rem",
                                    padding: "1rem",
                                }}>
                                    <Box sx={{
                                        display: "flex",
                                        gap: "1rem",
                                    }}>
                                        <TextField
                                            value={titulo}
                                            helperText="Título"
                                            variant="standard"
                                            sx={{ flex: 2 }}
                                        />
                                    </Box>

                                    <Box sx={{
                                        display: "flex",
                                        gap: "1rem",
                                    }}>
                                        <TextField
                                            value={descricao}
                                            helperText="Descrição"
                                            variant="standard"
                                            sx={{ flex: 2 }}
                                        />
                                    </Box>
                                </Box>
                            </Card>

                            <Card sx={{ width: "100%" }}>
                                <Box sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "2rem",
                                    padding: "1rem",
                                }}>
                                    <Box sx={{
                                        width: "100%",
                                        display: "flex",
                                        gap: "2rem",
                                    }}>
                                        <FormControl variant="standard" fullWidth sx={{ flex: 1 }}>

                                            <TextField
                                                label="Orgão"
                                                rows={4}
                                                value={orgao}
                                                variant="standard"
                                            />

                                        </FormControl>

                                        <FormControl variant="standard" fullWidth sx={{ flex: 1 }}>
                                            <TextField
                                                label="Tipo servio"
                                                rows={4}
                                                value={tipo_servico}
                                                variant="standard"
                                            />

                                        </FormControl>

                                    </Box>

                                </Box>
                            </Card>


                            <Card id="card-perguntas" sx={{ width: "100%" }}>
                                {

                                    perguntas.map((q, index) => (

                                        <Box key={index}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: ".5rem",
                                                padding: "1rem",
                                            }}>
                                            <Typography sx={{ fontWeight: "bold" }}>Pergunta #{index + 1}</Typography>

                                            <Box sx={{
                                                display: "flex",
                                                gap: "1rem",
                                            }}>
                                                <TextField
                                                    id="form-texto-pergunta"
                                                    value={q.texto_pergunta}
                                                    helperText="Pergunta da avaliação"
                                                    variant="standard"
                                                    sx={{ flex: 2 }}
                                                />

                                                <TextField
                                                    value={q.nome_tipo_pergunta}
                                                    helperText="Tipo de pergunta"
                                                    variant="standard"
                                                    sx={{ flex: 2 }}
                                                />

                                            </Box>

                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                                id="form-options-names"
                                            >
                                                {q.id_tipo_pergunta === 2 && JSON.parse(q.texto_opcao).map((op, idx) => (
                                                    <FormControlLabel
                                                        key={idx}
                                                        id={op.option_id}
                                                        value={op.texto}
                                                        control={<Radio />}
                                                        label={op.texto}
                                                    />
                                                ))}

                                            </RadioGroup>

                                        </Box>

                                    ))}



                            </Card>


                        </Box>

                    </Box>

                </div>
            </Modal>
        </div>
    )
}

export default VizuQuest;