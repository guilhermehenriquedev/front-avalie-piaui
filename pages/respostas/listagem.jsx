import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import MuiDataTable from "../../components/MuiDataTable";
import ContainerContent from "../../components/ContainerContent";
import * as utils from '../../helpers/utils'


export default function Respostas() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Adicione o estado isLoading

    var access = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_access
    var refresh = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_refresh

    const getData = async () => {
        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/respostas?access=${access}&refresh=${refresh}`);

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
            name: "cpf",
            label: "Cpf",
        },
        {
            name: "id_avaliacao",
            label: "Hash",
        },
        {
            name: "titulo_pesquisa",
            label: "Titulo Pesquisa",
        },
        {
            name: "texto_pergunta",
            label: "Texto da Pergunta",
        },
        {
            name: "texto_resposta",
            label: "Resposta",
        },
        {
            name: "criado_em",
            label: "Data de resposra",
        }
    ];

    const rows = data.map((row, idx) => {
        return {
            reponse_id: row.reponse_id,
            cpf: row.cpf,
            id_avaliacao: row.id_avaliacao,
            titulo_pesquisa: row.titulo_pesquisa,
            texto_pergunta: row.texto_pergunta,
            texto_resposta: row.texto_resposta,
            criado_em: utils.render_datetime(row.criado_em)
        };
    });

    return (

        <ContainerContent title="Listagem de Respostas">

            {isLoading ? ( // Se isLoading for verdadeiro, exiba o spinner de carregamento
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                    <CircularProgress />
                </div>
            ) : ( // Caso contrário, exiba a tabela com os dados
                <MuiDataTable title={''} data={rows} columns={columns}></MuiDataTable>
            )}

        </ContainerContent >

    );
}


