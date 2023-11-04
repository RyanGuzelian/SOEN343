import React, {useState} from "react";
import {useHistory} from 'react-router-dom'

function DeliveryRequest(props) {
    const [deliveryInfo, setDeliveryInfo] = useState(
        {
            senderFirstName: '',
            senderLastName: '',
            senderAddress: '',
            senderPostalCode: '',
            recipientFirstName: '',
            recipientLastName: '',
            recipientAddress: '',
            recipientPostalCode: '',
            packageDetails: ''
        }
    )

   // const history = useHistory()

    const handleChange = (event) => {
        const {name, value} = event.target;
        setDeliveryInfo(
            {
                ...deliveryInfo, [name]: value
            }
        )
    }

    const handlePackageDetailsClick = (event) => {
        event.preventDefault()
        console.log(deliveryInfo)
        //history.push('/quotation')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //back end handles information
        console.log(deliveryInfo)
    }

    return (
        <div className="delivery-request-container">
            <h2>Request Delivery</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <h6>Sender info</h6>
                    <label htmlFor="senderFirstName">First name</label>
                    <input
                        type="text"
                        id="senderFirstName"
                        name="senderFirstName"
                        value={deliveryInfo.senderFirstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="senderLastName">Last Name</label>
                    <input
                        type="text"
                        id="senderLastName"
                        name="senderLastName"
                        value={deliveryInfo.senderLastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="senderAddress">Address</label>
                    <input type="text"
                           id="senderAddress"
                           name="senderAddress"
                           value={deliveryInfo.senderAddress}
                           onChange={handleChange}
                    />
                    <label htmlFor="senderPostalCode">Postal code</label>
                    <input type="text"
                           id="senderPostalCode"
                           name="senderPostalCode"
                           value={deliveryInfo.senderPostalCode}
                           onChange={handleChange}
                    />
                </div>
                <div>
                    <h6>Recipient info</h6>
                    <label htmlFor="recipientFirstName">First name</label>
                    <input
                        type="text"
                        id="recipientFirstName"
                        name="recipientFirstName"
                        value={deliveryInfo.recipientFirstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="recipientLastName">Last Name</label>
                    <input
                        type="text"
                        id="recipientLastName"
                        name="recipientLastName"
                        value={deliveryInfo.recipientLastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="recipientAddress">Address</label>
                    <input type="text"
                           id="recipientAddress"
                           name="recipientAddress"
                           value={deliveryInfo.recipientAddress}
                           onChange={handleChange}
                    />
                    <label htmlFor="recipientPostalCode">Postal code</label>
                    <input type="text"
                           id="recipientPostalCode"
                           name="recipientPostalCode"
                           value={deliveryInfo.recipientPostalCode}
                           onChange={handleChange}
                    />
                </div>
                <button type="button" onClick={handlePackageDetailsClick}>
                    Enter package details
                </button>
            </form>
        </div>
    )
}

export default DeliveryRequest