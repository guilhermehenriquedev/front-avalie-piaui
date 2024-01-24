import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Lottie from "react-lottie";

import NotFoundPageLottieJson from "../public/lottie/not-found-page.json";

import ContainerContent from "../components/ContainerContent";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: NotFoundPageLottieJson,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

export default function PageNotFound() {
	const [isStopped] = useState(false);
	const [isPaused] = useState(false);
	return (
		<ContainerContent title="Página não encontrada!">
			<Box sx={{ width: "100%", height: "400px" }}>
				<Lottie options={defaultOptions} height={400} width={400} isStopped={isStopped} isPaused={isPaused} isClickToPauseDisabled={true} />
			</Box>
		</ContainerContent>
	);
}
