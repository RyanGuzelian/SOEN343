const express = require('express');
const router = express.Router();
const Delivery = require('../../Database/src/Model');

// Define a POST endpoint to receive payment information
router.post('/delivery', async (req, res) => {
    try {
        const { orderID, deliveryDate, deliveryTime } = req.body;

        // Save delivery information to the database
        const delivery = new Delivery({
            orderID,
            deliveryDate,
            deliveryTime,
        });

        await delivery.save();

        res.status(201).json({ message: 'Delivery information saved successfully' });
    } catch (error) {
        console.error('Error saving delivery information:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;