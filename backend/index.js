const {getCountriesAndProvinces} = require('./src/UserInfo')
const Delivery = require('../database/src/model');
const connectToDatabase = require('../database/src/connect');
const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

let deliveries = []
connectToDatabase()
app.use(cors())
app.use(express.json())
app.post('/submit-delivery', (req,res) => {
    //const deliveryData = req.body
    const deliveryData = new Delivery(req.body)
    //console.log('Received delivery data:', deliveryData)
    //deliveries.push(deliveryData)
    deliveryData.save()
        .then(() => res.status(201).send({ message: "Delivery data submitted successfully" }))
        .catch(err => {
            console.error(err);
            res.status(500).send({ message: "Error saving delivery data" });
        });
})

app.get('/countries-provinces',(req,res)=> {
    const data = getCountriesAndProvinces()
    res.status(200).send(data)
})

app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`)
})
