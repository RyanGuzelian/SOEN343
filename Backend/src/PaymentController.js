const express = require('express');
const router = express.Router();
const Delivery = require('../../Database/src/Model');

// Define a POST endpoint to receive payment information
router.post('/payment-service', async (req, res) => {
    try {
        // Extract payment information from the request body
        const paymentInfo = req.body.paymentInfo;

        // Create a new instance of the Delivery model with paymentInfo
        const newDelivery = new Delivery({ paymentInfo });

        // Save the payment information to the database
        await newDelivery.save();

        res.status(201).json({ message: 'Payment information saved successfully' });
    } catch (error) {
        console.error('Error saving payment information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;