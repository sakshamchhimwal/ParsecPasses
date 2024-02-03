import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./components/user/Home";
import { Pass } from "./components/user/Pass";
import { Scanner } from "./components/manager/Scanner";
import { Verify } from "./components/manager/Verify";
import { Form as ManagerForm } from "./components/manager/Form";
import ErrorPage from "./components/Error";
import { ErrorBoundary } from "react-error-boundary";
import Auth from "./components/Auth";
import { SignIn } from "./components/user/Singin";

function App() {
	const router = createBrowserRouter([
		{
			path: "*",
			element: <ErrorPage />,
		},
		{
			path: "/",
			element: <Home />,
		},
		{
			path: "/auth",
			element: <Auth />,
		},
		{
			path: "/signin",
			element: <SignIn />,
		},

		{
			path: "/pass",
			element: <Pass />,
		},
		{
			path: "/manager",
			element: <Scanner />,
		},
		{
			path: "/genratePass",
			element: <ManagerForm />,
		},
		{
			path: "/verify/:id",
			element: <Verify />,
		},
	]);

	return (
		<CssBaseline>
			<Container
				maxWidth="xl"
				style={{
					background: "black",
					minHeight: "100vh",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Typography
					variant="h3"
					component="p"
					color="textPrimary"
					textAlign="center"
					fontFamily="Rubik Mono One"
					style={{
						wordSpacing: "-20px",
						letterSpacing: "-3px",
						marginBottom: "20px",
					}}
					className="animatedHeading"
				>
					Get <br />
					Parsec Passes
				</Typography>
				<ErrorBoundary fallback={<div>Something went wrong</div>}>
					<RouterProvider router={router} />
				</ErrorBoundary>
			</Container>
		</CssBaseline>
	);
}

export default App;
