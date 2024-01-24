import React, { useState, useContext, useEffect, forwardRef } from "react";
import { SettingsContext } from "../context/SettingsContext";
import { AuthContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

//Ícones
import ListItemIcon from "@mui/material/ListItemIcon";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import Logout from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";

//Custom components
import Temas from "./Temas";

export default function AccountMenu() {
	const CustomImage = styled(Image)(() => ({
		borderRadius: "50%",
	}));

	const { themePallete } = useContext(SettingsContext);
	const { user, logoutUser } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const [openTemas, setOpenTemas] = useState(false);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const Transition = forwardRef(function Transition(props, ref) {
		return <Slide direction="up" ref={ref} {...props} />;
	});

	const handleClickOpen = () => {
		setOpenTemas(true);
	};

	const handleClickClose = () => {
		setOpenTemas(false);
		setAnchorEl(null);
	};

	const handleOption = (event) => {
		//Verifica qual opção foi selecionada no component User

		event.target.value == 4 ? logoutUser() : null

	}

	
	const setLocalStorage = async () => {
		//Coleta as informações do usuário logado e coloca no localstorage
		localStorage.setItem("@avaliepi:user_properties", JSON.stringify(user))
	}

	useEffect(() => {
        setLocalStorage()
      }, []);


	return (
		<>

			<span id="secretaria" hidden>{user.secretaria}</span>

			<Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
				<Tooltip title="Configurações do perfil">
					<IconButton onClick={handleClick} sx={{ marginRight: "8px" }}>
						<MoreVertIcon sx={{ color: "#fff", fontSize: "30px" }} />
					</IconButton>
				</Tooltip>
			</Box>
			
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClick={handleOption}
				onClose={handleClickClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
				<MenuItem value="1">
					<Typography id="user_name" variant="body2" sx={{ marginLeft: "10px" }}>
						Bem vindo(a):  {user.name}
					</Typography>
				</MenuItem>
				<MenuItem value="4">
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Sair
				</MenuItem>
				
				<Divider />
				<Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", p: 1 }}>
					<Button
						id="#temas"
						variant="outlined"
						sx={{ width: "100%" }}
						onClick={handleClickOpen}
						startIcon={<FormatColorFillIcon fontSize="small" />}>
						Temas
					</Button>
				</Box>

				<Dialog open={openTemas} TransitionComponent={Transition} keepMounted onClose={handleClickClose}>
					<DialogTitle sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>Selecione um tema disponível!</DialogTitle>
					<Divider />
					<Temas />
				</Dialog>
			</Menu>
		</>
	);
}
