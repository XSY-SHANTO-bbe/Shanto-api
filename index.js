// Edit বা Update করার রাস্তা
app.get('/edit', async (req, res) => {
    try {
        const { ask, newAns } = req.query;
        if (!ask || !newAns) return res.status(400).json({ error: "আগের প্রশ্ন (ask) এবং নতুন উত্তর (newAns) দাও জানু!" });

        // ডাটাবেজে আগের প্রশ্নটি খুঁজে তার উত্তর বদলে দেওয়া
        const updatedData = await ShantoData.findOneAndUpdate(
            { ask: ask.toLowerCase() },
            { ans: newAns },
            { new: true } // এটি আপডেট হওয়া নতুন ডেটা রিটার্ন করবে
        );

        if (updatedData) {
            res.json({ msg: "✅ উত্তর পরিবর্তন করা হয়েছে!", ask: updatedData.ask, newAns: updatedData.ans });
        } else {
            res.status(404).json({ error: "❌ এই প্রশ্নটি ডাটাবেজে খুঁজে পাওয়া যায়নি!" });
        }
    } catch (e) {
        res.status(500).json({ error: "সার্ভারে সমস্যা হয়েছে!" });
    }
});
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// তোমার সঠিক ডাটাবেজ কানেকশন লিঙ্ক
const mongoURI = "mongodb+srv://botmakenew_db_usershanto:shantobot123%40@cluster0.wr9ezl2.mongodb.net/shantoDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ডাটাবেজ মডেল
const ShantoBrain = mongoose.model('ShantoBrain', new mongoose.Schema({
    ask: { type: String, required: true, unique: true },
    ans: { type: String, required: true }
}));

// Home Route (সার্ভার চেক করার জন্য)
app.get('/', (req, res) => {
    res.send("<h1>SHANTO API IS LIVE!</h1>");
});

// Teach Route
app.get('/teach', async (req, res) => {
    try {
        const { ask, ans } = req.query;
        if (!ask || !ans) return res.status(400).json({ error: "Provide both ask and ans!" });

        await ShantoBrain.findOneAndUpdate(
            { ask: ask.toLowerCase() },
            { ans: ans },
            { upsert: true, new: true }
        );
        res.json({ msg: "Success! I learned this.", ask, ans });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error during teaching!" });
    }
});

// Baby Route (উত্তর পাওয়ার জন্য)
app.get('/baby', async (req, res) => {
    try {
        const text = req.query.text ? req.query.text.toLowerCase() : "";
        if (!text) return res.status(400).json({ error: "Text is required!" });

        const data = await ShantoBrain.findOne({ ask: text });
        if (data) {
            res.json({ reply: data.ans });
        } else {
            res.json({ reply: "আমি এটা জানি না জানু! আমাকে শিখিয়ে দাও।" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal server error!" });
    }
});

module.exports = app;
