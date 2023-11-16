const express = require('express');
const router = express.Router();
const Delivery = require('../../Database/src/Model')

router.post('/sender-info', async (req, res) => {
    try {
        const deliveryData = new Delivery({ senderInfo: req.body.senderInfo });
        await deliveryData.save();
        res.status(201).json({ message: "Sender data submitted successfully", orderId: deliveryData._id });
    } catch (err) {
        console.error("Error saving sender data:", err);
        res.status(500).send({ message: "Error saving sender data" });
    }
});

module.exports = router;