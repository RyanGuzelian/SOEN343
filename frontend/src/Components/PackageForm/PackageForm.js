import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import PackageInfo from "../Package/PackageInfo";

function PackageForm() {
    const [packageInfo, setPackageInfo] = useState({
            height:'',
            width:'',
            length:'',
            weight:''
    })

    const navigate = useNavigate();
    const location = useLocation();
    const { orderId } = location.state || {};

    const handleChange = (newData) => {
        setPackageInfo(prev => ({ ...prev, ...newData }));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await sendPackageInfo(packageInfo,orderId)
            console.log(result.message)
            navigate('/quotation-service', { state: {
                    orderId: orderId,
                    packageInfo: packageInfo
                }})
        }
        catch (error) {
            console.error("Failed to submit package info", error)
        }
    }

    return (
        <div className="package-info-container">
            <PackageInfo
                packageInfo={packageInfo}
                setPackageInfo={handleChange}
                handleSubmit={handleSubmit}
                title="Package Information"
            />
        </div>
    )

}

const sendPackageInfo = async (packageInfo, orderId) => {
    try {
        const response = await fetch('http://localhost:3001/package-info', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ packageInfo, orderId })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in sending package info:", error);
        throw error; // Rethrow the error for further handling
    }
};


export default PackageForm