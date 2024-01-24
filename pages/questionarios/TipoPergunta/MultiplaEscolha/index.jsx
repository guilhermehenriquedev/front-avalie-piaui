import { useState } from "react";

import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

import ModalQuestionario from "pages/questionarios/Modal";

export const MultiplaEscolha = () => {
    const [opcoes, setOpcoes] = useState([]);
    const [novaOpcao, setNovaOpcao] = useState("");

    const [alterarModal, setAlterarModal] = useState(false);

    const addNovaOpcao = () => {
        opcoes.push(novaOpcao);

        setNovaOpcao("");

        setAlterarModal(false);
    };

    const abrirModal = () => {
        setAlterarModal(true);
    };


    return (

        <FormControl>
            <FormLabel>Opções</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                id="form-options"
            >
                {opcoes.map((opcao, idx) => {
                    return <FormControlLabel key={idx} id={idx} value={opcao} control={<Radio />} label={opcao} />
                })}
            </RadioGroup>

            <ModalQuestionario closeModal={alterarModal} openModal={abrirModal}>
                <Box sx={{
                    display: "flex",
                    gap: "1rem",
                }}>
                    <TextField
                        id="outlined-basic"
                        label="Digite uma nova opção"
                        variant="outlined"
                        size="small"
                        value={novaOpcao}
                        onChange={(e) => setNovaOpcao(e.target.value)}
                    />

                    <Button
                        size="small"
                        variant="contained"
                        onClick={addNovaOpcao}
                    >
                        Adicionar
                    </Button>
                </Box>

            </ModalQuestionario>
        </FormControl>

    );
}

export default MultiplaEscolha;