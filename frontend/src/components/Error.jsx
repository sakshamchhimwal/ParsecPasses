import HomeIcon from "@mui/icons-material/Home";
import { Box, Container, IconButton, Typography } from "@mui/material";
import * as React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
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
            <Box sx={{ mt: 8 }}>
                <IconButton>
                    <Link to="/">
                        <HomeIcon fontSize="large" sx={{ color: "white" }} />   
                    </Link>
                </IconButton>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography
                    variant="h1"
                    component="p"
                    className="animatedHeading"
                    sx={{ color: "white" }}
                    textAlign="center"
                >
                    404
                </Typography>
                <Typography
                    variant="h3"
                    component="p"
                    className="animatedHeading"
                    sx={{ color: "white" }}
                    textAlign="center"
                >
                    What you are looking for does not exist!
                </Typography>
            </Box>
        </Container>
    );
};

export default ErrorPage;
