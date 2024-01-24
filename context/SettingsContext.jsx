import React, { useState, useEffect, createContext } from "react";
import {
	darkTheme,
	redTheme,
	blueTheme,
	greenTheme,
	yellowTheme,
	purpleTheme,
	pinkTheme,
	darkBlueTheme,
	darkGreenTheme,
	orangeTheme,
	greyTheme,
	seaBlueTheme,
} from "../components/Temas";

export const SettingsContext = createContext({});

export default function SettingsProvider({ children }) {
	const [openDrawer, setOpenDrawer] = useState(false);
	const [themePallete, setTheme] = useState(darkTheme); //Estado para armazenar o tema default da aplicação, caso não exista algum salvo no localStorage

	//Carregar o tema no inicio da aplicação
	useEffect(() => {
		getThemeLocalStorage();
	}, []);

	//Função para coletar o tema no localStorage do navegador
	const getThemeLocalStorage = async () => {
		const theme = localStorage.getItem("@avaliepi:theme");
		if (theme) {
			setTheme(JSON.parse(theme));
		} else {
			console.log("Sem tema predefinido!");
		}
	};

	//Controlador de abertura e fechamento do Drawer contido no componente Layout
	function changeDrawer() {
		setOpenDrawer(!openDrawer);
	}

	//Função para alterar o tema e gravá-lo no localStorage
	async function changeThemePallete(newTheme) {
		const listaTemas = {
			darkTheme: darkTheme,
			redTheme: redTheme,
			blueTheme: blueTheme,
			greenTheme: greenTheme,
			yellowTheme: yellowTheme,
			purpleTheme: purpleTheme,
			pinkTheme: pinkTheme,
			darkBlueTheme: darkBlueTheme,
			darkGreenTheme: darkGreenTheme,
			orangeTheme: orangeTheme,
			greyTheme: greyTheme,
			seaBlueTheme: seaBlueTheme,
		};
		await localStorage.setItem("@avaliepi:theme", JSON.stringify(listaTemas[`${newTheme}`]));
		setTheme(listaTemas[`${newTheme}`]);
	}

	return <SettingsContext.Provider value={{ openDrawer, changeDrawer, themePallete, changeThemePallete }}>{children}</SettingsContext.Provider>;
}
