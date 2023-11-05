import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserInfo from "../UserInfo/UserInfo";

function DeliveryRequest(props) {
    const [step, setStep] = useState(1);
    const [deliveryInfo, setDeliveryInfo] = useState({
        senderInfo: {
            firstName: '',
            lastName: '',
            address: '',
            postalCode: ''
        },
        recipientInfo: {
            firstName: '',
            lastName: '',
            address: '',
            postalCode: ''
        }
    });

    const navigate = useNavigate();

    const updateInfo = (newData) => {
        setDeliveryInfo((prev) => {
            if (step === 1) {
                console.log(newData)
                return { ...prev, senderInfo: { ...prev.senderInfo, ...newData }};
            } else {
                console.log(newData)
                return { ...prev, recipientInfo: { ...prev.recipientInfo, ...newData }};
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (step === 1) {
            console.log(deliveryInfo)
            setStep(2);
        } else if (step === 2) {
            // Submit your form or navigate to summary page
            console.log(deliveryInfo);
            navigate('/summary');
        }
    };

    return (
        <div className="delivery-request-container">
            <UserInfo
                userInfo={step === 1 ? deliveryInfo.senderInfo : deliveryInfo.recipientInfo}
                setUserInfo={updateInfo}
                handleSubmit={handleSubmit}
                title={step === 1 ? "Sender Information" : "Recipient Information"}
            />
        </div>
    );
}

export default DeliveryRequest;