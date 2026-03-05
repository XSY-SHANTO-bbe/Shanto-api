const express = require('express');
const axios = require('axios');
const app = express();

// ১. প্রিমিয়াম ড্যাশবোর্ড ডিজাইন (HTML/CSS/Tailwind)
const dashboardHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>API Collection | Shanto</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;800&display=swap');
        body { 
            background-color: #030712; 
            color: #f3f4f6; 
            font-family: 'Plus Jakarta Sans', sans-serif;
            background-image: radial-gradient(circle at top right, #1e1b4b, transparent), radial-gradient(circle at bottom left, #020617, transparent);
        }
        .glass-card { 
            background: rgba(17, 24, 39, 0.7); 
            backdrop-filter: blur(12px); 
            border: 1px solid rgba(255, 255, 255, 0.1); 
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover { 
            border-color: #38bdf8; 
            transform: translateY(-8px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(56, 189, 248, 0.2);
        }
        .gradient-text { 
            background: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%); 
            -webkit-background-clip: text; 
            -webkit-text-fill-color: transparent; 
        }
        .nav-blur { background: rgba(3, 7, 18, 0.8); backdrop-filter: blur(10px); }
    </style>
</head>
<body class="min-h-screen">

    <nav class="nav-blur sticky top-0 z-50 border-b border-white/10 px-6 py-4 flex justify-between items-center">
        <div class="flex items-center gap-2">
            <div class="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center font-bold text-gray-900">S</div>
            <span class="text-xl font-extrabold tracking-tight">SHANTO <span class="text-sky-500">API</span></span>
        </div>
        <img src="https://i.ibb.co/mF7m8jB/shanto-profile.png" class="w-10 h-10 rounded-full border-2 border-sky-500 shadow-lg shadow-sky-500/20" alt="Profile">
    </nav>

    <main class="max-w-6xl mx-auto p-6 md:p-12">
        <header class="text-center mb-16">
            <h1 class="text-5xl md:text-7xl font-black mb-6 tracking-tighter italic">
                <span class="gradient-text uppercase">API Collection</span>
            </h1>
            <p class="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Powerful, fast, and reliable APIs for your next project. Built with performance and developer experience in mind.
            </p>
        </header>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            <div class="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-20"><i class="fas fa-box text-3xl text-sky-400"></i></div>
                <p class="text-gray-400 font-semibold mb-2">Total APIs</p>
                <h3 class="text-5xl font-extrabold text-white">53</h3>
            </div>
            <div class="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-20"><i class="fas fa-layer-group text-3xl text-indigo-400"></i></div>
                <p class="text-gray-400 font-semibold mb-2">Categories</p>
                <h3 class="text-5xl font-extrabold text-white">14</h3>
            </div>
            <div class="glass-card p-8 rounded-3xl relative overflow-hidden border-b-4 border-b-sky-500">
                <div class="absolute top-0 right-0 p-4 opacity-20"><i class="fas fa-arrow-down text-3xl text-sky-400"></i></div>
                <p class="text-gray-400 font-semibold mb-2">GET Endpoints</p>
                <h3 class="text-5xl font-extrabold text-white uppercase">53</h3>
            </div>
            <div class="glass-card p-8 rounded-3xl relative overflow-hidden">
                <div class="absolute top-0 right-0 p-4 opacity-20"><i class="fas fa-arrow-up text-3xl text-orange-400"></i></div>
                <p class="text-gray-400 font-semibold mb-2">POST Endpoints</p>
                <h3 class="text-5xl font-extrabold text-white">0</h3>
            </div>
        </div>

        <div class="space-y-12">
            <div class="flex justify-between items-end border-b border-white/10 pb-4">
                <h2 class="text-3xl font-extrabold tracking-tight">Browse by Category</h2>
                <span class="text-gray-500 font-medium">53 APIs available</span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="glass-card p-8 rounded-[40px] relative">
                    <div class="flex items-center gap-5 mb-6">
                        <div class="w-14 h-14 bg-sky-500/10 rounded-2xl flex items-center justify-center">
                            <i class="fas fa-folder-open text-2xl text-sky-400"></i>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold">Ai</h4>
                            <p class="text-gray-500 text-sm">Artificial Intelligence Endpoints</p>
                        </div>
                        <span class="ml-auto text-4xl font-bold text-white/10">3</span>
                    </div>
                    
                    <div class="space-y-4">
                        <div class="flex justify-between items-center py-2 border-b border-white/5 group">
                            <span class="text-gray-300 font-medium group-hover:text-sky-400 transition">Baby AI (Messenger)</span>
                            <a href="/baby?text=hi" class="px-4 py-1 bg-sky-500/10 text-sky-400 rounded-lg text-xs font-black hover:bg-sky-500 hover:text-white transition">GET</a>
                        </div>
                        <div class="flex justify-between items-center py-2 border-b border-white/5 opacity-40">
                            <span class="text-gray-300 font-medium">Deepseek AI</span>
                            <span class="px-4 py-1 bg-gray-800 text-gray-500 rounded-lg text-xs font-black">LOCK</span>
                        </div>
                    </div>
                </div>

                <div class="glass-card p-8 rounded-[40px] relative">
                    <div class="flex items-center gap-5 mb-6">
                        <div class="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center">
                            <i class="fas fa-download text-2xl text-pink-400"></i>
                        </div>
                        <div>
                            <h4 class="text-2xl font-bold text-white">Downloader</h4>
                            <p class="text-gray-500 text-sm">Social Media Downloaders</p>
                        </div>
                        <span class="ml-auto text-4xl font-bold text-white/10">7</span>
                    </div>
                    
                    <div class="space-y-4 opacity-50">
                        <div class="flex justify-between items-center py-2 border-b border-white/5">
                            <span class="text-gray-300 font-medium italic">Facebook Video DL</span>
                            <span class="px-4 py-1 bg-gray-800 text-gray-500 rounded-lg text-xs font-black">COMING</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="mt-20 py-10 border-t border-white/10 text-center text-gray-600 font-medium">
        <p>&copy; 2026 Developed by <span class="text-sky-500">SHANTO</span>. All rights reserved.</p>
    </footer>

</body>
</html>
`;

// ২. মেইন রুট (ড্যাশবোর্ড)
app.get('/', (req, res) => {
    res.send(dashboardHTML);
});

// ৩. বেবি এপিআই লজিক (তোমার বটের জন্য)
app.get('/baby', async (req, res) => {
    const text = req.query.text;
    if (!text) return res.json({ error: "Please provide 'text' parameter (e.g. /baby?text=hi)" });

    try {
        const response = await axios.get(`https://api.simsimi.vn/v1/simtalk?text=${encodeURIComponent(text)}&lc=bn`);
        res.json({
            reply: response.data.message,
            author: "Shanto",
            status: "success"
        });
    } catch (err) {
        res.json({ error: "API connection error. Try again later." });
    }
});

module.exports = app;
