import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

export function Scanner() {
    const [decodeUUID, setDecodeUUID] = useState(null);
    const navigate = useNavigate();
    const handleClick = async (id) => {
        try {
            navigate(`/verify/${decodeUUID}`);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        function onScanSuccess(decodedText, decodedResult) {
            // handle the scanned code as you like, for example:
            console.log(`Code matched = ${decodedText}`, decodedResult);
            setDecodeUUID(decodedText);
        }

        // when component mounts
        const config = { fps: 4, qrbox: { width: 250, height: 250 } };
        const html5QrcodeScanner = new Html5QrcodeScanner("qrreader", config);
        html5QrcodeScanner.render(onScanSuccess);

        // cleanup function when component will unmount
        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: "30px",
                flex: "1",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div
                id="qrreader"
                style={{
                    height: "300px",
                    width: "300px",
                    background: "white",
                    color: "black",
                }}
            ></div>
            {decodeUUID && (
                <Button
                    variant="outlined"
                    color="primary"
                    endIcon={<QrCodeScannerIcon />}
                    onClick={handleClick}
                >
                    {decodeUUID}
                </Button>
            )}
        </Container>
    );
}
