import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardActionArea,
    Typography,
    Button,
    Container,
    Grid,
    Box
} from "@mui/material";

function QuotationService() {
    const [quotation, setQuotation] = useState({
        regularPrice: 0,
        expressPrice: 0,
        selectedType: '',
        selectedPrice: 0
    });

    const navigate = useNavigate();
    const location = useLocation();
    const { orderId, packageInfo } = location.state || {};

    useEffect(() => {
        if (!orderId || !packageInfo) {
            console.error('Missing orderId or packageInfo');
            navigate('/');
            return;
        }

        // Fetch prices for both shipping options
        fetchShippingPrices(packageInfo, orderId);
    }, [orderId, packageInfo, navigate]);

    const fetchShippingPrices = async (packageInfo, orderId) => {
        try {
            const regularResponse = await sendQuotation({ ...packageInfo, deliveryType: 'regular' }, orderId);
            const expressResponse = await sendQuotation({ ...packageInfo, deliveryType: 'express' }, orderId);

            if (regularResponse && expressResponse) {
                setQuotation(prev => ({
                    ...prev,
                    regularPrice: regularResponse.regularPrice,
                    expressPrice: expressResponse.expressPrice,
                    selectedType: prev.selectedType, // Keep the previously selected type if any
                    selectedPrice: prev.selectedType === 'regular' ? regularResponse.regularPrice : prev.selectedType === 'express' ? expressResponse.expressPrice : 0
                }));
            }
        } catch (error) {
            console.error("Error fetching shipping prices:", error);
        }
    };


    const handleCardSelect = (deliveryType) => {
        const price = deliveryType === 'regular' ? quotation.regularPrice : quotation.expressPrice;
        setQuotation({
            ...quotation,
            selectedType: deliveryType,
            selectedPrice: price
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await sendQuotationInfo(quotation, orderId);
            console.log("Quotation Info Submission Result:", result);

            console.log("Navigating to /order with state:", { orderId, price: quotation.selectedPrice });
            navigate('/order', { state: { orderId, price: quotation.selectedPrice } });
        } catch (error) {
            console.error("Failed to submit quotation info", error);
        }
    };


    return (
        <Container className="quotation-service-container">
            <Box my={4}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                            <CardActionArea onClick={() => handleCardSelect('regular')}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Regular Delivery
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Regular delivery in 3 to 7 business days
                                    </Typography>
                                    <Typography variant="h6" color="primary" component="p">
                                        ${quotation.regularPrice}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                            <CardActionArea onClick={() => handleCardSelect('express')}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Express Delivery
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Express delivery in 1-2 business days
                                    </Typography>
                                    <Typography variant="h6" color="primary" component="p">
                                        ${quotation.expressPrice}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={!quotation.selectedType}
                        onClick={handleSubmit}
                    >
                        Proceed to Payment
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}

const sendQuotation = async (quotationData, orderId) => {
    try {
        const packageInfo = {
            height: quotationData.height,
            width: quotationData.width,
            length: quotationData.length,
            weight: quotationData.weight,
            deliveryType: quotationData.deliveryType
        };

        const response = await fetch('http://localhost:3001/quotation-service', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ packageInfo, orderId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in sending quotation info:", error);
        throw error;
    }
};

const sendQuotationInfo = async (quotation, orderId) => {
    try {
        const response = await fetch('http://localhost:3001/quotation-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
                quotation: {
                    deliveryType: quotation.selectedType,
                    price: quotation.selectedPrice.toString() // Convert to string if necessary
                }
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in sending quotation info:", error);
        throw error;
    }
};

export default QuotationService;