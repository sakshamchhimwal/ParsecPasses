import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIdDetails, verifyToken } from "../../api/manager";
export function Verify() {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const naviagte = useNavigate();
    const getData = useCallback(async () => {
        const res = await getIdDetails(id);
        console.log(res.findUser);
        setUserData(res.findUser);
    }, [id]);
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getData();
        }
        return () => {
            mounted = false;
        };
    }, [getData]);
    const handelVerify = async () => {
        try {
            const res = await verifyToken(id);
            naviagte("/manager");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <Container
            maxWidth="lg"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "20px",
                flex: 1,
            }}
        >
            {userData && (
                <>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Typography variant="body" color="white" sx={{ mb: 1 }}>
                                Name:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body" color="white">
                                {userData.full_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body" color="white" sx={{ mb: 1 }}>
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body" color="white">
                                {userData.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body" color="white" sx={{ mb: 1 }}>
                                Mobile Number:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body" color="white">
                                {userData.mobile_number}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body" color="white" sx={{ mb: 1 }}>
                                College:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body" color="white">
                                {userData.college_name}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body" color="white" sx={{ mb: 1 }}>
                                Branch:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body" color="white">
                                {userData.branch}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body" color="white" sx={{ mb: 1 }}>
                                Year:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body" color="white">
                                {userData.year}
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="body" color="white" sx={{ mb: 1 }}>
                                Date of Birth:
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant="body" color="white">
                                {userData.date_of_birth}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button variant="outlined" color="primary" onClick={handelVerify}>
                        Verify
                    </Button>
                </>
            )}
        </Container>
    );
}
