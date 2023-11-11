import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserInfo from "../UserInfo/UserInfo";
import PackageInfo from "../Package/PackageInfo";
import Footer from "../Footer/Footer";

const Steps = {
    SenderInfo: 1,
    RecipientInfo: 2,
    PackageInfo: 3,
};

function DeliveryRequest(props) {
    const [step, setStep] = useState(Steps.SenderInfo);
    const [deliveryInfo, setDeliveryInfo] = useState({
        senderInfo: {
            firstName: '',
            lastName: '',
            country:'',
            address: '',
            city:'',
            province:'',
            postalCode: '',
            phoneNumber:'',
            email:''
        },
        recipientInfo: {
            firstName: '',
            lastName: '',
            country:'',
            address: '',
            city:'',
            postalCode: '',
            phoneNumber:'',
            email:''
        },
        packageInfo:{
            height:'',
            width:'',
            length:'',
            weight:''
        },
        paymentInfo:{

        },
        orderInfo:{
            orderId:''
        },
        trackingInfo:{
            tracking:'id'
        }
    });

    const navigate = useNavigate();

    const updateInfo = (newData) => {
        setDeliveryInfo((prev) => {
            if (step === Steps.SenderInfo) {
                console.log(newData)
                return { ...prev, senderInfo: { ...prev.senderInfo, ...newData }};
            } else if (step === Steps.RecipientInfo) {
                console.log(newData)
                return { ...prev, recipientInfo: { ...prev.recipientInfo, ...newData }};
            }
            else if (step === Steps.PackageInfo) {
                console.log(newData)
                return { ...prev, packageInfo: { ...prev.packageInfo, ...newData }};
            }

        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (step === Steps.SenderInfo) {
            console.log(deliveryInfo)
            setStep(Steps.RecipientInfo);
        } else if (step === Steps.RecipientInfo) {
            // Submit your form or navigate to summary page
            console.log(deliveryInfo);
            setStep(Steps.PackageInfo)
        }
        else if (step === Steps.PackageInfo) {
            console.log(deliveryInfo)
            try {
                const result = await sendForQuotation(deliveryInfo)
                console.log(result.message)
                navigate('/quotation-service');
            }
            catch (error) {
                console.error("Failed to submit delivery data:", error);
            }
        }
    };

    return (
        <div className="delivery-request-container">
            {step === Steps.SenderInfo && (
                <UserInfo
                    userInfo={deliveryInfo.senderInfo}
                    setUserInfo={updateInfo}
                    handleSubmit={handleSubmit}
                    title="Sender Information"
                />
            )}
            {step === Steps.RecipientInfo && (
                <UserInfo
                    userInfo={deliveryInfo.recipientInfo}
                    setUserInfo={updateInfo}
                    handleSubmit={handleSubmit}
                    title="Recipient Information"
                />
            )}
            {step === Steps.PackageInfo && (
                <PackageInfo
                    packageInfo={deliveryInfo.packageInfo}
                    setPackageInfo={updateInfo}
                    handleSubmit={handleSubmit}
                    title="Package Information"
                />
            )}
            <Footer/>
        </div>
    );

}

const sendForQuotation = async (deliveryData) => {
    const response = await fetch('http://localhost:3001/quotation-service',{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body:JSON.stringify(deliveryData)
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}
const submitDeliveryData = async (deliveryData) => {
    const response = await fetch('http://localhost:3001/submit-delivery',{
        method:'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body:JSON.stringify(deliveryData)
    })

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

export default DeliveryRequest;