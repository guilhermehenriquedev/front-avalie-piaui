// CSS Global
import "../styles/global.css";

import { useState } from "react";
import Layout from "../components/templates/Layout";
import SettingsContext from "../context/SettingsContext";
import AuthContext from "../context/AuthContext";


function MyApp({ Component, pageProps }) {
	const [isAuth, setIsAuth] = useState(false);

	const handleAuth = (bool) => {
		setIsAuth(bool)

	}

	return (
		<>
			{isAuth ? (
				<AuthContext isAuth={handleAuth}>
					<SettingsContext>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</SettingsContext>
				</AuthContext>
			) : (
				<AuthContext isAuth={handleAuth}>
					<SettingsContext>
						<Component {...pageProps} />
					</SettingsContext>
				</AuthContext>
			)}
		</>
	);
}

export default MyApp;
