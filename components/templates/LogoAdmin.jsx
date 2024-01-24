import React, { useState, useContext } from "react";
import Grid from "@material-ui/core/Grid";

export default function LogoAdmin() {

	return (
		<>
			<Grid
				container
				spacing={1}
				//onClick={goToHomePageLink}
				sx={{
					":hover": {
						opacity: "0.7",
						cursor: "pointer",
					},
				}}>



				<Grid
					item
					style={{
						fontFamily: "Righteous",
						display: "grid",
						gridAutoFlow: "column",
						alignItems: "center",
						justifyItems: "flex-start",
						display: "flex",
						fontSize: 20,

					}}>

					<span>Sistema de avaliação</span>
				</Grid>
			</Grid>
		</>
	);
}
