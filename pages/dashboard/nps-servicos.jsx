import React, { useState, useEffect } from "react";
import ContainerContent from "@/components/ContainerContent";
import MuiDataTable from "@/components/MuiDataTable";
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ReorderIcon from '@mui/icons-material/Reorder';
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import DoneIcon from "@mui/icons-material/Done";

import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

import GridPainelNps from "components/GridPainelNps";
import { ContainerDashboard } from "../../components/containerDashboard"

export default function Usuarios() {

    const [data_avaliacoes, setData] = useState([]);

    const getData = async () => {
        //Função para buscar todos os usuários da empresa do usuário logado
        /*
        try {
            const _secretaria = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).secretaria
            const response = await fetch(`${process.env.NEXT_PUBLIC_AVALIE_URL}/api/users_ldap/?secretaria=${_secretaria}`);

            let responseData = await response.json();

            setData(responseData.data ? responseData.data : []);


        } catch (err) {

            setData([]);
            

        } finally {
            //setLoading(false);
        }
        */
    }

    useEffect(() => {
        getData()
    }, []);

    const columns = [
        {
            name: "hash",
            label: "Hash"
        },
        {
            name: "data",
            label: "Data"
        },
        {
            name: "header",
            label: "Header"
        }
    ]

    const rows = data_avaliacoes.map((row, idx) => {

        return {
            id: idx,
            hash: row.hash,
            data: row.data,
            header: row.header,
        };
    })


    return (
        <ContainerContent>
            <ContainerDashboard />
        </ContainerContent>
    );
}
