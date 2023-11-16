const express = require('express');
const router = express.Router();

// Assuming getCountriesAndProvinces is a function that returns the country-province data
const { getCountriesAndProvinces } = require('./Utility/UserInfo');

router.get('/countries-provinces', (req, res) => {
    try {
        const data = getCountriesAndProvinces();
        res.status(200).json(data);
    } catch (err) {
        console.error("Error fetching countries and provinces:", err);
        res.status(500).send({ message: "Error fetching countries and provinces" });
    }
});

module.exports = router;