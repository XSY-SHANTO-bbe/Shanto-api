const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

app.use(express.json());

// ১. সুন্দর ড্যাশবোর্ড (Frontend)
app.get('/', (req, res) => {
    res.send(`
    <html>
        <head>
            <title>Shanto API Collection</title>
            <style>
                body { background: #0f172a; color: white; font-family: sans-serif; text-align: center; padding: 50px; }
                .card { background: #1e293b; border-radius: 15px; padding: 20px; display: inline-block; box-shadow: 0 4px 15px rgba(0,0,0,0.3); border: 1px solid #334155; }
                h1 { color: #38bdf8; }
                .btn { background: #38bdf8; color: #0f172a; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-weight: bold; }
                .status { color: #4ade80; font-weight: bold; }
            </style>
        </head>
        <body>
            <h1>SHANTO API COLLECTION</h1>
            <div class="card">
                <p>Status: <span class="status">ONLINE</span></p>
                <p>Total APIs: 1 (Baby AI)</p>
                <a href="/baby?text=hi" class="btn">Test Baby AI</a>
            </div>
            <p style="margin-top: 20px;">Powered by Vercel & Shanto</p>
        </body>
    </html>
    `);
});

// ২. বেবি এপিআই লজিক (The Intelligence)
app.get('/baby', async (req, res) => {
    const query = req.query.text;
    if (!query) return res.json({ error: "Please provide text!" });

    try {
        // এটি একটি পাওয়ারফুল সার্ভার থেকে উত্তর নিয়ে আসবে
        const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(query)}&lc=bn`);
        
        res.json({
            reply: response.data.message,
            author: "Shanto",
            status: "success"
        });
    } catch (error) {
        res.json({ reply: "দুঃখিত, আমি এখন একটু ঘুমাচ্ছি!", author: "Shanto" });
    }
});

module.exports = app;
