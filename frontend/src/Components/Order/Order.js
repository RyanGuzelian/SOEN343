// Order.js (React Component)
import React, {useEffect, useState} from 'react';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Box
} from "@mui/material";
import {useLocation} from 'react-router-dom';

function Order() {
    const location = useLocation();
    const {orderId} = location.state || {};
    const [orderDetails, setOrderDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (orderId) {
            fetch(`http://localhost:3001/order-details/${orderId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    setOrderDetails(data);
                    setIsLoading(false);
                })
                .catch(err => {
                    console.error("Failed to fetch order details:", err);
                    setError(err.message);
                    setIsLoading(false);
                });
        }
    }, [orderId]);

    if (isLoading) {
        return <p>Loading order details...</p>;
    }

    if (error) {
        return <p>Error fetching order details: {error}</p>;
    }

    return (
        <Container className="order-container">
            <Box my={4}>
                <Paper elevation={3} style={{padding: '16px'}}>
                    <Typography variant="h4" gutterBottom>
                        Order Summary
                    </Typography>

                    {orderDetails && (
                        <>
                            <Typography variant="subtitle1">
                                Order ID: {orderDetails._id}
                            </Typography>
                            <Typography variant="subtitle1">
                                Price: ${orderDetails.quotationInfo.price}
                            </Typography>
                            <Typography variant="subtitle1">
                                Delivery Type: {orderDetails.quotationInfo.deliveryType}
                            </Typography>

                            <Box mt={2}>
                                <Typography variant="h6">Sender Information</Typography>
                                <Typography>Name: {orderDetails.senderInfo.firstName} {orderDetails.senderInfo.lastName}</Typography>
                                <Typography>Country: {orderDetails.senderInfo.country}</Typography>
                                <Typography>Address: {orderDetails.senderInfo.address}, {orderDetails.senderInfo.city}, {orderDetails.senderInfo.province} {orderDetails.senderInfo.postalCode}</Typography>
                                <Typography>Email: {orderDetails.senderInfo.email}</Typography>
                                <Typography>Phone Number: {orderDetails.senderInfo.phoneNumber}</Typography>
                            </Box>

                            <Box mt={2}>
                                <Typography variant="h6">Recipient Information</Typography>
                                <Typography>Name: {orderDetails.recipientInfo.firstName} {orderDetails.recipientInfo.lastName}</Typography>
                                <Typography>Country: {orderDetails.recipientInfo.country}</Typography>
                                <Typography>Address: {orderDetails.recipientInfo.address}, {orderDetails.recipientInfo.city}, {orderDetails.recipientInfo.province} {orderDetails.recipientInfo.postalCode}</Typography>
                                <Typography>Email: {orderDetails.recipientInfo.email}</Typography>
                                <Typography>Phone Number: {orderDetails.recipientInfo.phoneNumber}</Typography>
                            </Box>

                            <Box mt={2}>
                                <Typography variant="h6">Package Information</Typography>
                                <Typography>Dimensions: {orderDetails.packageInfo.height} cm
                                    x {orderDetails.packageInfo.width} cm
                                    x {orderDetails.packageInfo.length} cm</Typography>
                                <Typography>Weight: {orderDetails.packageInfo.weight}</Typography>
                            </Box>
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
}

export default Order;
