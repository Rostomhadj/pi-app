const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Pi Network Production API Credentials
const PI_API_KEY = "YOUR_SECRET_PI_API_KEY_HERE"; 
const PI_API_URL = "https://api.minepi.com/v2";

// 1. Route for handling payment approval from Pi Blockchain Nodes
app.post('/api/approve-payment', async (req, res) => {
    const { paymentId } = req.body;
    try {
        const response = await axios.post(`${PI_API_URL}/payments/${paymentId}/approve`, {}, {
            headers: { 'Authorization': `Key ${PI_API_KEY}` }
        });
        res.json({ success: true, message: "Payment approved successfully.", data: response.data });
    } catch (error) {
        console.error("Approval Error:", error.message);
        res.status(500).json({ success: false, error: "Payment approval failed." });
    }
});

// 2. Route for handling final payment completion and settlement
app.post('/api/complete-payment', async (req, res) => {
    const { paymentId, txid } = req.body;
    try {
        const response = await axios.post(`${PI_API_URL}/payments/${paymentId}/complete`, { txid }, {
            headers: { 'Authorization': `Key ${PI_API_KEY}` }
        });
        res.json({ success: true, message: "Payment verified and completed on-chain.", data: response.data });
    } catch (error) {
        console.error("Completion Error:", error.message);
        res.status(500).json({ success: false, error: "Payment completion failed." });
    }
});

// Server configuration port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`WhatsPi Backend Core running on port ${PORT}`);
});
      
