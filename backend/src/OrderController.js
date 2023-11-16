const express = require('express');
const router = express.Router();
const Delivery = require('../../database/src/model');

// Fetch order details
router.get('/order-details/:orderId', async (req, res) => {
    const { orderId } = req.params;

    try {
        const orderDetails = await Delivery.findById(orderId);
        if (!orderDetails) {
            return res.status(404).send({ message: "Order not found" });
        }
        res.status(200).json(orderDetails);
    } catch (err) {
        console.error("Error fetching order details:", err);
        res.status(500).send({ message: "Error fetching order details" });
    }
});

module.exports = router;
