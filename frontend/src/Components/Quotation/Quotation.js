import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../Card/Card';

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

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/payment', { state: { orderId, price: quotation.selectedPrice } });
    };

    return (
        <div className="quotation-service-container">
            <form onSubmit={handleSubmit}>
                <div className="card-container">
                    <Card
                        title="Regular Delivery"
                        imageUrl="" // Add your image URL here
                        body="Regular delivery in 3 to 7 business days"
                        price={quotation.regularPrice}
                        onClick={() => handleCardSelect('regular')}
                    />
                    <Card
                        title="Express Delivery"
                        imageUrl="" // Add your image URL here
                        body="Express delivery in 1-2 business days"
                        price={quotation.expressPrice}
                        onClick={() => handleCardSelect('express')}
                    />
                </div>
                <button type="submit" disabled={!quotation.selectedType}>Proceed to Payment</button>
            </form>
        </div>
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

export default QuotationService;