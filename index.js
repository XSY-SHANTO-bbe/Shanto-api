const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json({ status: "Active", message: "Welcome to Shanto's API Server" });
});

app.get('/chat', (req, res) => {
    const msg = req.query.msg;
    if (!msg) return res.json({ error: "Please provide a message!" });
    
    // এখানে আপনি চাইলে নিজের মতো রিপ্লাই সেট করতে পারেন
    res.json({
        reply: `You said: ${msg}. I am learning to chat!`,
        author: "IT'S Shanto"
    });
});

module.exports = app;
