import { Container} from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { fetchToken } from "../api/user";

const Auth = () => {
	const navigator = useNavigate();
	const getToken = React.useCallback(async (authCode) => {
		try {
			const res = await fetchToken(authCode);
			if (res.error) {
				return navigator("/error");
			}
			localStorage.setItem("id_token", res.authCode);
			navigator("/pass");
		} catch (err) {
			const mute = err;
			console.log(mute);
			navigator("/error");
		}
	});
	React.useEffect(() => {
		const qs = new URLSearchParams(window.location.search);
		const code = qs.get("code");
		console.log(code);
		let mount = true;
		if (mount) {
			getToken(code);
		}
		return () => {
			mount = false;
		};
	}, [getToken]);
	return (
		<Container
			maxWidth="sm"
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				color: "white",
			}}
		>
			<img
				src="/hourglass.gif"
				alt="Please Wait..."
				height="200px"
				width="200px"
			/>
		</Container>
	);
};

export default Auth;
