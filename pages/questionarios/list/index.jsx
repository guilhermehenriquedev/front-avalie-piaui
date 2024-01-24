import React, { Component, useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';

import MuiDataTable from "../../../components/MuiDataTable";
import ContainerContent from "../../../components/ContainerContent";
import * as utils from '../../../helpers/utils';
import ModalVizuQuestionario from '@/components/modal_vizualizar_questionario';



export default function Questionarios() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Adicione o estado isLoading

    var access = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_access
    var refresh = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).token_refresh

    const getData = async () => {


        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/questionarios?access=${access}&refresh=${refresh}`);

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
            name: "survey_id",
            label: "Vizualizar",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <>
                            <ModalVizuQuestionario id={value} token_access={access} token_refresh={refresh}/>
                        </>
                    )
                },
            }
        },
        {
            name: "orgao",
            label: "Orgão",
        },
        {
            name: "titulo",
            label: "Titulo",
        },
        {
            name: "descricao",
            label: "Descrição do Formulário",
        },
        {
            name: "criado_em",
            label: "Criado em",
        },
        {
            name: "atualizado_em",
            label: "Atualizado em",
        },
        {
            name: "username",
            label: "Usuário que criou",
        },
        {
            name: "tipo_servico",
            label: "Tipo do serviço",
        },
    ];

    const rows = data.map((row, idx) => {
        return {
            survey_id: row.survey_id,
            orgao: row.orgao,
            titulo: row.titulo,
            descricao: row.descricao,
            criado_em: utils.render_datetime(row.criado_em),
            atualizado_em: utils.render_datetime(row.atualizado_em),
            username: row.username,
            is_active: utils.render_true_false(row.is_active),
            tipo_servico: row.tipo_servico,
            estado: row.estado
        };
    });

    return (

        <ContainerContent title="Listagem de questionários">

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


