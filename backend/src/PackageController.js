const express = require('express');
const router = express.Router();
const Delivery = require('../../database/src/model');

router.post('/package-info', async (req, res) => {
    const { orderId, packageInfo } = req.body;
    try {
        const updatedDelivery = await Delivery.findByIdAndUpdate(orderId, { packageInfo }, { new: true });
        if (!updatedDelivery) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).json({ message: "Package data updated successfully" });
    } catch (err) {
        console.error("Error updating package data:", err);
        res.status(500).send({ message: "Error updating package data" });
    }
});

module.exports = router;
