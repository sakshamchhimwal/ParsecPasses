import React, { useState, useEffect } from "react";
import {
	TextField,
	Button,
	FormControl,
	FormLabel,
	Container,
	Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { signin } from "../../api/user";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

export function SignIn() {
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setUser({ ...user, [event.target.name]: event.target.value });
	};

	// Handle form submission (replace with your actual submission logic)
	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			console.log(user); // Do something with the form data
			const res = await signin(user);
			if (res.error) {
				return navigator("/error");
			}
			localStorage.setItem("id_token", res.authCode);
			navigate("/pass");
		} catch (err) {
			const mute = err;
			console.log(mute);
			navigate("/error");
		}
	};

	return (
		<ThemeProvider theme={darkTheme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Container
					maxWidth="sm"
					sx={{
						padding: "5px 0px",
					}}
				>
					<form
						onSubmit={handleSubmit}
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<FormControl
							sx={{
								marginBottom: "3px",
							}}
						>
							<FormLabel
								sx={{
									marginBottom: "-10px",
								}}
							>
								Email
							</FormLabel>
							<TextField
								name="email"
								value={user.email}
								onChange={handleChange}
								required
								fullWidth
								margin="normal"
								helperText={
									!user.email.includes("@")
										? "Required"
										: ""
								}
							/>
						</FormControl>
						<FormControl
							sx={{
								marginBottom: "3px",
							}}
						>
							<FormLabel
								sx={{
									marginBottom: "-10px",
								}}
							>
								Password
							</FormLabel>
							<TextField
								name="password"
								value={user.password}
								onChange={handleChange}
								required
								fullWidth
								margin="normal"
								helperText={
									user.email.length < 4 ? "Required" : ""
								}
								type="password"
							/>
						</FormControl>
						<Button
							type="submit"
							variant="outlined"
							color="primary"
							sx={{
								maxWidth: "100px",
								margin: "auto",
								marginTop: "20px",
							}}
						>
							<Typography
								variant="body"
								component="p"
								color="textPrimary"
								textAlign="center"
								fontFamily="Rubik Mono One"
								style={{
									textDecoration: "none",
								}}
								className="animatedHeading"
							>
								Submit
							</Typography>
						</Button>
					</form>
				</Container>
			</LocalizationProvider>
		</ThemeProvider>
	);
}
