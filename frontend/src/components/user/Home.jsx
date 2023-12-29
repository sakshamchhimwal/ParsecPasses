import React, { useCallback, useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getGoogleURL } from "../../api/user";

export function Home() {
    const [googleURL, setGoogleURL] = useState(null);
    const provideURL = useCallback(async () => {
        const url = await getGoogleURL();
        if (url != null) {
            setGoogleURL(url);
        }
    },[])
    useEffect(() => {
        let mount = true;
        if (mount) {
            provideURL();
        }
        return () => {
            mount = false;
        };
    }, [provideURL]);
    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
            }}
        >
            <Typography
                variant="body"
                component="a"
                href={googleURL}
                color="textPrimary"
                textAlign="center"
                fontFamily="Rubik Mono One"
                style={{
                    textDecoration: "none",
                    padding: "10px",
                }}
            >
                SigIn with Google
            </Typography>
        </Container>
    );
}
