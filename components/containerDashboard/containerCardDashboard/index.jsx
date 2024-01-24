import styles from "./card.module.css";
import { CardDashboard } from "./card"

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import GroupIcon from '@mui/icons-material/Group';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

export const ContainerCardDashboard = () => {
    return (
        <Box sx={{ margin: "1rem 0" }}>
            <Grid container spacing={3}>
                <Grid item xs={1} sm={6} md={2.4}>
                    <CardDashboard
                        icone={<GroupIcon id={styles.contentCard} fontSize="large" sx={{ color: "gray" }} />}
                        quantidade="128"
                        texto="Usuários"
                    />
                </Grid>

                <Grid item xs={1} sm={6} md={2.4}>
                    <CardDashboard
                        icone={<AccountBalanceOutlinedIcon id={styles.contentCard} fontSize="large" sx={{ color: "gray" }} />}
                        quantidade="32"
                        texto="Orgãos"
                    />
                </Grid>

                <Grid item xs={1} sm={6} md={2.4}>
                    <CardDashboard
                        icone={<Inventory2OutlinedIcon id={styles.contentCard} fontSize="large" sx={{ color: "gray" }} />}
                        quantidade="2"
                        texto="Serviços"
                    />
                </Grid>

                <Grid item xs={1} sm={6} md={2.4}>
                    <CardDashboard
                        icone={<EventAvailableOutlinedIcon id={styles.contentCard} fontSize="large" sx={{ color: "gray" }} />}
                        quantidade="4"
                        texto="Avaliações"
                    />
                </Grid>

                <Grid item xs={1} sm={6} md={2.4}>
                    <CardDashboard
                        icone={<AppRegistrationIcon id={styles.contentCard} fontSize="large" sx={{ color: "gray" }} />}
                        quantidade="4"
                        texto="Respostas"
                    />
                </Grid>
            </Grid>
        </Box>
    )
}