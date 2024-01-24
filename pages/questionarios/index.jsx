import { Box } from "@mui/system";
import {
    Card,
    Select,
    MenuItem,
    Button,
    Modal,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import LoadingButton from '@mui/lab/LoadingButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Snackbar from '@mui/material/Snackbar';

import ContainerContent from "../../components/ContainerContent";
import { MultiplaEscolha } from "../questionarios/TipoPergunta/MultiplaEscolha";

import * as token from "../../helpers/authorization"

export default function Questionarios() {

    {/* Variaveis para os selects */ }
    const [dataOrgao, setDataOrgao] = useState([]);
    const [dataTipoServico, setDataTipoServico] = useState([]);
    const [dataTipoPergunta, setDataTipoPergunta] = useState([]);

    {/* Variaveis para a opcao selecionadas */ }
    const [orgao, setOrgao] = useState('');
    const [tipo_servico, setTipoServico] = useState('');
    const [tipo_pergunta, setTipoPergunta] = useState('');
    const [pergunta, setPergunta] = useState('');
    const [opcao, setOpcao] = useState('');

    {/* Variaveis para loop de novas questoes */ }
    const [newQuestion, setNewQuestion] = useState([]);
    const [numberQuest, setNumberQuest] = useState(0);

    {/* Variaveis de button */ }
    const [loadingAddQuest, setloadingAddQuest] = React.useState(false);
    const [loadingSendForm, setloadingSendForm] = React.useState(false);

    {/* Variaveis para modal */ }
    const [onOpenModalQuest, setOpenModalQuest] = useState(false);

    {/* Variaveis para mensagem de envio do formulario */ }
    const [open_message, setOpenMessage] = React.useState(false);

    {/* Abre o modal de adicionar pergunta no formulario */ }
    const openModalQuest = () => {
        setOpenModalQuest(true);
    }

    {/* Fecha o modal de adicionar pergunta no formulario */ }
    const closeModalQuest = () => {
        setOpenModalQuest(false);
        setPergunta('');
        setTipoPergunta('');
        setOpcao('');
    }

    const clearForm = () => {
        document.getElementById("form-title").value = null
        document.getElementById("form-description").value = null
        setOrgao("");
        setTipoServico("");
        setNewQuestion([])
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMessage(false);
    };

    // variavel de token
    var access = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_access
    var refresh = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_refresh

    {/* Enviar formulario para o banco de dados */ }
    const SendForm = async () => {

        setloadingSendForm(true);

        let user_id = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).user_id
        let form_title = document.getElementById("form-title").value
        let form_description = document.getElementById("form-description").value
        let dict_perguntas = []

        // pega as perguntas
        for (var p in newQuestion) {
            if (newQuestion.hasOwnProperty(p)) {
                var _pergunta = newQuestion[p]
                dict_perguntas.push({
                    "texto_pergunta": _pergunta.texto_pergunta,
                    "tipo_pergunta": _pergunta.tipo_pergunta.id,
                    "opcoes": _pergunta.options
                })
            }
        }

        try {

            var formdata = JSON.stringify({
                "orgao_id": orgao,
                "titulo": form_title,
                "descricao": form_description,
                "user_id": user_id,
                "tipo_servico": tipo_servico,
                "dict_perguntas": dict_perguntas
            })


            const token_acess = await token.verify(access, refresh)

            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Questionario/create/`, {
                method: 'POST',
                body: formdata,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token_acess}`
                }
            })

            //handleSuccess();
            setOpenMessage(true)
            setloadingSendForm(false)
            clearForm()


        } catch (err) {
            //handleError();
            console.log("erro..: ", err)

        } finally {
            // 
        }
    }


    {/* Funcao para enviar pergunta ao formulario */ }
    const SendAddQuestion = () => {

        var numero_questao = numberQuest + 1
        var spans = document.getElementById("form-options");
        var options = []
        var tipo_pergunta_nome = ''

        // pega as opcoes digitadas se houver
        if (spans) {
            var labels = spans.getElementsByTagName("label")
            for (var i = 0; i < labels.length; i++) {
                var spanText = labels[i].innerText || labels[i].textContent;
                options.push(spanText)
            }
        }

        // pega o nome do tipo de pergunta
        for (var i in dataTipoPergunta) {
            if (dataTipoPergunta.hasOwnProperty(i)) {
                var tipoP = dataTipoPergunta[i];
                if (tipoP.id == tipo_pergunta) {
                    tipo_pergunta_nome = { "id": tipoP.id, "nome": tipoP.nome }
                }
            }
        }

        var _newquest = {
            "numero_questao": numero_questao,
            "texto_pergunta": pergunta,
            "tipo_pergunta": tipo_pergunta_nome,
            "id_tipo_pergunta": tipo_pergunta,
            "options": options
        }

        setNumberQuest(numero_questao)
        setNewQuestion(prevQuestions => [...prevQuestions, _newquest]);

        closeModalQuest();
    }


    const getDataOrgaos = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/orgaos?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();
            setDataOrgao(responseData.data);

        } catch (err) {
            setDataOrgao([]);
        } finally {

        }
    }

    const getDataTipoServicos = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/tipos_servicos?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();
            setDataTipoServico(responseData.data);

        } catch (err) {
            setDataTipoServico([]);
        } finally {

        }
    }

    const getDataTipoPergunta = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/perguntas/tipos?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();
            setDataTipoPergunta(responseData.data);

        } catch (err) {
            setDataTipoPergunta([]);
        } finally {

        }
    }


    useEffect(() => {
        getDataOrgaos();
        getDataTipoServicos();
        getDataTipoPergunta();
    }, []);

    return (
        <ContainerContent>

            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Box sx={{
                    width: "60%",
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
                                    id="form-title"
                                    label="Digite o título..."
                                    defaultValue=""
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
                                    id="form-description"
                                    label="Descrição do título..."
                                    defaultValue=""
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
                                    <InputLabel id="demo-simple-select-standard-label">Orgao</InputLabel>

                                    <Select
                                        id="form-orgao"
                                        value={orgao}
                                        onChange={(e) => setOrgao(e.target.value)}
                                        fullWidth
                                    >
                                        {dataOrgao.map((_orgao) => (
                                            <MenuItem key={_orgao.id} value={_orgao.id}>
                                                {_orgao.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>

                                <FormControl variant="standard" fullWidth sx={{ flex: 1 }}>
                                    <InputLabel id="demo-simple-select-standard-label">Tipo Serviço</InputLabel>

                                    <Select
                                        id="form-tipo-servico"
                                        value={tipo_servico}
                                        onChange={(e) => setTipoServico(e.target.value)}
                                        fullWidth
                                    >
                                        {dataTipoServico.map((_tipo_servico) => (
                                            <MenuItem key={_tipo_servico.id} value={_tipo_servico.id}>
                                                {_tipo_servico.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>

                            </Box>

                        </Box>
                    </Card>

                    {/* PERGUNTAS */}
                    <Card id="card-perguntas" sx={{ width: "100%" }}>
                        {newQuestion.map((q, index) => (

                            <Box key={index}
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: ".5rem",
                                    padding: "1rem",
                                }}>
                                <Typography sx={{ fontWeight: "bold" }}>Pergunta #{q.numero_questao}</Typography>

                                <Box sx={{
                                    display: "flex",
                                    gap: "1rem",
                                }}>
                                    <TextField
                                        id="form-texto-pergunta"
                                        defaultValue={q.texto_pergunta}
                                        helperText="Pergunta da avaliação"
                                        variant="standard"
                                        sx={{ flex: 2 }}
                                    />

                                    <TextField
                                        defaultValue={q.tipo_pergunta.nome}
                                        helperText="Tipo de pergunta"
                                        variant="standard"
                                        sx={{ flex: 2 }}
                                    />

                                </Box>

                                {/* coloca aqui as opcoes caso seja multipla escolha */}
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                    id="form-options-names"
                                >
                                    {q.options.map((op, idx) => {
                                        return <FormControlLabel key={idx} id={idx} value={op} control={<Radio />} label={op} />
                                    })}
                                </RadioGroup>

                            </Box>

                        ))}
                    </Card>

                    <Card>
                        <LoadingButton
                            size="small"
                            onClick={openModalQuest}
                            endIcon={<NoteAddIcon />}
                            loading={loadingAddQuest}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Adicionar Pergunta</span>
                        </LoadingButton>

                        <LoadingButton
                            sx={{ ml: 2 }}
                            size="small"
                            onClick={SendForm}
                            endIcon={<SendIcon />}
                            loading={loadingSendForm}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Enviar Formulário</span>
                        </LoadingButton>

                    </Card>

                </Box>

            </Box>


            {/* Modal de criar pergunta */}

            <Modal
                open={onOpenModalQuest}
                onClose={closeModalQuest}
            >
                <Box >
                    <Card sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>

                        <IconButton aria-label="close" onClick={closeModalQuest} sx={{ position: 'absolute', top: '8px', right: '8px', zIndex: 1 }}>
                            <CloseIcon />
                        </IconButton>

                        <Box >

                            <Box >
                                <TextField
                                    id="form-texto-pergunta"
                                    label="Digite uma pergunta."
                                    onChange={(e) => setPergunta(e.target.value)}
                                    helperText="Pergunta da avaliação"
                                    variant="standard"
                                    fullWidth
                                    sx={{ flex: 1 }}
                                />

                                <FormControl variant="standard" fullWidth sx={{ flex: 1 }}>
                                    <InputLabel
                                        id="demo-simple-select-standard-label"
                                    >
                                        Tipo Pergunta
                                    </InputLabel>

                                    <Select
                                        id="form-tipo-servico"
                                        value={tipo_pergunta}
                                        onChange={(e) => setTipoPergunta(e.target.value)}
                                        fullWidth
                                    >
                                        {dataTipoPergunta.map((_tipo_pergunta) => (
                                            <MenuItem key={_tipo_pergunta.id} value={_tipo_pergunta.id}>
                                                {_tipo_pergunta.nome}
                                            </MenuItem>
                                        ))}
                                    </Select>

                                </FormControl>
                            </Box>

                            <Box sx={{ marginTop: "1rem" }}>
                                {tipo_pergunta === 2 && <MultiplaEscolha onChange={(e) => setOpcao(e.target.value)} />}
                            </Box>

                        </Box>
                        <Button onClick={SendAddQuestion} variant="contained" sx={{ mt: 2, display: 'block' }}>Enviar</Button>
                    </Card>

                </Box>
            </Modal>


            {/* Mensagens */}

            <Snackbar open={open_message} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Formulário criado com sucesso!
                </Alert>
            </Snackbar>

        </ContainerContent>
    )
}