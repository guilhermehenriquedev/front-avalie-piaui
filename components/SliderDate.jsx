import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { subtractDate, render_date } from '../helpers/utils'
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from "moment";


export default function RangeSlider(props) {

    const [value, setValue] = useState([970, 1000]);
    const [dataInicio, setDataInicio] = useState();
    const [dataFim, setDataFim] = useState();

    var min = 0
    var max = 1000
    var last_days = 30

    let rangeInicio = new Date(subtractDate(new Date(), last_days))
    let rangeFinal = new Date()

    useEffect(() => {
        setDataInicio(rangeInicio)
        setDataFim(rangeFinal)
    }, [])

    const handleChange = (event, newValue) => {

        if (newValue[0] < min || newValue[0] > max || newValue[1] < min || newValue[1] > max) {
            console.log('Value Max, Min... ')

        } else {
            setValue(newValue);
            setDataInicio(new Date(subtractDate(new Date(), max - newValue[0], false)));
            setDataFim(new Date(subtractDate(new Date(), max - newValue[1], false)));

            console.log('FILHO............')
            console.log(moment(dataInicio).format('YYYY-MM-DD'), moment(dataFim).format('YYYY-MM-DD'))

            props.onChange(moment(dataInicio).format('YYYY-MM-DD'), moment(dataFim).format('YYYY-MM-DD'))

        }
    };

    const handleCalendarInicio = (newDate) => {

        setDataInicio(newDate);
        setValue([max - moment(dataFim).diff(moment(newDate), 'days'), max - moment(dataFim).diff(moment(new Date()), 'days')])

    }

    const handleCalendarFinal = (newDate) => {

        setDataFim(newDate);
        setValue([max - moment(newDate).diff(moment(dataInicio), 'days'), max + moment(newDate).diff(moment(new Date()), 'days')])

    }

    return (

        <Grid container spacing={0} sx={{ background: "#fff", borderRadius: "8px" }}>
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ height: "300px", padding: "5px" }}>

                <Stack direction="row" spacing={2} sx={{ mt: 2, mb: 2 }}>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Data inicio"
                            value={dataInicio}
                            onChange={handleCalendarInicio}
                            renderInput={(params) => <TextField {...params} />}

                        />

                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Data final"
                            value={dataFim}
                            onChange={handleCalendarFinal}
                            renderInput={(params) => <TextField {...params} />}

                        />

                    </LocalizationProvider>

                </Stack>

            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={6} xl={6} sx={{ height: "300px", padding: "5px" }}>

                <Box sx={{ width: 300 }}>
                    <Slider
                        getAriaLabel={() => 'range'}
                        min={min}
                        max={max}
                        value={value}
                        onChange={handleChange}
                        getAriaValueText={() => { }}
                    />
                </Box>

            </Grid>
        </Grid>

    );
}

