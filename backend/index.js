const express = require('express');
const cors = require('cors');
const Delivery = require('../database/src/model'); // Ensure this path is correct
const connectToDatabase = require('../database/src/connect'); // Ensure this function correctly establishes a DB connection
const { getCountriesAndProvinces } = require('./src/UserInfo'); // Ensure this function is implemented correctly

const app = express();
const port = 3001;

connectToDatabase(); // Ensure this is working as expected

app.use(cors());
app.use(express.json());

app.post('/sender-info', async (req, res) => {
    try {
        const deliveryData = new Delivery({ senderInfo: req.body.senderInfo });
        await deliveryData.save();
        res.status(201).json({ message: "Sender data submitted successfully", orderId: deliveryData._id });
    } catch (err) {
        console.error("Error saving sender data:", err);
        res.status(500).send({ message: "Error saving sender data" });
    }
});

app.post('/recipient-info', async (req, res) => {
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

app.post('/package-info', async (req, res) => {
    const { orderId, packageInfo } = req.body;
    console.log("Received package info:", packageInfo);

    try {
        // Update the delivery document in the database
        const updatedDelivery = await Delivery.findByIdAndUpdate(
            orderId,
            { packageInfo },
            { new: true }
        );

        if (!updatedDelivery) {
            return res.status(404).send({ message: "Order not found" });
        }

        res.status(200).json({ message: "Package data updated successfully" });
    } catch (err) {
        console.error("Error updating package data:", err);
        res.status(500).send({ message: "Error updating package data" });
    }
});


app.post('/quotation-service', (req, res) => {
    const { packageInfo } = req.body; // Ensure this is the structure sent from the frontend
    console.log("Received request for quotation service:", packageInfo);
    // Here, you would presumably calculate the quotation based on packageInfo
    // For now, just returning a success message
    res.status(200).json({ message: "Quotation calculated successfully" });
});

app.get('/countries-provinces', (req, res) => {
    try {
        const data = getCountriesAndProvinces();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching countries and provinces:", err);
        res.status(500).send({ message: "Error fetching countries and provinces" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});