const express = require('express');
const axios = require('axios');
const app = express();

app.get('/', (req, res) => {
    res.json({ status: "Active", message: "Shanto's Baby API is Ready!" });
});

app.get('/baby', async (req, res) => {
    const query = req.query.text;
    if (!query) return res.json({ error: "Please provide text!" });

    try {
        // এটি একটি পাবলিক এআই সার্ভার থেকে উত্তর নিয়ে আসবে
        const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(query)}&lc=bn`);
        const reply = response.data.message;

        res.json({
            reply: reply,
            author: "Shanto"
        });
    } catch (error) {
        res.json({ reply: "ওরে বাবা! আমার সার্ভারে একটু সমস্যা হইছে।", author: "Shanto" });
    }
});

module.exports = app;
