import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";

function Tracking() {
    const [orderId, setOrderId] = useState("");
    const [trackingStatus, setTrackingStatus] = useState("");
    const [error, setError] = useState("");

    const handleChange = (event) => {
        setOrderId(event.target.value);
        setTrackingStatus(""); // Reset tracking status on input change
        setError(""); // Reset error on input change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log("Tracking order ID:", orderId); // Debugging
            const response = await fetch(`http://localhost:3001/tracking/${orderId}`);
            if (!response.ok) {
                throw new Error(`Order not found for ID: ${orderId}`);
            }
            const data = await response.json();
            console.log("Tracking response:", data); // Debugging
            setTrackingStatus(data.state); // It should be data.state
        } catch (error) {
            console.error("Tracking error:", error); // Debugging
            setError(error.message);
        }
    };

    return (
        <Container className="tracking-container">
            <Box my={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Track Your Order
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <TextField
                        label="Enter Order ID"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={orderId}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Track Order
                    </Button>
                </form>
                {trackingStatus && (
                    <Typography variant="subtitle1" style={{ marginTop: '20px' }}>
                        Status: {trackingStatus}
                    </Typography>
                )}
                {error && (
                    <Typography color="error" style={{ marginTop: '20px' }}>
                        Error: {error}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}

export default Tracking;