import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

export default function FilterOrgao() {

    const [orgaos, setOrgaos] = useState([]);

    const fetchOrgaos = async () => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_PORTAL_URL}/api/configuracoes/orgaos`, {
            method: 'GET',
        })

        let data = await response.json()
        setOrgaos(data.data);

    };

    useEffect(() => {
        fetchOrgaos();
    }, []);

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    
                </InputLabel>
                <NativeSelect
                    fullWidth
                    defaultValue={30}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    {orgaos.map((service) => (
                        <option key={service.id} value={service.id}>{service.nome}</option>
                    ))}
                </NativeSelect>
            </FormControl>
        </Box>

    );
}
