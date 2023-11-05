const express = require('express')
const cors = require('cors')

const app = express()
const port = 3001

let deliveries = []

app.use(cors())
app.use(express.json())

app.post('/submit-delivery', (req,res) => {
    const deliveryData = req.body
    console.log('Received delivery data:', deliveryData)

    deliveries.push(deliveryData)
    res.status(201).send({message:"Delivery data submitted successfully"})
})

app.listen(port,() => {
    console.log(`Server listening at http://localhost:${port}`)
})
