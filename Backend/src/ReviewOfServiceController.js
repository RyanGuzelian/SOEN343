// controllers/reviewsController.js
const express = require('express');
const router = express.Router();
const Delivery = require('../../Database/src/Model');

// Create a new review associated with an order
router.post('/reviews', async (req, res) => {
    try {
        const { text, rating, orderId } = req.body;

        // Find the delivery associated with the order
        const delivery = await Delivery.findOne({ _id: orderId });

        if (!delivery) {
            return res.status(404).json({ error: 'Order not found' });
        }

        // Add the review to the delivery
        delivery.reviewInfo = { text, rating };
        await delivery.save();

        res.status(201).json({ message: 'Review submitted successfully' });
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get the review associated with a specific order
router.get('/reviews/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const delivery = await Delivery.findOne({ _id: orderId });

        if (!delivery || !delivery.reviewInfo) {
            return res.status(404).json({ error: 'Review not found for this order' });
        }

        const { text, rating } = delivery.reviewInfo;
        res.json({ text, rating });
    } catch (error) {
        console.error('Error fetching review:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
