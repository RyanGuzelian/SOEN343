import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Card from "../Card/Card";

function QuotationService() {
    const [quotation, setQuotation] = useState({
        deliveryType: 'regular',
        price: '0'
    });

    const navigate = useNavigate();

    const handleChange = async (event) => {
        const {name, value} = event.target;
        setQuotation({
            ...quotation, [name]: value
        })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        navigate('/payment');
    };

    return (
        <div className="quotation-service-container">
            <form onSubmit={handleSubmit}>
                <div className="card-container">
                    <Card
                        title="Regular Delivery"
                        imageUrl="" // Add your image URL here
                        body="Regular delivery in 3 to 7 business days"
                        price={quotation.deliveryType === 'regular' ? quotation.price : ''}
                    />
                    <Card
                        title="Express Delivery"
                        imageUrl="" // Add your image URL here
                        body="Express delivery in 1-2 business days"
                        price={quotation.deliveryType === 'express' ? quotation.price : ''}
                    />
                </div>
                <div className="quotation-price">
                    <p>Total Price will be calculated...</p>
                </div>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
}


export default QuotationService;
