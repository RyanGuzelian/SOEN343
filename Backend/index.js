const express = require('express');
const cors = require('cors');
require('../Database/src/Model');
const connectToDatabase = require('../Database/src/Connect');
const sender = require('./src/SenderController');
const recipient = require('./src/RecipientController');
const packageModule = require('./src/PackageController');
const quotation = require('./src/QuotationController');
const order = require('./src/OrderController');
const tracking = require('./src/TrackingController');
const customerSupport = require('./src/CustomerSupportController');
const utility = require('./src/UtilityController');
const app = express();
const port = 3001;

connectToDatabase();

app.use(cors());
app.use(express.json());

app.use(sender)
app.use(sender);
app.use(recipient);
app.use(packageModule);
app.use(quotation);
app.use(order);
app.use(tracking);
app.use(customerSupport);
app.use(utility);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});