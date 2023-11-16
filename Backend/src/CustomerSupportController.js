const express = require('express');
const router = express.Router();
const Delivery = require('../../Database/src/Model');

// Handle submission of customer inquiries
router.post('/submit-inquiry', async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber, inquiryText } = req.body;
        const inquiryData = { firstName, lastName, email, phoneNumber, inquiryText };

        const deliveryData = new Delivery({ inquiryInfo: inquiryData });
        await deliveryData.save();

        res.status(201).json({ message: "Inquiry submitted successfully", inquiryId: deliveryData._id });
    } catch (err) {
        console.error("Error saving inquiry:", err);
        res.status(500).send({ message: "Error saving inquiry" });
    }
});

module.exports = router;