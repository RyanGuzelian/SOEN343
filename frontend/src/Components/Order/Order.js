// Order.js (React Component)
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function Order() {
    const location = useLocation();
    const { orderId } = location.state || {};
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
        <div className="order-container">
            <h2>Order Summary</h2>
            {orderDetails && (
                <>
                    <p>Order ID: {orderDetails._id}</p>
                    <p>Price: ${orderDetails.quotationInfo.price}</p>
                    <p>Delivery Type: ${orderDetails.quotationInfo.deliveryType}</p>
                    <h3>Sender Information</h3>
                    <p>Name: {orderDetails.senderInfo.firstName} {orderDetails.senderInfo.lastName}</p>
                    <p>Country: {orderDetails.senderInfo.country}</p>
                    <p>Address: {orderDetails.senderInfo.address} {orderDetails.senderInfo.city},{orderDetails.senderInfo.province} {orderDetails.senderInfo.postalCode} </p>
                    <p>Email: {orderDetails.senderInfo.email}</p>
                    <p>PhoneNumber: {orderDetails.senderInfo.phoneNumber}</p>

                    <h3>Recipient Information</h3>
                    <p>Name: {orderDetails.recipientInfo.firstName} {orderDetails.recipientInfo.lastName}</p>
                    <p>Country: {orderDetails.recipientInfo.country}</p>
                    <p>Address: {orderDetails.recipientInfo.address} {orderDetails.recipientInfo.city},{orderDetails.recipientInfo.province} {orderDetails.recipientInfo.postalCode} </p>
                    <p>Email: {orderDetails.recipientInfo.email}</p>
                    <p>PhoneNumber: {orderDetails.recipientInfo.phoneNumber}</p>

                    <h3>Package Information</h3>
                    <p>Dimensions: {orderDetails.packageInfo.height} cm x {orderDetails.packageInfo.width} cm x {orderDetails.packageInfo.length} cm</p>
                    <p>Weight: {orderDetails.packageInfo.weight}</p>
                </>
            )}
        </div>
    );
}

export default Order;
