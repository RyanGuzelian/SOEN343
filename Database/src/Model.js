// database/deliveryModel.js
const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
    senderInfo: {
        firstName: String,
        lastName: String,
        country: String,
        address: String,
        city: String,
        province: String,
        postalCode: String,
        phoneNumber: String,
        email: String
    },
    recipientInfo: {
        firstName: String,
        lastName: String,
        country: String,
        address: String,
        city: String,
        postalCode: String,
        phoneNumber: String,
        email: String
    },
    packageInfo: {
        height: String,
        width: String,
        length: String,
        weight: String
    },

    quotationInfo: {
        deliveryType: String,
        price: String
    },

    paymentInfo: {

    },

    deliveryInfo: {
        date : String,
        time : String
    },

    trackingInfo: {
        state: String
    },
    
    inquiryInfo: {
        firstName: String,
        lastName: String,
        email: String,
        phoneNumber: String,
        inquiryText: String,
    },
});


const Delivery = mongoose.model('Delivery', deliverySchema);

module.exports = Delivery;
