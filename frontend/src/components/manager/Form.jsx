import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    RadioGroup,
    FormControlLabel,
    Radio,
    Container,
    Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/manager";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

export function Form() {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        full_name: "",
        college_name: "",
        year: "",
        branch: "",
        mobile_number: "",
        date_of_birth: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleChange = (event) => {
        setUser({ ...user, [event.target.name]: event.target.value });
    };

    // Handle form submission (replace with your actual submission logic)
    const handleSubmit = async (event) => {
        try {
            setIsSubmitting(true);
            event.preventDefault();
            console.log(user); // Do something with the form data
            const res = await registerUser(user);
            setIsSubmitting(false);
            setUser({
                email: "",
                full_name: "",
                college_name: "",
                year: "",
                branch: "",
                mobile_number: "",
                date_of_birth: null,
            });
        } catch (err) {
            console.log(err);
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
                                helperText={!user.full_name.includes("@") ? "Required" : ""}
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
                                Full Name
                            </FormLabel>
                            <TextField
                                name="full_name"
                                value={user.full_name}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                                helperText={user.full_name.length < 4 ? "Required" : ""}
                            />
                        </FormControl>
                        {/* <FormControl
                            sx={{
                                marginBottom: "3px",
                            }}
                        >
                            <FormLabel
                                sx={{
                                    marginBottom: "-10px",
                                }}
                            >
                                College Name
                            </FormLabel>
                            <TextField
                                name="college_name"
                                value={user.college_name}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                                helperText={
                                    user.college_name.length < 4
                                        ? "College name must be at least 4 characters long"
                                        : ""
                                }
                            />
                        </FormControl>
                        <FormControl
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                marginBottom: "3px",
                            }}
                        >
                            <FormLabel
                                sx={{
                                    marginBottom: "-8px",
                                }}
                            >
                                Year
                            </FormLabel>
                            <RadioGroup
                                name="year"
                                value={user.year}
                                onChange={handleChange}
                                required
                                sx={{
                                    color: "white",
                                }}
                                row
                            >
                                <FormControlLabel value="1" control={<Radio />} label="1st" />
                                <FormControlLabel value="2" control={<Radio />} label="2nd" />
                                <FormControlLabel value="3" control={<Radio />} label="3rd" />
                                <FormControlLabel value="4" control={<Radio />} label="4th" />
                            </RadioGroup>
                            {user.year === "" ? (
                                <FormHelperText>Please select a year</FormHelperText>
                            ) : (
                                ""
                            )}
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
                                Branch
                            </FormLabel>
                            <TextField
                                name="branch"
                                value={user.branch}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                                helperText={
                                    user.branch.length < 2
                                        ? "Branch must be at least 2 characters long"
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
                                Mobile Number
                            </FormLabel>
                            <TextField
                                name="mobile_number"
                                value={user.mobile_number}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                                helperText={
                                    !user.mobile_number || !/^[0-9]{10}$/.test(user.mobile_number)
                                        ? "Please enter a valid 10-digit mobile number"
                                        : ""
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Date of Birth</FormLabel>
                            <DatePicker
                                name="date_of_birth"
                                value={user.date_of_birth}
                                onChange={(newValue) => {
                                    setUser({
                                        ...user,
                                        date_of_birth: dayjs(newValue).format("DD/MM/YYYY"),
                                    });
                                }}
                                required
                                fullWidth
                                margin="normal"
                            />
                        </FormControl> */}
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
