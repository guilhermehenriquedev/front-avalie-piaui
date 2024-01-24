import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import { SettingsContext } from "../context/SettingsContext";

export default function ConfiguracoesDeInterface() {
	const { changeThemePallete } = useContext(SettingsContext);

	function changeColor(e) {
		changeThemePallete(e.target.id);
	}

	return (
		<Grid container spacing={1} sx={{ padding: 1 }}>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="darkTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#000000", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="redTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#eb3d35", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="blueTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#1862d9", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="greenTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#0acc9f", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="yellowTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#ffab00", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="purpleTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#4a148c", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="pinkTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#ff1ca0", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="darkBlueTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#162447", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="darkGreenTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#004d40", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="orangeTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#dd2c00", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="greyTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#263238", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
			<Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{ padding: "5px", height: "100px" }}>
				<Box
					id="seaBlueTheme"
					onClick={changeColor}
					sx={{ widht: "100%", height: "100%", background: "#006064", cursor: "pointer", borderRadius: "4px" }}
				/>
			</Grid>
		</Grid>
	);
}

//TODOS OS TEMAS DEVEM CONTER OS MESMOS CAMPOS/PROPRIEDADES

export const darkTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#000",
	hover: "#cccccc",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",


};

export const redTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#eb3d35",
	hover: "#ffd6d4",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const blueTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#1862d9",
	hover: "#a4bfeb",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const greenTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#0acc9f",
	hover: "#93e6d2",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const yellowTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#ffab00",
	hover: "#fff59d",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const purpleTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#4a148c",
	hover: "#e1bee7",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const pinkTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#ff1ca0",
	hover: "#ffb5e0",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const darkBlueTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#162447",
	hover: "#8cb4e6",
	background: "#FFFFFF",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const darkGreenTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#004d40",
	hover: "#b2dfdb",
	background: "#e0f2f1",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const orangeTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#dd2c00",
	hover: "#ffccbc",
	background: "#ffccbc",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const greyTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#263238",
	hover: "#b0bec5",
	background: "#eceff1",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};

export const seaBlueTheme = {
	body: "#fff",
	textTitleColor: "#000",
	textBodyColor: "#000",
	textSmallColor: "#000",
	fontColor: "#000",
	navbar: "#006064",
	hover: "#b2ebf2",
	background: "#e0f7fa",
	sidebarBackground: "#fff",
	backgroundContainerContent: "#fff",
};
