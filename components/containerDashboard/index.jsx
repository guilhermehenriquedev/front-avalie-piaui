import { ContainerCardDashboard } from "./containerCardDashboard";
import { TableDashboard } from "./containerTable";
import { Progresso } from "./containerProgresso"

import { Box } from "@mui/system";

export const ContainerDashboard = () => {
    const averageData = [2.5, 3.7, 4.1, 4.8, 5.0];

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
        }}>
            <Box sx={{ width: "100%", width: "100%" }}>
                <ContainerCardDashboard />
                <TableDashboard />
            </Box>

            {
                /*
                    <Box sx={{ width: "100%", width: "40%" }}>
                        <Progresso data={averageData}/>
                    </Box>
                    */
            }

        </Box>
    );
};