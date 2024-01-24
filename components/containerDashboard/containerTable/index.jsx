import { useState } from "react";
import Link from 'next/link';

import { Box } from "@mui/system";
import ReorderIcon from '@mui/icons-material/Reorder';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import MuiDataTable from '../../MuiDataTable';

export const TableDashboard = () => {

    const [data, setData] = useState([]);

    const columns = [
        {
            name: "Hash",
            label: "Hash",
        },
        {
            name: "Data",
            label: "Data",
        },
        {
            name: "Header",
            label: "Header",
        }
    ];

    const rows = data.map((row, idx) => {
        return {
            id: idx,
            sigla: row.sigla,
        };
    });

    return (
        <Box sx={{ marginLeft: "0rem", marginTop: "1rem", boxShadow: "0px 0px 5px #0004" }}>
            <MuiDataTable
                title={'Últimas Avaliações'}
                data={rows}
                columns={columns}>
            </MuiDataTable>
        </Box>
    );
};