const {getCountriesAndProvinces} = require('./src/UserInfo')
const Delivery = require('../database/src/model');
const connectToDatabase = require('../database/src/connect');
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

connectToDatabase()
app.use(cors())
app.use(express.json())
app.post('/submit-delivery', (req,res) => {
    const deliveryData = new Delivery(req.body)
    deliveryData.save()
        .then(() => res.status(201).send({ message: "Delivery data submitted successfully" }))
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: "Error saving delivery data" });
        });
})

app.post('/quotation-service', (req, res) => {
    const deliveryData = req.body;
    console.log("Received request for quotation service");
    res.status(200).json({ message: "Message received successfully" });
    //quotation service here to calculate the price
});

app.get('/quotation-service', (req, res) => {
   //will send quotation to the /quotation-service
});

app.get('/countries-provinces',(req,res)=> {
    const data = getCountriesAndProvinces()
    res.status(200).send(data)
})

app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`)
})
