import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Lottie from "react-lottie";

import ReactLottieJson from "../../public/lottie/react.json";

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: ReactLottieJson,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

export default function LogoReact() {
	const [isStopped] = useState(false);
	const [isPaused] = useState(false);

	return <Lottie options={defaultOptions} height={130} width={130} isStopped={isStopped} isPaused={isPaused} isClickToPauseDisabled={true} />;
}
