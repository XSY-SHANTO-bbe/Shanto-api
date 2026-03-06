const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ১. ডাটাবেজ কানেকশন (পাসওয়ার্ড এনকোডেড %40 সহ)
const mongoURI = "mongodb+srv://botmakenew_db_usershanto:shantobot123%40@cluster0.wr9ezl2.mongodb.net/shantoDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected Successfully!"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ২. ডাটাবেজ মডেল (Schema)
const ShantoBrain = mongoose.model('ShantoBrain', new mongoose.Schema({
    ask: { type: String, required: true, unique: true },
    ans: { type: String, required: true }
}));

// ৩. হোম রাউট (সার্ভার চেক করার জন্য)
app.get('/', (req, res) => {
    res.send("<h1>SHANTO API IS LIVE & READY!</h1>");
});

// ৪. BABY CHAT ROUTE (উত্তর পাওয়ার জন্য)
app.get('/baby', async (req, res) => {
    try {
        const text = req.query.text ? req.query.text.toLowerCase().trim() : "";
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

// ৫. TEACH ROUTE (নতুন কিছু শিখানোর জন্য)
app.get('/teach', async (req, res) => {
    try {
        const { ask, ans } = req.query;
        if (!ask || !ans) return res.status(400).json({ error: "Provide both ask and ans!" });

        await ShantoBrain.findOneAndUpdate(
            { ask: ask.toLowerCase().trim() },
            { ans: ans.trim() },
            { upsert: true, new: true }
        );
        res.json({ msg: "Success! I learned this.", ask: ask, ans: ans });
    } catch (error) {
        res.status(500).json({ error: "Database error during teaching!" });
    }
});

// ৬. EDIT ROUTE (আগের উত্তর পরিবর্তন করার জন্য)
app.get('/edit', async (req, res) => {
    try {
        const { ask, newAns } = req.query;
        if (!ask || !newAns) return res.status(400).json({ error: "Provide ask and newAns!" });

        const updatedData = await ShantoBrain.findOneAndUpdate(
            { ask: ask.toLowerCase().trim() },
            { ans: newAns.trim() },
            { new: true }
        );

        if (updatedData) {
            res.json({ msg: "✅ Updated successfully!", ask: ask, newAns: newAns });
        } else {
            res.status(404).json({ error: "❌ This question does not exist!" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server error during update!" });
    }
});

module.exports = app;
