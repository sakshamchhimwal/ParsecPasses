import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { getUserPassDetails } from "../../api/user";

export function Pass() {
    useEffect(() => {
        // Get cookies
        const cookies = document.cookie.split(";");
        const idTokenCookie = cookies.find((cookie) => cookie.startsWith("id_token="));

        if (idTokenCookie) {
            const idToken = idTokenCookie.split("=")[1];

            // Set id_token to localStorage
            localStorage.setItem("id_token", idToken);
        }
    }, []);
    const [userData, setUserData] = useState({
        imageURL: "",
        passID: "",
    });
    const getUserData = useCallback(async () => {
        const res = await getUserPassDetails();
        setUserData(res);
    }, []);
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getUserData();
        }
        return () => {
            mounted = false;
        };
    }, [getUserData]);
    return (
        <Container
            maxWidth="md"
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
            }}
        >
            <Box
                component="img"
                sx={{
                    padding: "20px",
                    borderColor: "gray",
                    borderStyle: "dashed",
                    borderRadius: "20px",
                    background: "linear-gradient(73deg, rgba(90,46,232,0.2) 0%, rgba(255,255,0,0.2) 65%, rgba(255,52,204,0.2) 100%)",
                    margin: "10px",
                    height: "300px",
                    width: "300px",
                }}
                src={userData.imageURL}
            />
            <Typography
                variant="h6"
                component="p"
                color="white"
                textAlign="center"
                fontFamily="Rubik Mono One"
                style={{
                    textDecoration: "none",
                    padding: "10px",
                    borderColor: "gray",
                    borderStyle: "dashed",
                    borderRadius: "20px",
                    background: "linear-gradient(73deg, rgba(90,46,232,0.2) 0%, rgba(255,255,0,0.2) 65%, rgba(255,52,204,0.2) 100%)",
                }}
            >
                {userData.passID}
            </Typography>
        </Container>
    );
}
