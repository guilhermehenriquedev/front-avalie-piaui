import React, { useState, useContext, useEffect } from "react";
import { SettingsContext } from "../../context/SettingsContext";
import Link from "next/link";
import Head from "next/head";
import LogoAvalie from "./LogoAdmin";

//MUI Components
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

//Ícones
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FullscreenRoundedIcon from "@mui/icons-material/FullscreenRounded";
import DashboardIcon from '@mui/icons-material/Dashboard';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GroupIcon from '@mui/icons-material/Group';
import CampaignIcon from '@mui/icons-material/Campaign';
import SettingsIcon from '@mui/icons-material/Settings';
import GradingIcon from '@mui/icons-material/Grading';


import Users from "../Users";
import FilterOrgao from "../FilterOrgao";

const drawerWidth = 310; //Configuração do tamanho do drawer menu lateral

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "fixed",
		minHeight: "100vh",
		width: drawerWidth,
		"::-webkit-scrollbar": {
			width: "3px",
		},
		"::-webkit-scrollbar-track": {
			boxShadow: "nset 0 0 6px grey",
			borderRadius: "5px",
		},
		"::-webkit-scrollbar-thumb": {
			background: "#5e5e5e",
			borderRadius: "15px",
			height: "2px",
		},
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			position: "fixed",
			overflowX: "hidden", //Esconder scroll horizontal do sidebar
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("xs")]: {
				width: theme.spacing(9),
			},
			["@media (max-width:480px)"]: {
				display: "none", //Retirar o sidebar visível em dispositivos móveis.
			},
		}),
	},
}));



export default function BaseTemplate({ children }) {

	const { openDrawer, changeDrawer } = useContext(SettingsContext); //Coletando estado de fechamento e abertura do Drawer menu via Context API.
	const { themePallete } = useContext(SettingsContext); //Coletando estado de preferência da cor padrão do tema.

	const AppBar = styled(MuiAppBar, {
		shouldForwardProp: (prop) => prop !== "open",
	})(({ theme, open }) => ({
		zIndex: theme.zIndex.drawer + 1,
		display: "flex",
		alignContent: "center",
		justifyContent: "space-between",
		width: "100%",
		flexDirection: "row",
		background: themePallete.navbar,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		...(open && {
			marginLeft: drawerWidth,
			transition: theme.transitions.create(["width", "margin"], {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

	//Custom component que é cada botão de menu do Sidebar
	const CustomListItemButtom = styled(ListItemButton)(() => ({
		marginLeft: "0px",
		marginRight: "10px",
		marginTop: "5px",
		marginBottom: "5px",
		borderLeft: "5px solid transparent",
		"&:hover": {
			background: themePallete.hover,
			borderRadius: "0px 4px 4px 0px",
			borderLeft: `5px solid ${themePallete.navbar}`,
			cursor: "pointer",
			transition: "0.2s ease-out",
		},
		"&:active": {
			background: themePallete.background,
			borderRadius: "0px 4px 4px 0px",
		},
	}));

	//Custom component que é cada botão de submenu do Sidebar
	const CustomListItemText = styled(ListItemButton)(() => ({
		display: "flex",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
		marginRight: "10px",
		borderLeft: "5px solid transparent",
		height: "46px",
		"&:hover": {
			background: themePallete.hover,
			borderRadius: "0px 4px 4px 0px",
			borderLeft: `5px solid ${themePallete.navbar}`,
			cursor: "pointer",
			transition: "0.2s ease-out",
		},
		"&:active": {
			background: themePallete.navbar,
			borderRadius: "0px 4px 4px 0px",
		},
	}));

	//Estados para controlar a abertura e fechamento do Drawer menu.
	const [openDropDownDash, setopenDropDownDash] = useState(false);
	const [openDropDownAvaliacao, setopenDropDownAvaliacao] = useState(false);
	const [openDropDownQuestionarios, setopenDropDownQuestionarios] = useState(false);
	const [openDropDownRespostas, setopenDropDownRespostas] = useState(false);
	const [openDropDownUsuarios, setopenDropDownUsuarios] = useState(false);
	const [openDropDownCanais, setopenDropDownCanais] = useState(false);
	const [openDropDownConfiguracoes, setopenDropDownConfiguracoes] = useState(false);

	//Função que abre e fecha o DropDown do menu Dashboard.
	const handleClickOpenDropdownDash = () => {
		if (openDrawer) {
			setopenDropDownDash(!openDropDownDash);
			setopenDropDownAvaliacao(false);
			setopenDropDownQuestionarios(false);
			setopenDropDownRespostas(false);
			setopenDropDownUsuarios(false);
			setopenDropDownCanais(false);
			setopenDropDownConfiguracoes(false);
		} else {
			changeDrawer();
			setopenDropDownDash(true);
		}
	};

	//Função que abre e fecha o DropDown do menu Avaliacao
	const handleClickOpenDropdownAvaliacao = () => {
		if (openDrawer) {
			setopenDropDownDash(false);
			setopenDropDownAvaliacao(!openDropDownAvaliacao);
			setopenDropDownQuestionarios(false);
			setopenDropDownRespostas(false);
			setopenDropDownUsuarios(false);
			setopenDropDownCanais(false);
			setopenDropDownConfiguracoes(false);
		} else {
			changeDrawer();
			setopenDropDownDash(true);
		}
	};

	//Função que abre e fecha o DropDown do menu Questionarios
	const handleClickOpenDropdownQuestionarios = () => {
		if (openDrawer) {
			setopenDropDownDash(false);
			setopenDropDownAvaliacao(false);
			setopenDropDownQuestionarios(!openDropDownQuestionarios);
			setopenDropDownRespostas(false);
			setopenDropDownUsuarios(false);
			setopenDropDownCanais(false);
			setopenDropDownConfiguracoes(false);
		} else {
			changeDrawer();
			setopenDropDownDash(true);
		}
	};

	//Função que abre e fecha o DropDown do menu Respostas
	const handleClickOpenDropdownRespostas = () => {
		if (openDrawer) {
			setopenDropDownDash(false);
			setopenDropDownAvaliacao(false);
			setopenDropDownQuestionarios(false);
			setopenDropDownRespostas(!openDropDownRespostas);
			setopenDropDownUsuarios(false);
			setopenDropDownCanais(false);
			setopenDropDownConfiguracoes(false);
		} else {
			changeDrawer();
			setopenDropDownDash(true);
		}
	};

	//Função que abre e fecha o DropDown do menu Usuários
	const handleClickOpenDropdownUsuarios = () => {
		if (openDrawer) {
			setopenDropDownDash(false);
			setopenDropDownAvaliacao(false);
			setopenDropDownQuestionarios(false);
			setopenDropDownRespostas(false);
			setopenDropDownUsuarios(!openDropDownUsuarios);
			setopenDropDownCanais(false);
			setopenDropDownConfiguracoes(false);
		} else {
			changeDrawer();
			setopenDropDownDash(true);
		}
	};

	//Função que abre e fecha o DropDown do menu Canais
	const handleClickOpenDropdownCanais = () => {
		if (openDrawer) {
			setopenDropDownDash(false);
			setopenDropDownAvaliacao(false);
			setopenDropDownQuestionarios(false);
			setopenDropDownRespostas(false);
			setopenDropDownUsuarios(false);
			setopenDropDownCanais(!openDropDownCanais);
			setopenDropDownConfiguracoes(false);
		} else {
			changeDrawer();
			setopenDropDownDash(true);
		}
	};

	//Função que abre e fecha o DropDown do menu Configuracoes
	const handleClickOpenDropdownConfiguracoes = () => {
		if (openDrawer) {
			setopenDropDownDash(false);
			setopenDropDownAvaliacao(false);
			setopenDropDownQuestionarios(false);
			setopenDropDownRespostas(false);
			setopenDropDownUsuarios(false);
			setopenDropDownCanais(false);
			setopenDropDownConfiguracoes(!openDropDownConfiguracoes);
		} else {
			changeDrawer();
			setopenDropDownDash(true);
		}
	};


	//Arrow function que dispara a abertura e fechamento do Drawer menu.
	const toggleDrawer = () => {
		changeDrawer();
		setopenDropDownDash(false);
		setopenDropDownAvaliacao(false);
		setopenDropDownQuestionarios(false);
		setopenDropDownRespostas(false);
		setopenDropDownUsuarios(false);
		setopenDropDownCanais(false);
		setopenDropDownConfiguracoes(false);
	};



	function toggleFullScreen() {
		document.documentElement.requestFullscreen();
		if (window.innerHeight == screen.height) {
			document.exitFullscreen();
		}
	}

	if (localStorage.getItem("@avaliepi:user_properties")) {
		var permissions = JSON.parse(localStorage.getItem("@avaliepi:user_properties")).permissions
	} else {
		var permissions = {
			"allow_app_dashboards_nps": false,
			"allow_app_questionario_criar_questionario": false,
			"allow_app_questionario_listagem_questionario": false,
			"allow_app_avaliacao_gerar_avaliacao": false,
			"allow_app_resposta_listagem": false,
			"allow_app_usuario_gerencia_usuario": false,
			"allow_app_usuario_gerencia_grupo": false,
			"allow_app_canais_listagem": false,
			"allow_app_configuracoes_orgao": false,
			"allow_app_configuracoes_servicos": false,
			"allow_app_confguracoes_tipos_servicos": false,
			"allow_app_configuracoes_webhhok": false,
			"allow_admin_dashboard": false,
			"allow_admin_questionarios": false,
			"allow_admin_avaliacao": false,
			"allow_admin_respostas": false,
			"allow_admin_usuarios": false,
			"allow_admin_canais": false,
			"allow_admin_configuracoes": false,
		}

	}
	return (

		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Head>
				<title>Avalie PI</title>
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Box sx={{ display: "flex", width: "100%", height: "100%", background: "#ededed" }}>

				<AppBar position="fixed" elevation={0} open={openDrawer}>
					<Toolbar
						sx={{
							pr: "24px",
						}}>
						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "15px",
								...(openDrawer && { display: "none" }),
							}}>
							<MenuIcon sx={{ "&:hover": { opacity: "0.3", cursor: "pointer" } }} />
						</IconButton>

						<IconButton
							edge="start"
							color="inherit"
							aria-label="open drawer"
							onClick={toggleDrawer}
							sx={{
								marginRight: "15px",
								...(!openDrawer && { display: "none" }),
							}}>
							<ChevronLeftIcon sx={{ "&:hover": { opacity: "0.3", cursor: "pointer" } }} />
						</IconButton>
						<LogoAvalie />

						<IconButton edge="start" color="inherit" aria-label="open drawer" sx={{ ml: 2 }} onClick={toggleFullScreen}>
							<FullscreenRoundedIcon sx={{ color: "#fff", "&:hover": { opacity: "0.3", cursor: "pointer" } }} />
						</IconButton>
					</Toolbar>

					{/*<FilterOrgao />*/}
					<Users />

				</AppBar>

				<Drawer variant="permanent" open={openDrawer} elevation={16}>
					<Toolbar
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							px: [1],
						}}></Toolbar>
					<Divider />


					{permissions.allow_admin_dashboard && (
						<List component="nav">
							{/* Se allow_admin_dashboard for true, renderize o restante do código */}
							<CustomListItemButtom
								onClick={handleClickOpenDropdownDash}
								sx={{
									background: `${openDropDownDash ? themePallete.hover : ""}`,
									borderRadius: `${openDropDownDash ? "0px 4px 4px 0px" : ""}`,
									borderLeft: `${openDropDownDash ? `5px solid ${themePallete.navbar}` : ""}`,
								}}
							>
								<ListItemIcon>
									{openDrawer ? (
										<DashboardIcon sx={{ color: themePallete.navbar }} />
									) : (
										<Tooltip title="Dashboards" TransitionComponent={Zoom} placement="right">
											<DashboardIcon sx={{ color: themePallete.navbar }} />
										</Tooltip>
									)}
								</ListItemIcon>
								<ListItemText
									primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Dashboards</Typography>}
								/>
								{openDropDownDash ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
							</CustomListItemButtom>

							{permissions.allow_app_dashboards_nps && (
								<Collapse in={openDropDownDash} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/dashboard/nps-servicos" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>NPS</Typography>}
												/>
											</CustomListItemText>
										</Link>
									</List>
								</Collapse>
							)}

						</List>
					)}

					{permissions.allow_admin_questionarios && (
						<List component="nav">
							<CustomListItemButtom
								onClick={handleClickOpenDropdownQuestionarios}
								sx={{
									background: `${openDropDownQuestionarios ? themePallete.hover : ""}`,
									borderRadius: `${openDropDownQuestionarios ? "0px 4px 4px 0px" : ""}`,
									borderLeft: `${openDropDownQuestionarios ? `5px solid ${themePallete.navbar}` : ""}`,
								}}>
								<ListItemIcon>
									{openDrawer ? (
										<QuestionAnswerIcon sx={{ color: themePallete.navbar }} />
									) : (
										<Tooltip title="Questionarios" TransitionComponent={Zoom} placement="right">
											<QuestionAnswerIcon sx={{ color: themePallete.navbar }} />
										</Tooltip>
									)}
								</ListItemIcon>
								<ListItemText
									primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Questionários</Typography>}
								/>
								{openDropDownQuestionarios ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
							</CustomListItemButtom>

							{permissions.allow_app_questionario_criar_questionario && (
								<Collapse in={openDropDownQuestionarios} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/questionarios" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Criar Questionário</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}

							{permissions.allow_app_questionario_listagem_questionario && (
								<Collapse in={openDropDownQuestionarios} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/questionarios/list" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Listagem de questionários</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}

						</List>
					)}

					{permissions.allow_admin_avaliacao && (
						<List component="nav">
							<CustomListItemButtom
								onClick={handleClickOpenDropdownAvaliacao}
								sx={{
									background: `${openDropDownAvaliacao ? themePallete.hover : ""}`,
									borderRadius: `${openDropDownAvaliacao ? "0px 4px 4px 0px" : ""}`,
									borderLeft: `${openDropDownAvaliacao ? `5px solid ${themePallete.navbar}` : ""}`,
								}}>
								<ListItemIcon>
									{openDrawer ? (
										<GradingIcon sx={{ color: themePallete.navbar }} />
									) : (
										<Tooltip title="Avaliação" TransitionComponent={Zoom} placement="right">
											<GradingIcon sx={{ color: themePallete.navbar }} />
										</Tooltip>
									)}
								</ListItemIcon>
								<ListItemText
									primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Avaliação</Typography>}
								/>
								{openDropDownAvaliacao ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
							</CustomListItemButtom>

							{permissions.allow_app_avaliacao_gerar_avaliacao && (
								<Collapse in={openDropDownAvaliacao} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/avaliacao/gerar-avaliacao" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Gerar Avaliação</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}
						</List>

					)}

					{permissions.allow_admin_respostas && (
						<List component="nav">
							<CustomListItemButtom
								onClick={handleClickOpenDropdownRespostas}
								sx={{
									background: `${openDropDownRespostas ? themePallete.hover : ""}`,
									borderRadius: `${openDropDownRespostas ? "0px 4px 4px 0px" : ""}`,
									borderLeft: `${openDropDownRespostas ? `5px solid ${themePallete.navbar}` : ""}`,
								}}>
								<ListItemIcon>
									{openDrawer ? (
										<AssignmentIcon sx={{ color: themePallete.navbar }} />
									) : (
										<Tooltip title="Respostas" TransitionComponent={Zoom} placement="right">
											<AssignmentIcon sx={{ color: themePallete.navbar }} />
										</Tooltip>
									)}
								</ListItemIcon>
								<ListItemText
									primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Respostas</Typography>}
								/>
								{openDropDownRespostas ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
							</CustomListItemButtom>

							{permissions.allow_app_resposta_listagem && (
								<Collapse in={openDropDownRespostas} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/respostas/listagem" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Listagem de respostas</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}
						</List>
					)}

					{permissions.allow_admin_usuarios && (
						<List component="nav">
							<CustomListItemButtom
								onClick={handleClickOpenDropdownUsuarios}
								sx={{
									background: `${openDropDownUsuarios ? themePallete.hover : ""}`,
									borderRadius: `${openDropDownUsuarios ? "0px 4px 4px 0px" : ""}`,
									borderLeft: `${openDropDownUsuarios ? `5px solid ${themePallete.navbar}` : ""}`,
								}}>
								<ListItemIcon>
									{openDrawer ? (
										<GroupIcon sx={{ color: themePallete.navbar }} />
									) : (
										<Tooltip title="Usuários" TransitionComponent={Zoom} placement="right">
											<GroupIcon sx={{ color: themePallete.navbar }} />
										</Tooltip>
									)}
								</ListItemIcon>
								<ListItemText
									primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Usuários</Typography>}
								/>
								{openDropDownUsuarios ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
							</CustomListItemButtom>

							{permissions.allow_app_usuario_gerencia_usuario && (
								<Collapse in={openDropDownUsuarios} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/usuarios" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Gerencia de usuários</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}

							{permissions.allow_app_usuario_gerencia_grupo && (
								<Collapse in={openDropDownUsuarios} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/usuarios/grupos" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Gerencia de grupos</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}

						</List>
					)}

					{permissions.allow_admin_canais && (
						<List component="nav">
							<CustomListItemButtom
								onClick={handleClickOpenDropdownCanais}
								sx={{
									background: `${openDropDownCanais ? themePallete.hover : ""}`,
									borderRadius: `${openDropDownCanais ? "0px 4px 4px 0px" : ""}`,
									borderLeft: `${openDropDownCanais ? `5px solid ${themePallete.navbar}` : ""}`,
								}}>
								<ListItemIcon>
									{openDrawer ? (
										<CampaignIcon sx={{ color: themePallete.navbar }} />
									) : (
										<Tooltip title="Canais" TransitionComponent={Zoom} placement="right">
											<CampaignIcon sx={{ color: themePallete.navbar }} />
										</Tooltip>
									)}
								</ListItemIcon>
								<ListItemText
									primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Canais</Typography>}
								/>
								{openDropDownCanais ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
							</CustomListItemButtom>

							{permissions.allow_app_canais_listagem && (
								<Collapse in={openDropDownCanais} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/canais" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Lista de canais</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}
						</List>
					)}


					{permissions.allow_admin_configuracoes && (
						<List component="nav">
							<CustomListItemButtom
								onClick={handleClickOpenDropdownConfiguracoes}
								sx={{
									background: `${openDropDownConfiguracoes ? themePallete.hover : ""}`,
									borderRadius: `${openDropDownConfiguracoes ? "0px 4px 4px 0px" : ""}`,
									borderLeft: `${openDropDownConfiguracoes ? `5px solid ${themePallete.navbar}` : ""}`,
								}}>
								<ListItemIcon>
									{openDrawer ? (
										<SettingsIcon sx={{ color: themePallete.navbar }} />
									) : (
										<Tooltip title="Configurações" TransitionComponent={Zoom} placement="right">
											<SettingsIcon sx={{ color: themePallete.navbar }} />
										</Tooltip>
									)}
								</ListItemIcon>
								<ListItemText
									primary={<Typography sx={{ fontSize: "14px", color: "#474747", fontWeight: "bold" }}>Configurações</Typography>}
								/>
								{openDropDownConfiguracoes ? <ExpandLess sx={{ fontSize: "15px" }} /> : <ExpandMore sx={{ fontSize: "15px" }} />}
							</CustomListItemButtom>

							{permissions.allow_app_configuracoes_orgao && (
								<Collapse in={openDropDownConfiguracoes} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/configuracoes/orgaos" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Orgãos</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}

							{permissions.allow_app_configuracoes_servicos && (
								<Collapse in={openDropDownConfiguracoes} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/configuracoes/servicos" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Serviços</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}

							{permissions.allow_app_confguracoes_tipos_servicos && (
								<Collapse in={openDropDownConfiguracoes} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/configuracoes/tipos-de-servicos" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Tipos de Serviços</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}

							{permissions.allow_app_configuracoes_webhhok && (
								<Collapse in={openDropDownConfiguracoes} timeout="auto" unmountOnExit>
									<List component="div">
										<Link href="/configuracoes/webhook" passHref>
											<CustomListItemText>
												<ListItemIcon sx={{ pl: 4 }}>
													<FiberManualRecordIcon sx={{ fontSize: "8px" }} />
												</ListItemIcon>
												<ListItemText
													primary={<Typography sx={{ fontSize: "14px", color: "#616161" }}>Webhooks</Typography>}
												/>
											</CustomListItemText>
										</Link>

									</List>
								</Collapse>
							)}
						</List>
					)}

				</Drawer>

				<Box
					sx={{
						display: "flex",
						width: "100%",
						height: "100%",
						minHeight: "100vh",
						marginLeft: !openDrawer ? "60px" : "300px",
						background: themePallete.background,
						["@media (max-width:480px)"]: {
							marginLeft: "0px",
						},
					}}>
					{children}
				</Box>
			</Box>
		</Box>
	);
}
