import React, { useState } from "react";

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
        <div className="tracking-container">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="tracking"
                    name="tracking"
                    placeholder="Enter Order ID"
                    value={orderId}
                    onChange={handleChange}
                />
                <button type="submit">Track Order</button>
            </form>
            {trackingStatus && <p>Status: {trackingStatus}</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
}

export default Tracking;