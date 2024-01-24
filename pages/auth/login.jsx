import Link from "next/link";
import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { parseCookies } from "nookies";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Head from "@/components/Head";


//Ícones
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import HttpsIcon from "@mui/icons-material/Https";

export default function Login() {
	const { register, handleSubmit, setValue } = useForm();
	const { signIn } = useContext(AuthContext);
	const [erros, setErros] = useState("");
	const [remember, setRemember] = useState(false);

	useEffect(() => getRememberMe(), [])

	async function handleSignIn(data) {
		const req = await signIn(data);

		req ? setErros(JSON.parse(req)) : null;
		remember ? handleRememberMe(data.email) : null;

	}

	const checkRememberMe = () => {
		var save = remember ? false : true;

		setRemember(save);
		!save ? localStorage.removeItem("@avaliepi:email") : null;

	}

	const handleRememberMe = (email) => {
		localStorage.setItem("@avaliepi:email", JSON.stringify(email));
	}



	const getRememberMe = () => {
		const email = localStorage.getItem("@avaliepi:email");

		if (email) {
			setValue("email", JSON.parse(email));
			setRemember(true);

		}
	}

	const handleErros = () => {

		if (erros.cod == "2") {

			return (
				<>
					<TextField
						error
						{...register("email")}
						type="email"
						margin="normal"
						required
						fullWidth
						id="email-address"
						label="E-mail"
						name="email"
						autoComplete="email"
						autoFocus
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<AlternateEmailIcon />
								</InputAdornment>
							),
						}}
					/>
					<TextField
						error
						helperText={erros.msg}
						{...register("password")}
						margin="normal"
						required
						fullWidth
						name="password"
						label="Senha"
						type="password"
						id="password"
						autoComplete="current-password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<HttpsIcon />
								</InputAdornment>
							),
						}}
					/>
				</>
			)

		}
	}	

	const CustomContainerGradient = styled(Box)(() => ({
		flex: 1,
		height: "107vh",
		display: "flex",
		alignItems: "flex-start",
		flexDirection: "column",
		justifyContent: "center",
		background: "url(/img/backgroung_login.svg)",
		backgroundSize: "cover", // Torna a imagem de fundo responsiva
		backgroundPosition: "center", // Posiciona a imagem no centro
		padding: "100px",
	  }));
	  
	  const CustomContainerLogin = styled(Box)(() => ({
		background: "#fff",
		flex: 0.5,
		height: "100vh",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "20px",
	  }));

	return (
		<Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row" }}>
			<CssBaseline />
			<Head title="Avalie PI | LOGIN" />
			
			<CustomContainerGradient />
				
			<CustomContainerLogin>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
					}}>
					
					<Typography variant="h3" sx={{ fontFamily: "inter" }}>
						Admin Avalie Piauí
					</Typography>

					<Box component="form" onSubmit={handleSubmit(handleSignIn)}>

						{erros ? handleErros() :
							<>

								<TextField
									{...register("email")}
									type="email"
									margin="normal"
									required
									fullWidth
									id="email-address"
									label="E-mail"
									name="email"
									autoComplete="email"
									autoFocus
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<AlternateEmailIcon />
											</InputAdornment>
										),
									}}
								/>

								<TextField
									{...register("password")}
									margin="normal"
									required
									fullWidth
									name="password"
									label="Senha"
									type="password"
									id="password"
									autoComplete="current-password"
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												<HttpsIcon />
											</InputAdornment>
										),
									}}
								/>
							</>
						}

						<FormControlLabel control={<Checkbox checked={remember} color="primary" />} label="Lembre-se" onClick={checkRememberMe} />
						<Button type="submit" fullWidth disableElevation variant="contained" sx={{ mb: 2 }}>
							Entrar
						</Button>
					</Box>
				</Box>
			</CustomContainerLogin>
		</Box>
	);
}

export async function getServerSideProps(req, res) {
	
	const { ["@avaliepi.token"]: token } = parseCookies(req);
	if (token) {
		return {
			redirect: {
				permanent: true,
				destination: "/",
			},
		};
	}

	return {
		props: {},
	};
}