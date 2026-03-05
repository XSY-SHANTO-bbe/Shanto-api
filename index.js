const express = require('express');
const axios = require('axios');
const app = express();

// ১. প্রিমিয়াম ড্যাশবোর্ড ডিজাইন
const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHANTO APIs Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');
        body { background-color: #050a14; color: white; font-family: 'Plus Jakarta Sans', sans-serif; }
        .glass { background: rgba(17, 24, 39, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
        #sidebar { position: fixed; left: -280px; top: 0; height: 100%; width: 280px; background: #030712; z-index: 60; transition: 0.4s ease-in-out; border-right: 1px solid rgba(255,255,255,0.05); }
        #sidebar.open { left: 0; }
        #overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 50; display: none; }
        .api-item { background: rgba(30, 41, 59, 0.5); border-radius: 12px; padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .get-btn { background: #0ea5e9; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 6px; color: black; }
    </style>
</head>
<body>

    <div id="overlay" onclick="toggleSidebar()"></div>
    <div id="sidebar" class="p-6">
        <div class="flex items-center gap-4 mb-10 border-b border-white/5 pb-5">
            <img src="https://i.ibb.co/mF7m8jB/shanto-profile.png" class="w-14 h-14 rounded-full border-2 border-sky-500">
            <div><h4 class="font-bold">SHANTO</h4><p class="text-xs text-sky-400 font-bold">@azadx69x</p></div>
        </div>
        <nav class="space-y-6 text-gray-400 font-bold uppercase text-xs tracking-widest">
            <a href="/" class="flex items-center gap-4 hover:text-white"><i class="fas fa-th-large"></i> Dashboard</a>
            <a href="#" class="flex items-center gap-4 hover:text-white"><i class="fas fa-folder"></i> Categories</a>
        </nav>
    </div>

    <nav class="p-5 flex justify-between items-center sticky top-0 glass z-40">
        <button onclick="toggleSidebar()" class="text-2xl text-white"><i class="fas fa-bars-staggered"></i></button>
        <img src="https://i.ibb.co/mF7m8jB/shanto-profile.png" class="w-10 h-10 rounded-full border-2 border-sky-500">
    </nav>

    <div class="max-w-5xl mx-auto p-6">
        <div class="text-center my-12">
            <h1 class="text-5xl font-black mb-4 uppercase tracking-tighter text-sky-400">API Collection</h1>
            <p class="text-gray-400 text-sm">Powerful and reliable APIs for your projects.</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div class="glass p-8 rounded-3xl text-center"><p class="text-xs text-gray-400 font-bold">Total APIs</p><h2 class="text-5xl font-black">53</h2></div>
            <div class="glass p-8 rounded-3xl text-center border-b-4 border-sky-500"><p class="text-xs text-gray-400 font-bold">Categories</p><h2 class="text-5xl font-black">14</h2></div>
            <div class="glass p-8 rounded-3xl text-center"><p class="text-xs text-gray-400 font-bold">GET Endpoints</p><h2 class="text-5xl font-black">53</h2></div>
            <div class="glass p-8 rounded-3xl text-center"><p class="text-xs text-gray-400 font-bold">POST Endpoints</p><h2 class="text-5xl font-black">0</h2></div>
        </div>

        <div class="glass rounded-3xl overflow-hidden p-6">
            <h2 class="text-xl font-black mb-6 border-l-4 border-sky-500 pl-4 uppercase">AI Category</h2>
            <div class="api-item">
                <div><p class="text-sm font-bold">Baby AI (Messenger)</p><p class="text-[10px] text-gray-500 italic">Chat with Shanto's Bot</p></div>
                <a href="/baby?text=hi" class="get-btn">GET</a>
            </div>
        </div>
    </div>

    <script>
        function toggleSidebar() {
            const sb = document.getElementById('sidebar');
            const ol = document.getElementById('overlay');
            sb.classList.toggle('open');
            ol.style.display = sb.classList.contains('open') ? 'block' : 'none';
        }
    </script>
</body>
</html>
`;

// ২. এন্ডপয়েন্টগুলো ঠিক করা
app.get('/', (req, res) => res.send(dashboardHTML));

app.get('/baby', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.json({ error: "Please provide a 'text' query!" });
    try {
        const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(text)}&lc=bn`);
        res.json({ reply: response.data.message, author: "Shanto" });
    } catch (e) {
        res.json({ error: "API Server Busy. Try again later!" });
    }
});

module.exports = app;
