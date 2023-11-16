const express = require('express');
const router = express.Router();
const Delivery = require('../../Database/src/Model');

// Update tracking status
router.get('/tracking/:orderId', async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const delivery = await Delivery.findById(orderId);

        if (!delivery) {
            return res.status(404).send({ message: "Order not found" });
        }

        // Cycle through statuses for demonstration purposes
        const statuses = ["Processing", "In Transit", "Out for Delivery", "Delivered"];
        let currentIndex = statuses.indexOf(delivery.trackingInfo.state);
        currentIndex = (currentIndex + 1) % statuses.length; // Move to next status, or loop back to start

        // Update status in database
        delivery.trackingInfo.state = statuses[currentIndex];
        await delivery.save();

        res.status(200).json({ state: delivery.trackingInfo.state });
    } catch (err) {
        console.error("Error fetching tracking info:", err);
        res.status(500).send({ message: "Error fetching tracking information" });
    }
});

module.exports = router;
