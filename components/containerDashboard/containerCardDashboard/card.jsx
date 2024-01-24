import styles from "./card.module.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';



export const CardDashboard = ({ icone, quantidade, texto }) => {
    return (
        <Card sx={{ boxShadow: "0px 0px 5px #0004" }}>
            <CardContent
                className={styles.card}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                }}>

                {icone}

                <Typography id={styles.contentCard} sx={{
                    color: "gray",
                    fontWeight: "600",
                }}>
                    {quantidade}
                </Typography>

                <Typography id={styles.contentCard} sx={{ color: "gray" }}>
                    {texto}
                </Typography>

            </CardContent>
        </Card>
    )
}