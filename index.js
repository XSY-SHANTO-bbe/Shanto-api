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
        :root { --bg-dark: #050a14; --card-bg: #0f172a; --accent: #38bdf8; --nav-bg: #030712; }
        body { background-color: var(--bg-dark); color: white; font-family: 'Plus Jakarta Sans', sans-serif; overflow-x: hidden; }
        .glass { background: rgba(17, 24, 39, 0.8); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); }
        .card-hover:hover { border-color: var(--accent); transform: translateY(-5px); transition: all 0.3s ease; }
        #sidebar { position: fixed; left: -280px; top: 0; height: 100%; width: 280px; background: var(--nav-bg); z-index: 60; transition: 0.4s ease-in-out; border-right: 1px solid rgba(255,255,255,0.05); }
        #sidebar.open { left: 0; }
        #overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 50; display: none; }
        .api-item { background: rgba(30, 41, 59, 0.5); border-radius: 12px; padding: 12px 18px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255,255,255,0.03); }
        .get-btn { background: #0ea5e9; font-size: 10px; font-weight: 800; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; color: #000; }
        .cat-icon { w-12 h-12 rounded-xl flex items-center justify-center text-xl shadow-lg; }
        #loader { position: fixed; inset: 0; background: var(--bg-dark); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.5s ease; }
        .spinner { width: 50px; height: 50px; border: 4px solid #1e293b; border-top-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
</head>
<body>

    <div id="loader">
        <div class="spinner mb-5"></div>
        <h1 class="text-3xl font-black text-sky-400 tracking-widest uppercase">SHANTO APIs</h1>
        <p class="text-gray-500 text-sm mt-2">Loading Dashboard...</p>
    </div>

    <div id="overlay" onclick="toggleSidebar()"></div>
    <div id="sidebar" class="p-6 flex flex-col">
        <div class="flex items-center gap-4 mb-10 border-b border-white/5 pb-5">
            <img src="https://i.ibb.co/mF7m8jB/shanto-profile.png" class="w-14 h-14 rounded-full border-4 border-sky-500 shadow-xl shadow-sky-500/20" alt="Shanto">
            <div>
                <h4 class="font-extrabold text-white text-lg">SHANTO</h4>
                <p class="text-xs text-sky-400 font-semibold">@azadx69x-ai</p>
            </div>
        </div>
        <nav class="space-y-5 text-gray-400 font-semibold flex-1">
            <a href="#" class="flex items-center gap-4 hover:text-white transition"><i class="fas fa-th-large w-6 text-center text-lg"></i> Dashboard</a>
            <a href="#" class="flex items-center gap-4 hover:text-white transition"><i class="fas fa-folder w-6 text-center text-lg"></i> Categories</a>
            <a href="#" class="flex items-center gap-4 hover:text-white transition"><i class="fas fa-key w-6 text-center text-lg"></i> API Keys</a>
            <a href="#" class="flex items-center gap-4 hover:text-white transition"><i class="fas fa-cog w-6 text-center text-lg"></i> Settings</a>
        </nav>
        <div class="border-t border-white/5 pt-5 text-gray-700 text-xs font-bold center">Vercel v2.0</div>
    </div>

    <nav class="p-5 flex justify-between items-center sticky top-0 glass z-40">
        <button onclick="toggleSidebar()" class="text-2xl text-white hover:text-sky-400 transition"><i class="fas fa-bars-staggered"></i></button>
        <div class="flex items-center gap-3">
            <span class="text-xs font-bold text-green-400 flex items-center gap-1.5"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span> LIVE</span>
            <img src="https://i.ibb.co/mF7m8jB/shanto-profile.png" class="w-10 h-10 rounded-full border-2 border-sky-500" alt="User">
        </div>
    </nav>

    <div class="max-w-5xl mx-auto p-6 mt-8">
        <div class="text-center mb-16">
            <h1 class="text-5xl md:text-6xl font-extrabold mb-5 tracking-tighter uppercase">
                <span class="text-sky-400">API</span> Collection
            </h1>
            <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed font-light">
                Powerful, fast, and reliable APIs for your next project. Built with performance and developer experience in mind.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <div class="glass p-8 rounded-3xl relative card-hover">
                <i class="fas fa-box absolute top-5 right-5 text-sky-500/10 text-4xl"></i>
                <p class="text-sm text-gray-400 font-semibold mb-2">Total APIs</p>
                <h2 class="text-6xl font-black text-white">53</h2>
            </div>
            <div class="glass p-8 rounded-3xl relative card-hover border-b-4 border-sky-500">
                <i class="fas fa-folder absolute top-5 right-5 text-indigo-500/10 text-4xl"></i>
                <p class="text-sm text-gray-400 font-semibold mb-2">Categories</p>
                <h2 class="text-6xl font-black text-white">14</h2>
            </div>
            <div class="glass p-8 rounded-3xl relative card-hover">
                <i class="fas fa-download absolute top-5 right-5 text-green-500/10 text-4xl"></i>
                <p class="text-sm text-gray-400 font-semibold mb-2">GET Request</p>
                <h2 class="text-6xl font-black text-white">53</h2>
            </div>
            <div class="glass p-8 rounded-3xl relative card-hover">
                <i class="fas fa-upload absolute top-5 right-5 text-red-500/10 text-4xl"></i>
                <p class="text-sm text-gray-400 font-semibold mb-2">POST Request</p>
                <h2 class="text-6xl font-black text-white">0</h2>
            </div>
        </div>

        <div class="space-y-8">
            <div class="flex justify-between items-end border-b border-white/5 pb-4">
                <h2 class="text-2xl font-black uppercase tracking-tight">Browse by Category</h2>
                <span class="text-sm text-gray-500">53 APIs available</span>
            </div>

            <div class="glass rounded-3xl overflow-hidden border border-white/5">
                <div class="p-7 flex items-center gap-5 cursor-pointer hover:bg-white/5 transition" onclick="toggleCategory('ai-list')">
                    <div class="cat-icon bg-sky-500/10 text-sky-400 text-2xl"><i class="fas fa-robot"></i></div>
                    <div class="flex-1">
                        <h4 class="text-xl font-extrabold text-white">Ai</h4>
                        <p class="text-xs text-gray-500">Artificial Intelligence Endpoints</p>
                    </div>
                    <div class="text-right flex items-center gap-3">
                        <span class="text-4xl font-black text-white/10">3</span>
                        <i class="fas fa-chevron-down text-gray-700"></i>
                    </div>
                </div>
                <div id="ai-list" class="px-7 pb-7 hidden space-y-3 border-t border-white/5 pt-5 bg-black/20">
                    <div class="api-item">
                        <div><p class="text-sm font-bold">Baby AI (Messenger)</p><p class="text-[11px] text-gray-500">Chat with smart bot</p></div>
                        <a href="/baby?text=hi" class="get-btn">GET</a>
                    </div>
                    <div class="api-item">
                        <div><p class="text-sm font-bold">Deepseek-AI</p><p class="text-[11px] text-gray-500">Advanced logic AI</p></div>
                        <span class="px-3 py-1 bg-gray-800 text-[10px] rounded-md text-gray-500 uppercase font-black">Lock</span>
                    </div>
                </div>
            </div>

            <div class="glass rounded-3xl overflow-hidden border border-white/5 opacity-60">
                <div class="p-7 flex items-center gap-5 cursor-not-allowed">
                    <div class="cat-icon bg-pink-500/10 text-pink-400 text-2xl"><i class="fas fa-download"></i></div>
                    <div class="flex-1">
                        <h4 class="text-xl font-extrabold text-white">Downloader</h4>
                        <p class="text-xs text-gray-500">Social Media Scrapers</p>
                    </div>
                    <div class="text-right flex items-center gap-3">
                        <span class="text-4xl font-black text-white/10">7</span>
                        <i class="fas fa-lock text-gray-700"></i>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <footer class="mt-24 py-12 text-center border-t border-white/5 text-gray-700 text-xs font-bold uppercase tracking-widest">
        &copy; 2026 Developed with <i class="fas fa-heart text-red-500 mx-1"></i> by SHANTO
    </footer>

    <script>
        // Loader timeout ( হুবহু ভিডিওর মতো )
        window.addEventListener('load', () => {
            setTimeout(() => { 
                const loader = document.getElementById('loader');
                loader.style.opacity = '0';
                setTimeout(() => loader.style.display = 'none', 500);
            }, 1800); // 1.8 seconds loading
        });

        function toggleSidebar() {
            const sb = document.getElementById('sidebar');
            const ol = document.getElementById('overlay');
            sb.classList.toggle('open');
            ol.style.display = sb.classList.contains('open') ? 'block' : 'none';
        }

        function toggleCategory(id) {
            const list = document.getElementById(id);
            const icon = list.previousElementSibling.querySelector('.fa-chevron-down');
            list.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        }
    </script>
</body>
</html>
`;

// মেইন ড্যাশবোর্ড রুট
app.get('/', (req, res) => res.send(dashboardHTML));

// বেবি এপিআই লজিক (তোমার বটের জন্য)
app.get('/baby', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.json({ error: "No text provided" });
    try {
        const response = await axios.get(\`https://api.simsimi.vn/v1/simtalk?text=\${encodeURIComponent(text)}&lc=bn\`);
        res.json({ reply: response.data.message, author: "Shanto" });
    } catch (e) { res.json({ error: "Server Busy" }); }
});

module.exports = app;
