const express = require('express');
const axios = require('axios');
const app = express();

const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SHANTO APIs Collection</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap');
        :root { --bg: #050a14; --card: #0f172a; --accent: #38bdf8; }
        body { background-color: var(--bg); color: white; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }

        /* Video-r moto Loading Animation */
        #loader { position: fixed; inset: 0; background: #050a14; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: 0.5s; }
        .dots { display: flex; gap: 8px; margin-top: 20px; }
        .dot { width: 12px; height: 12px; background: var(--accent); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

        /* Sidebar Slide Animation */
        #sidebar { position: fixed; left: -300px; top: 0; height: 100%; width: 280px; background: #030712; z-index: 60; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); border-right: 1px solid rgba(255,255,255,0.05); }
        #sidebar.open { left: 0; }
        #overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 50; display: none; }

        /* Category List Animation */
        .api-list { max-height: 0; overflow: hidden; transition: max-height 0.5s ease-out; background: rgba(0,0,0,0.2); }
        .api-list.active { max-height: 500px; transition: max-height 0.5s ease-in; }

        .glass { background: rgba(17, 24, 39, 0.6); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; }
        .folder-btn { cursor: pointer; transition: 0.3s; }
        .folder-btn:hover { background: rgba(56, 189, 248, 0.1); }
        .get-btn { background: #38bdf8; color: black; font-size: 10px; font-weight: 800; padding: 4px 12px; border-radius: 6px; text-transform: uppercase; }
    </style>
</head>
<body>

    <div id="loader">
        <h1 class="text-3xl font-black text-sky-400 tracking-tighter uppercase">SHANTO APIs</h1>
        <p class="text-gray-500 text-sm mt-2">Loading Dashboard...</p>
        <div class="dots"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>
    </div>

    <div id="overlay" onclick="toggleSidebar()"></div>
    <div id="sidebar" class="p-6">
        <div class="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
            <img src="https://i.ibb.co/mF7m8jB/shanto-profile.png" class="w-14 h-14 rounded-full border-2 border-sky-500 shadow-lg shadow-sky-500/20">
            <div>
                <h4 class="font-bold text-lg text-white">SHANTO</h4>
                <p class="text-[10px] text-sky-400 font-bold uppercase tracking-widest">Developer</p>
            </div>
        </div>
        <nav class="space-y-6 text-gray-400 font-bold text-xs tracking-widest uppercase">
            <a href="/" class="flex items-center gap-4 hover:text-white"><i class="fas fa-th-large text-lg"></i> Dashboard</a>
            <a href="#" class="flex items-center gap-4 hover:text-white"><i class="fas fa-folder text-lg"></i> Categories</a>
        </nav>
    </div>

    <nav class="p-5 flex justify-between items-center sticky top-0 bg-[#050a14]/80 backdrop-blur-md z-40 border-b border-white/5">
        <button onclick="toggleSidebar()" class="text-2xl"><i class="fas fa-bars-staggered"></i></button>
        <div class="flex items-center gap-3">
            <img src="https://i.ibb.co/mF7m8jB/shanto-profile.png" class="w-10 h-10 rounded-full border-2 border-sky-500">
        </div>
    </nav>

    <div class="max-w-4xl mx-auto p-6 mt-10">
        <div class="text-center mb-16">
            <h1 class="text-5xl font-black mb-4 uppercase tracking-tighter italic">
                <span class="text-white">API</span> <span class="text-sky-400">COLLECTION</span>
            </h1>
            <p class="text-gray-400 text-sm">Powerful endpoints built by <span class="text-white font-bold">SHANTO</span></p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div class="glass p-6 text-center">
                <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">Total APIs</p>
                <h2 class="text-4xl font-black">53</h2>
            </div>
            <div class="glass p-6 text-center border-b-4 border-sky-500">
                <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">Categories</p>
                <h2 class="text-4xl font-black">14</h2>
            </div>
            <div class="glass p-6 text-center">
                <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">Status</p>
                <h2 class="text-2xl font-black text-green-400 uppercase">Live</h2>
            </div>
            <div class="glass p-6 text-center">
                <p class="text-[10px] text-gray-500 font-bold uppercase mb-1">Author</p>
                <h2 class="text-xl font-black uppercase">SHANTO</h2>
            </div>
        </div>

        <div class="space-y-4">
            <h3 class="text-xl font-black uppercase tracking-widest mb-6">Browse by Category</h3>

            <div class="glass overflow-hidden">
                <div class="p-6 flex justify-between items-center folder-btn" onclick="toggleCategory('ai-cat')">
                    <div class="flex items-center gap-5">
                        <div class="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 text-xl"><i class="fas fa-folder"></i></div>
                        <div>
                            <h4 class="font-bold">Ai</h4>
                            <p class="text-[10px] text-gray-500">Intelligence based endpoints</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <span class="text-2xl font-black text-white/10">3</span>
                        <i class="fas fa-chevron-down text-gray-600 transition-transform duration-300" id="icon-ai-cat"></i>
                    </div>
                </div>
                <div id="ai-cat" class="api-list">
                    <div class="p-4 space-y-3">
                        <div class="flex justify-between items-center bg-white/5 p-4 rounded-xl">
                            <div><p class="text-sm font-bold">Baby AI</p><p class="text-[10px] text-gray-500 italic">By Shanto</p></div>
                            <a href="/baby?text=hi" class="get-btn">GET</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        window.addEventListener('load', () => {
            setTimeout(() => { document.getElementById('loader').style.opacity = '0'; 
            setTimeout(() => document.getElementById('loader').style.display = 'none', 500); }, 2000);
        });

        function toggleSidebar() {
            document.getElementById('sidebar').classList.toggle('open');
            document.getElementById('overlay').style.display = document.getElementById('sidebar').classList.contains('open') ? 'block' : 'none';
        }

        function toggleCategory(id) {
            const list = document.getElementById(id);
            const icon = document.getElementById('icon-'+id);
            list.classList.toggle('active');
            icon.style.transform = list.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
    </script>
</body>
</html>
`;

app.get('/', (req, res) => res.send(dashboardHTML));
app.get('/baby', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.json({ error: "Text pathao!" });
    try {
        const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(text)}&lc=bn`);
        res.json({ reply: response.data.message, author: "Shanto" });
    } catch (e) { res.json({ error: "Server error" }); }
});

module.exports = app;
