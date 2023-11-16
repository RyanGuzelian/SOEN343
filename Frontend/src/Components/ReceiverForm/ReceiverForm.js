import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";

function ReceiverForm() {
    const [receiverInfo, setReceiverInfo] = useState({
        firstName: '',
        lastName: '',
        country: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        phoneNumber: '',
        email: ''
    })

    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = location.state || {};

    const handleChange = (newData) => {
        setReceiverInfo(prev => ({ ...prev, ...newData }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await sendReceiverInfo(receiverInfo,orderId);
            console.log(result.message);
            // If you get an orderId or similar identifier, store it as needed
            navigate('/package-info', { state: { orderId: orderId } });
        } catch (error) {
            console.error("Failed to submit receiver info", error);
        }
    };

    return (
        <div className="receiver-info-container">
            <UserInfo
                userInfo={receiverInfo}
                setUserInfo={handleChange}
                handleSubmit={handleSubmit}
                title="Receiver Information"
            />
        </div>
    )

}

const sendReceiverInfo = async (recipientInfo, orderId) => {
    const response = await fetch('http://localhost:3001/recipient-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipientInfo, orderId }) // Include orderId
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export default ReceiverForm