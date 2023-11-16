const express = require('express');
const router = express.Router();
const Delivery = require('../../Database/src/Model');

router.post('/recipient-info', async (req, res) => {
    const { orderId, recipientInfo } = req.body;
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(orderId, { recipientInfo }, { new: true });
        if (!updatedDelivery) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).json({ message: "Recipient data updated successfully" });
    } catch (err) {
        console.error("Error updating recipient data:", err);
        res.status(500).send({ message: "Error updating recipient data" });
    }
});

module.exports = router;
