const express = require('express');
const axios = require('axios');
const app = express();

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

        /* Video-r moto 3 Dot Loading */
        #loader { position: fixed; inset: 0; background: #050a14; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: 0.6s ease; }
        .dot-wrapper { display: flex; gap: 8px; margin-top: 20px; }
        .dot { width: 12px; height: 12px; background: var(--accent); border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; box-shadow: 0 0 10px var(--accent); }
        .dot:nth-child(1) { animation-delay: -0.32s; }
        .dot:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

        /* Sidebar & Overlay */
        #sidebar { position: fixed; left: -300px; top: 0; height: 100%; width: 280px; background: #020617; z-index: 60; transition: 0.4s cubic-bezier(0.4, 0, 0.2, 1); border-right: 1px solid rgba(56, 189, 248, 0.1); }
        #sidebar.open { left: 0; }
        #overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 50; display: none; backdrop-filter: blur(4px); }

        /* Dropdown Content */
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
            <h4 class="font-black text-xl tracking-tight uppercase text-white">SHANTO</h4>
            <p class="text-[10px] text-sky-400 font-bold tracking-[2px]">OWNER & DEVELOPER</p>
        </div>
        <nav class="space-y-6 text-gray-400 font-bold uppercase text-xs tracking-widest">
            <a href="/" class="flex items-center gap-4 hover:text-white transition"><i class="fas fa-home"></i> Home</a>
            <a href="#" class="flex items-center gap-4 hover:text-white transition"><i class="fas fa-code"></i> API List</a>
        </nav>
    </div>

    <nav class="p-5 flex justify-between items-center sticky top-0 bg-[#050a14]/80 backdrop-blur-lg z-40 border-b border-white/5">
        <button onclick="toggleSidebar()" class="text-2xl text-white"><i class="fas fa-bars-staggered"></i></button>
        <div class="flex items-center gap-3">
            <span class="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-3 py-1 rounded-full uppercase">Online</span>
            <img src="https://i.ibb.co/HTfd7h4L/image0.jpg" class="w-10 h-10 rounded-full border border-sky-500 object-cover">
        </div>
    </nav>

    <div class="max-w-5xl mx-auto p-6 mt-10">
        <div class="text-center mb-16">
            <h1 class="text-5xl md:text-6xl font-black mb-4 uppercase tracking-tighter italic">
                <span class="text-white">SHANTO</span> <span class="text-sky-400">APIs</span>
            </h1>
            <p class="text-gray-500 text-sm">Welcome to <span class="text-white font-bold uppercase">Shanto's</span> Professional Dashboard</p>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div class="glass-card p-6 text-center"><p class="text-[10px] text-gray-500 font-bold mb-1">Total APIs</p><h2 class="text-4xl font-black">1</h2></div>
            <div class="glass-card p-6 text-center border-b-4 border-sky-500"><p class="text-[10px] text-gray-500 font-bold mb-1">Category</p><h2 class="text-4xl font-black">1</h2></div>
            <div class="glass-card p-6 text-center"><p class="text-[10px] text-gray-500 font-bold mb-1">Status</p><h2 class="text-2xl font-black text-green-400 uppercase">Live</h2></div>
            <div class="glass-card p-6 text-center"><p class="text-[10px] text-gray-500 font-bold mb-1">User</p><h2 class="text-xl font-black uppercase text-sky-400">SHANTO</h2></div>
        </div>

        <div class="space-y-4">
            <h3 class="text-lg font-black uppercase tracking-widest mb-6 border-l-4 border-sky-500 pl-3">Browse Categories</h3>

            <div class="glass-card overflow-hidden">
                <div class="p-6 flex justify-between items-center cursor-pointer hover:bg-white/5 transition" onclick="toggleCategory('ai-box')">
                    <div class="flex items-center gap-5">
                        <div class="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 text-xl"><i class="fas fa-robot"></i></div>
                        <div>
                            <h4 class="font-bold text-lg">Ai Commands</h4>
                            <p class="text-[10px] text-gray-500">Intelligent chat endpoints</p>
                        </div>
                    </div>
                    <i class="fas fa-chevron-down text-gray-600 transition-transform duration-300" id="icon-ai-box"></i>
                </div>
                <div id="ai-box" class="api-content">
                    <div class="p-5 space-y-3">
                        <div class="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/5">
                            <div><p class="text-sm font-bold">Baby AI (Messenger)</p><p class="text-[10px] text-sky-400 italic">Endpoint: /baby</p></div>
                            <a href="/baby?text=hi" target="_blank" class="bg-sky-500 text-black text-[10px] font-black px-4 py-2 rounded-lg uppercase shadow-lg shadow-sky-500/20">GET</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="mt-20 py-10 text-center border-t border-white/5 text-gray-700 text-[10px] font-bold uppercase tracking-[3px]">
        &copy; 2026 Crafted with ❤️ by SHANTO
    </footer>

    <script>
        // Smooth Loading Animation Close
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 600);
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

app.get('/baby', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.json({ error: "Text provide koro!" });
    try {
        const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(text)}&lc=bn`);
        res.json({ reply: response.data.message, author: "Shanto" });
    } catch (e) {
        res.json({ error: "Server error!" });
    }
});

module.exports = app;
