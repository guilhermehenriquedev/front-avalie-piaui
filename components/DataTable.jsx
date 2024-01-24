import React, { useContext } from "react";
import { SettingsContext } from "../context/SettingsContext";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import {
	DataGrid,
	GridToolbar,
	ptBR,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
	GridToolbarExport,
	GridToolbarDensitySelector,
} from "@mui/x-data-grid";

export default function DataTable(props) {
	const { themePallete } = useContext(SettingsContext);

	function CustomToolbar() {
		return (
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					mb: 2,
					mr: 2,
					mt: 2,
				}}>
				<GridToolbarContainer>
					<GridToolbarColumnsButton
						sx={{
							color: themePallete.navbar,
							"&:hover": {
								cursor: "pointer",
								backgroundColor: themePallete.hover,
							},
							["@media (max-width:768px)"]: {
								display: "none", //Retirar o sidebar visível em dispositivos móveis.
							},
						}}
					/>
					<GridToolbarFilterButton
						sx={{
							color: themePallete.navbar,
							"&:hover": {
								cursor: "pointer",
								backgroundColor: themePallete.hover,
							},
							["@media (max-width:768px)"]: {
								display: "none", //Retirar o sidebar visível em dispositivos móveis.
							},
						}}
					/>
					<GridToolbarDensitySelector
						sx={{
							color: themePallete.navbar,
							"&:hover": {
								cursor: "pointer",
								backgroundColor: themePallete.hover,
							},
							["@media (max-width:768px)"]: {
								display: "none", //Retirar o sidebar visível em dispositivos móveis.
							},
						}}
					/>
					<GridToolbarExport
						sx={{
							color: themePallete.navbar,
							"&:hover": {
								cursor: "pointer",
								backgroundColor: themePallete.hover,
							},
							["@media (max-width:768px)"]: {
								display: "none", //Retirar o sidebar visível em dispositivos móveis.
							},
						}}
					/>
				</GridToolbarContainer>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }}>
				{props.title}
			</Typography>
			<DataGrid
				localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
				sx={{ border: "none" }}
				rows={props.rows}
				columns={props.columns}
				autoPageSize={true}
				autoHeight={true}
				components={{
					Toolbar: CustomToolbar,
				}}
				disableColumnMenu
				disableSelectionOnClick
				disableColumnResize={true}
				pageSize={10}
			/>
		</Box>
	);
}
