const express = require('express');
const router = express.Router();
const { getQuotation } = require('./Services/QuotationService');
const Delivery = require('../../database/src/model');

router.post('/quotation-service', async (req, res) => {
    try {
        const { height, width, length, weight } = req.body.packageInfo;
        const regularPrice = getQuotation({ height, width, length, weight }, "regular");
        const expressPrice = getQuotation({ height, width, length, weight }, "express");
        if (!req.body.packageInfo) {
            return res.status(400).send({ message: "Missing package information" });
        }
        res.status(200).json({ regularPrice, expressPrice });
    } catch (err) {
        console.error("Error calculating quotation:", err);
        res.status(500).send({ message: "Error calculating quotation" });
    }
});

router.post('/quotation-info', async (req, res) => {
    const { orderId, quotation } = req.body;

    try {
        // Update only the quotationInfo part of the delivery document
        const updatedDelivery = await Delivery.findByIdAndUpdate(
            orderId,
            { quotationInfo: quotation }, // Update only the quotationInfo field
            { new: true }
        );

        if (!updatedDelivery) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).json({ message: "Quotation info updated successfully" });
    } catch (err) {
        console.error("Error updating quotation info:", err);
        res.status(500).send({ message: "Error updating quotation info" });
    }
});

module.exports = router;
