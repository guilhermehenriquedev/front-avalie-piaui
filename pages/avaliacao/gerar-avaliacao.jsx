import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircularProgress from '@mui/material/CircularProgress';

import AvaliacaoModal from '../../components/modal_create_avaliacao';
import MuiDataTable from "../../components/MuiDataTable";
import ContainerContent from "../../components/ContainerContent";

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import * as utils from "../../helpers/utils";
import * as token from "../../helpers/authorization"

export default function GerarAvaliacao() {

    var access = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_access
    var refresh = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_refresh

    const [data, setData] = useState([]);
    const [isModalAvaliacao, setIsModalAvaliacao] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Adicione o estado isLoading
    const [open_message, setOpenMessage] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenMessage(false);
    };

    const openModalAvaliacao = () => {
        setIsModalAvaliacao(true);
    };

    const closeModalAvaliacao = () => {
        setIsModalAvaliacao(false);
    };

    const handleFormUserSubmit = async (dataNewAvaliacao) => {

        function getDataHoraAtual() {
            const dataAtual = new Date();
            const dia = String(dataAtual.getDate()).padStart(2, '0');
            const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
            const ano = dataAtual.getFullYear();
            const horas = String(dataAtual.getHours()).padStart(2, '0');
            const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
            const segundos = String(dataAtual.getSeconds()).padStart(2, '0');

            return `${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
        }

        const dataHoraFormatada = getDataHoraAtual();
        const _token = await token.verify(access, refresh)

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${_token}`);


        try {

            var raw = JSON.stringify({
                "idService": dataNewAvaliacao.idservice,
                "idOrgao": dataNewAvaliacao.idorgao,
                "cpf": dataNewAvaliacao.cpf,
                "protocolo": dataNewAvaliacao.protocolo,
                "idCanalPrestacao": dataNewAvaliacao.idcanalprestacao,
                "idCanalAvaliacao": dataNewAvaliacao.idcanalavaliacao,
                "idPesquisa": dataNewAvaliacao.ididpesquisa,
                "criado_em": dataHoraFormatada,
                "nome": dataNewAvaliacao.nome,
                "telefone": dataNewAvaliacao.telefone,
                "email": dataNewAvaliacao.email
            });


            const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/Avaliacao/create/`, {
                method: 'POST',
                body: raw,
                headers: myHeaders
            })

            let data = await result.json()

            if (data.assessment_created) {
                setOpenMessage(true);
                closeModalAvaliacao()
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/avaliacao?access=${access}&refresh=${refresh}`);

            let responseData = await response.json();
            setData(responseData.data);


        } catch (err) {

            setData([]);

        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => getData(), [])


    const columns = [
        {
            name: "hash",
            label: "Visualização",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    const link_acoes = `${process.env.NEXT_PUBLIC_AVALIACAO_URL}/${value}`
                    return (
                        <Link href={link_acoes} passHref >
                            <Tooltip title="Ações">
                                <IconButton>
                                    <VisibilityIcon />
                                </IconButton>
                            </Tooltip>
                        </Link>
                    )
                },
            }
        },
        {
            name: "hash",
            label: "Hash",
        },
        {
            name: "servico",
            label: "Serviço",
        },
        {
            name: "orgao",
            label: "Orgão",
        },
        {
            name: "cpf",
            label: "Cpf",
        },
        {
            name: "protocolo",
            label: "Protocolo",
        },
        {
            name: "canal_prestacao",
            label: "Canal Prestação",
        },
        {
            name: "canal_avaliacao",
            label: "Canal Avaliação",
        },
        {
            name: "criado_em",
            label: "Data de criação",
        },
        {
            name: "respondido_em",
            label: "Data da resposta",
        }
    ];

    const rows = data.map((row, idx) => {
        return {
            id: row.id,
            hash: row.hash,
            servico: row.servico,
            orgao: row.orgao,
            cpf: row.cpf,
            protocolo: row.protocolo,
            canal_prestacao: row.canal_prestacao,
            canal_avaliacao: row.canal_avaliacao,
            criado_em: utils.render_datetime(row.criado_em),
            respondido_em: utils.render_datetime(row.respondido_em)
        };
    });

    return (

        <ContainerContent>

            <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>

                <Button
                    variant="contained"
                    size="large"
                    startIcon={<AddIcon />}
                    disableElevation
                    onClick={openModalAvaliacao}
                >
                    Gerar nova avaliação
                </Button>

                <AvaliacaoModal isOpen={isModalAvaliacao} onClose={closeModalAvaliacao} onSubmit={handleFormUserSubmit} token_access={access} token_refresh={refresh} />

            </Stack>

            {isLoading ? ( // Se isLoading for verdadeiro, exiba o spinner de carregamento
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress />
                </div>
            ) : ( // Caso contrário, exiba a tabela com os dados
                <MuiDataTable title={''} data={rows} columns={columns}></MuiDataTable>
            )}

            <Snackbar open={open_message} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Avaliação gerada com sucesso!
                </Alert>
            </Snackbar>

        </ContainerContent >

    );
}


