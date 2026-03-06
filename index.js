const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ১. ডাটাবেজ কানেকশন
const mongoURI = "mongodb+srv://botmakenew_db_usershanto:shantobot123%40@cluster0.wr9ezl2.mongodb.net/shantoDB?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
  .then(() => console.log("✅ Database Connected"))
  .catch((err) => console.log("❌ DB Error: " + err));

// ২. ডাটাবেজ মডেল
const ShantoModel = mongoose.model("ShantoData", new mongoose.Schema({
  ask: String,
  ans: String
}));

// ৩. ড্যাশবোর্ড ভিউ (HTML সরাসরি ইনডেক্স ফাইলে)
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SHANTO APIS Dashboard</title>
        <style>
            body { background-color: #0a0f1d; color: white; font-family: 'Arial', sans-serif; text-align: center; margin: 0; padding: 20px; }
            .container { max-width: 500px; margin: auto; padding-top: 50px; }
            h1 { font-size: 40px; font-style: italic; }
            h1 span { color: #5bc0de; }
            .status-box { display: flex; justify-content: space-around; margin-top: 30px; }
            .card { background: #161c2d; padding: 20px; border-radius: 15px; width: 40%; border: 1px solid #242b3d; }
            .card h3 { font-size: 14px; color: #8892b0; margin-bottom: 5px; }
            .card p { font-size: 20px; font-weight: bold; color: #2ecc71; margin: 0; }
            .card .author { color: #5bc0de; }
            .command-section { background: #161c2d; margin-top: 30px; padding: 20px; border-radius: 15px; text-align: left; border: 1px solid #242b3d; }
            .command-item { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #242b3d; padding-bottom: 10px; }
            .command-item:last-child { border: none; }
            .info h4 { margin: 0; font-size: 16px; }
            .info p { font-size: 12px; color: #5bc0de; font-style: italic; margin-top: 3px; }
            .btn { background: #5bc0de; color: #0a0f1d; padding: 5px 15px; border-radius: 5px; text-decoration: none; font-weight: bold; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>SHANTO <span>APIS</span></h1>
            <p style="color: #8892b0;">Welcome to Professional AI Dashboard</p>

            <div class="status-box">
                <div class="card">
                    <h3>Status</h3>
                    <p>LIVE</p>
                </div>
                <div class="card">
                    <h3>Author</h3>
                    <p class="author">SHANTO</p>
                </div>
            </div>

            <div class="command-section">
                <h3 style="display: flex; align-items: center;"><span style="margin-right: 10px;">🤖</span> AI & Teach Commands</h3>
                
                <div class="command-item">
                    <div class="info">
                        <h4>Baby AI (Response)</h4>
                        <p>Endpoint: /baby?text=hi</p>
                    </div>
                    <a href="/baby?text=hi" class="btn">GET</a>
                </div>

                <div class="command-item">
                    <div class="info">
                        <h4>Teach API (Save Data)</h4>
                        <p>Endpoint: /teach?ask=hi&ans=hello</p>
                    </div>
                    <a href="/teach?ask=hi&ans=hello" class="btn">GET</a>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// ৪. এপিআই রাউটগুলো (আগের মতোই থাকবে যেন কাজ না থামে)
app.get("/baby", async (req, res) => {
  const text = req.query.text ? req.query.text.toLowerCase() : "";
  const findData = await ShantoModel.findOne({ ask: text });
  if (findData) res.json({ reply: findData.ans });
  else res.json({ reply: "আমি এটা জানি না জানু!" });
});

app.get("/teach", async (req, res) => {
  const { ask, ans } = req.query;
  if (!ask || !ans) return res.json({ error: "Missing data!" });
  await ShantoModel.findOneAndUpdate({ ask: ask.toLowerCase() }, { ans: ans }, { upsert: true });
  res.json({ msg: "✅ Success!", ask, ans });
});

module.exports = app;
