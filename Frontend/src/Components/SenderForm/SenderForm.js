import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import UserInfo from "../UserInfo/UserInfo";

function SenderForm() {
    const [senderInfo, setSenderInfo] = useState({
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

    const handleChange = (newData) => {
        setSenderInfo(prev => ({ ...prev, ...newData }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await sendSenderInfo(senderInfo);
            console.log(result.message);
            // If you get an orderId or similar identifier, store it as needed
            navigate('/recipient-info', { state: { orderId: result.orderId } });
        } catch (error) {
            console.error("Failed to submit sender info", error);
        }
    };

    return (
        <div className="sender-info-container">
            <UserInfo
                userInfo={senderInfo}
                setUserInfo={handleChange}
                handleSubmit={handleSubmit}
                title="Sender Information"
            />
        </div>
    )
}

const sendSenderInfo = async (senderInfo) => {
    const response = await fetch('http://localhost:3001/sender-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senderInfo })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export default SenderForm