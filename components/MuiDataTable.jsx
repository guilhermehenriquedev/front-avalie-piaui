//import MUIDataTable from "mui-datatables";
import Box from "@mui/material/Box";
import Typography from "@material-ui/core/Typography";
import dynamic from 'next/dynamic'
import MUIDataTable from "mui-datatables";

/* Documentação da biblioteca MUIDataTable
// https://github.com/gregnb/mui-datatables
*/
//const MUIDataTable = dynamic(
//	() => import("mui-datatables"),
//	{ ssr: false }
//)

const options = {

	filterType: "checkbox",
	elevation: 0,
	//responsive: "scrollMaxHeight",
	searchPlaceholder: "Pesquise algum dado...",
	selectableRows: "none",
	tableBodyHeight: "auto",
	filterType: "checkbox",
	resizableColumns: false,
	rowsPerPage: 25,
	rowsPerPageOptions: [5, 10, 25, 50, 100],
	searchAlwaysOpen: false,

	textLabels: {
		//Propriedade para trocar o texto original em inglês para a string que o DEV decidir.
		body: {
			noMatch: "Desculpa, sem registros encontrados", //Sorry, no matching records found
			toolTip: "Ordenar",
			columnHeaderTooltip: (column) => `Ordenado de ${column.label}`,
		},
		pagination: {
			next: "Próxima página", //Next Page
			previous: "Página anterior", //Previous Page
			rowsPerPage: "Linhas por página:", //Rows per page:
			displayRows: "de", //of
		},
		toolbar: {
			search: "Procurar", //Search
			downloadCsv: "Download CSV", //Download CSV
			print: "Print", //Print
			viewColumns: "Ver colunas", //View Columns
			filterTable: "Filtrar tabela", //Filter Table
		},
		filter: {
			all: "Todos os registros", //All
			title: "FILTROS", //FILTERS
			reset: "RESETAR", //RESET
		},
		viewColumns: {
			title: "Exibir colunas", //Show Columns
			titleAria: "Exibir/Esconder colnas da tabela", //Show/Hide Table Columns
		},
		selectedRows: {
			text: "row(s) selected", //row(s) selected
			delete: "Deletar", //Delete
			deleteAria: "Deletar linhas selecionadas", //Delete Selected Rows
		},
	},
};



export default function MuiDataTable(props) {
	//const classes = useStyles();
	return (
		<Box>
			<Typography variant="h6" sx={{ fontWeight: "bold", ml: 2 }}>
				{props.title}
			</Typography>

			<MUIDataTable title={props.title} data={props.data} columns={props.columns} options={options} />
		</Box>
	);
}
