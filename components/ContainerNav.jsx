import React, { useContext, useState } from "react";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import { SettingsContext } from "../context/SettingsContext";
import { useRouter } from "next/router";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { toPascalCase } from "../helpers/utils";

export default function CustomizedBreadcrumbs() {
	const { themePallete } = useContext(SettingsContext);

	const StyledBreadcrumb = styled(Chip)(({ theme }) => {
		return {
			background: themePallete.hover,
			height: theme.spacing(3),
			color: "#424242",
			fontWeight: theme.typography.fontWeightRegular,
			fontSize: "0.7rem",
		};
	});

	const router = useRouter();

	var rota = router.pathname.split("/");
	var rota_page = "/";
	let pages = rota.length;
	let row = 1;

	const handleRota = (path) => {
		row += 1;
		row == pages ? (rota_page = "#") : (rota_page += `${path}/`);
	};

	return (
		<Container maxWidth="full" sx={{ mt: 1, mb: 1, width: "100%" }}>
			<Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{ width: "100%" }}>
				<Stack direction="row" spacing={1} sx={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
					<Link href="#" passHref>
						<Typography
							variant="h5"
							sx={{
								fontWeight: "bold",
								fontSize: {
									lg: 20,
									md: 16,
									sm: 16,
									xs: 14,
								},
							}}>
							{toPascalCase(rota[1])} |
						</Typography>
					</Link>

					{rota.map((item, index) =>
						item != rota[1] ? (
							item == "" ? (
								<div key={index}>
									<Link href={rota_page} passHref>
										<HomeIcon sx={{ color: themePallete.navbar, fontSize: 26, cursor: "pointer" }} />
									</Link>

									<Typography>{handleRota(rota[1])}</Typography>
								</div>
							) : (
								<div key={index}>
									{handleRota(item)}

									<ArrowForwardIosIcon sx={{ fontSize: "14px" }} />

									{row == pages - 1 ? (
										<StyledBreadcrumb
											component="a"
											href="#"
											onClick={() => router.back()}
											label={toPascalCase(item)}></StyledBreadcrumb>
									) : (
										<Link href={rota_page} passHref>
											<StyledBreadcrumb component="a" href="#" fontSize="14" label={toPascalCase(item)}></StyledBreadcrumb>
										</Link>
									)}
								</div>
							)
						) : null
					)}
				</Stack>
			</Grid>
		</Container>
	);
}
