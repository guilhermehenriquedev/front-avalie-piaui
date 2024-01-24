import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@material-ui/core/Typography";
import Divider from "@mui/material/Divider";
import ContainerNav from "components/ContainerNav";

export default function ContainerContent(props) {
	return (
		<Box sx={{ width: "100%", height: "100%"}}>
			<Toolbar />
			<Container maxWidth="full" sx={{ mt: 2, mb: 2 }} >
				<ContainerNav />
				
				<Grid container spacing={0} >
					<Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

						<Typography
							variant="h6"
							sx={{
								fontWeight: "normal",
								fontSize: {
									lg: 16,
									md: 16,
									sm: 16,
									xs: 16,
								},
							}}>
							{props.legend}
						</Typography>
						<br></br>
						<Paper
							sx={{
								p: 1,
								display: "flex",
								flexDirection: "column",
								background: "#00RRGGBB",
								
							}}
							elevation={0}
							>
							<Typography
								variant="h5"
								sx={{
									fontWeight: "bold",
									fontSize: {
										lg: 24,
										md: 20,
										sm: 16,
										xs: 16,
									},
								}}>
									
								{props.title}
								
							</Typography>
							
							<br></br>
							{props.children}
						</Paper>
						
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
}
