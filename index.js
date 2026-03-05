app.get('/favicon.ico', (req, res) => res.status(204));
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- MongoDB Connection (Password encoded correctly) ---
const mongoURI = "mongodb+srv://botmakenew_db_usershanto:shantobot123%40@cluster0.wr9ezl2.mongodb.net/shantoDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log("Database Connected! Dashboard is Live."))
    .catch(err => console.log("DB Connection Error: ", err));

const Brain = mongoose.model('Brain', new mongoose.Schema({ ask: String, ans: String }));

// --- Your Premium Dashboard HTML Style ---
const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHANTO APIs - Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');
        :root { --bg: #030712; --accent: #38bdf8; }
        body { background-color: #050a14; color: white; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

        /* 3 Dot Loading Animation */
        #loader { position: fixed; inset: 0; background: #050a14; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: 0.6s ease; }
        .dot-wrapper { display: flex; gap: 8px; margin-top: 20px; }
        .dot { width: 12px; height: 12px; background: var(--accent); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; box-shadow: 0 0 10px var(--accent); }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

        /* Sidebar Slide */
        #sidebar { position: fixed; left: -300px; top: 0; height: 100%; width: 280px; background: #020617; z-index: 60; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); border-right: 1px solid rgba(56, 189, 248, 0.1); }
        #sidebar.open { left: 0; }
        #overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 50; display: none; backdrop-filter: blur(4px); }

        /* Dropdown Style */
        .api-content { max-height: 0; overflow: hidden; transition: max-height 0.4s ease-out; background: rgba(255,255,255,0.02); }
        .api-content.show { max-height: 500px; transition: max-height 0.5s ease-in; }
        
        .glass-card { background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; transition: 0.3s; }
        .glass-card:hover { border-color: var(--accent); transform: translateY(-3px); }
    </style>
</head>
<body>
    <div id="loader">
        <h1 class="text-3xl font-black text-sky-400 tracking-widest uppercase italic">SHANTO APIs</h1>
        <div class="dot-wrapper"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    </div>

    <div id="overlay" onclick="toggleSidebar()"></div>
    <div id="sidebar" class="p-8">
        <div class="flex flex-col items-center mb-10 border-b border-white/5 pb-8 text-center">
            <img src="https://i.ibb.co/HTfd7h4L/image0.jpg" class="w-20 h-20 rounded-full border-4 border-sky-500 shadow-2xl shadow-sky-500/30 mb-4 object-cover">
            <h4 class="font-black text-xl tracking-tight uppercase">SHANTO</h4>
            <p class="text-[10px] text-sky-400 font-bold tracking-[2px]">OWNER & DEVELOPER</p>
        </div>
        <nav class="space-y-6 text-gray-400 font-bold uppercase text-xs tracking-widest">
            <a href="/" class="flex items-center gap-4 hover:text-white transition"><i class="fas fa-home"></i> Home</a>
        </nav>
    </div>

    <nav class="p-5 flex justify-between items-center sticky top-0 bg-[#050a14]/80 backdrop-blur-lg z-40 border-b border-white/5">
        <button onclick="toggleSidebar()" class="text-2xl text-white"><i class="fas fa-bars-staggered"></i></button>
        <div class="flex items-center gap-3">
            <img src="https://i.ibb.co/HTfd7h4L/image0.jpg" class="w-10 h-10 rounded-full border border-sky-500 object-cover">
        </div>
    </nav>

    <div class="max-w-5xl mx-auto p-6 mt-10">
        <div class="text-center mb-16">
            <h1 class="text-5xl md:text-6xl font-black mb-4 uppercase italic">
                <span class="text-white">SHANTO</span> <span class="text-sky-400">APIs</span>
            </h1>
            <p class="text-gray-500 text-sm italic font-bold">Welcome to Professional AI Dashboard</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div class="glass-card p-6 text-center"><p class="text-[10px] text-gray-500 font-bold mb-1">Status</p><h2 class="text-2xl font-black text-green-400 uppercase">Live</h2></div>
            <div class="glass-card p-6 text-center"><p class="text-[10px] text-gray-500 font-bold mb-1">Author</p><h2 class="text-xl font-black uppercase text-sky-400">SHANTO</h2></div>
        </div>

        <div class="glass-card overflow-hidden">
            <div class="p-6 flex justify-between items-center cursor-pointer" onclick="toggleCategory('ai-box')">
                <div class="flex items-center gap-5">
                    <div class="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 text-xl"><i class="fas fa-robot"></i></div>
                    <h4 class="font-bold text-lg">AI & Teach Commands</h4>
                </div>
                <i class="fas fa-chevron-down text-gray-600 transition-transform duration-300" id="icon-ai-box"></i>
            </div>
            <div id="ai-box" class="api-content">
                <div class="p-5 space-y-3">
                    <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
                        <div><p class="text-sm font-bold">Baby AI (Response)</p><p class="text-[10px] text-sky-400 italic">Endpoint: /baby?text=hi</p></div>
                        <a href="/baby?text=hi" target="_blank" class="bg-sky-500 text-black text-[10px] font-black px-4 py-2 rounded-lg uppercase">GET</a>
                    </div>
                    <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
                        <div><p class="text-sm font-bold">Teach API (Save Data)</p><p class="text-[10px] text-sky-400 italic">Endpoint: /teach?ask=hi&ans=hello</p></div>
                        <a href="/teach?ask=hi&ans=hello" target="_blank" class="bg-sky-500 text-black text-[10px] font-black px-4 py-2 rounded-lg uppercase">GET</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => document.getElementById('loader').style.display = 'none', 600);
            }, 1800);
        });
        function toggleSidebar() {
            const sb = document.getElementById('sidebar');
            const ol = document.getElementById('overlay');
            sb.classList.toggle('open');
            ol.style.display = sb.classList.contains('open') ? 'block' : 'none';
        }
        function toggleCategory(id) {
            const content = document.getElementById(id);
            const icon = document.getElementById('icon-'+id);
            content.classList.toggle('show');
            icon.style.transform = content.classList.contains('show') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    </script>
</body>
</html>
`;

app.get('/', (req, res) => res.send(dashboardHTML));

// --- API Implementation ---
app.get('/teach', async (req, res) => {
    const { ask, ans } = req.query;
    if (!ask || !ans) return res.json({ error: "Provide both ask and ans!" });
    try {
        await Brain.findOneAndUpdate({ ask: ask.toLowerCase() }, { ans }, { upsert: true });
        res.json({ msg: "Success! Shanto, data saved to MongoDB.", success: true });
    } catch (e) { res.status(500).json({ error: "DB Teach Error" }); }
});

app.get('/baby', async (req, res) => {
    const text = (req.query.text || "").toLowerCase();
    if (!text) return res.json({ error: "Provide text query!" });
    try {
        const data = await Brain.findOne({ ask: text });
        if (data) return res.json({ reply: data.ans, author: "Shanto" });

        const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(text)}&lc=bn`);
        res.json({ reply: response.data.message, author: "Shanto" });
    } catch (e) { res.json({ reply: "Ami eta jani na, shikhaye dao!", author: "Shanto" }); }
});

module.exports = app;
