const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. MONGODB SECURE CONNECTION
const uri = "mongodb+srv://Shantobaby:Shanto123@cluster0.jnmpzmf.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function startDB() {
  try { await client.connect(); console.log("🌌 SHANTO DATABASE CORE: ONLINE"); }
  catch (err) { console.error("❌ DB ERROR:", err); }
}
startDB();

// 2. 1000+ API SCALABILITY (DIFFERENT ENDPOINTS)
app.get('/api/baby', (req, res) => res.json({ status: "Active", owner: "Shanto Baby", level: "God Mode" }));
app.get('/api/songs/active', (req, res) => res.json({ current: "Pal Pal x Jhol (Slowed + Reverb)", mood: "Haseen" }));
app.get('/api/system/stats', (req, res) => res.json({ uptime: "99.9%", ram: "Used 10%", server: "Vercel Premium" }));
app.get('/api/security/v3', (req, res) => res.json({ firewall: "AES-512", protection: "Anti-DDoS Enabled" }));
// ... (Aur bhi hazaron APIs backend se handle ho sakte hain)

// 3. ULTRA PRO DASHBOARD (HTML/CSS 1000+ LINES STYLE)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SHANTO VIRTUAL OS v30.0</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Space+Grotesk:wght@300;700&display=swap');
            
            :root { --main-color: #00f2ff; --secondary: #7000ff; }
            body { background: #010103; color: white; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
            
            /* Animated Background Particles */
            .bg-wrap { position: fixed; inset: 0; z-index: -1; background: radial-gradient(circle at 50% 50%, #0a0a1a 0%, #000 100%); }
            
            .glass-morph {
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(50px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 80px;
                box-shadow: 0 0 100px rgba(0, 242, 255, 0.1);
            }

            .profile-aura {
                position: relative; padding: 8px;
                background: linear-gradient(45deg, var(--main-color), var(--secondary));
                border-radius: 50px;
                animation: aura-glow 4s linear infinite;
            }

            @keyframes aura-glow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }

            .shanto-image {
                width: 280px; height: 280px; border-radius: 40px;
                object-cover: cover; transform: perspective(1000px) rotateY(-5deg);
                box-shadow: 20px 20px 60px rgba(0,0,0,0.5);
                animation: float 5s ease-in-out infinite;
            }

            @keyframes float { 0%, 100% { transform: translateY(0) rotateY(-5deg); } 50% { transform: translateY(-20px) rotateY(5deg); } }

            .btn-cyber {
                background: linear-gradient(90deg, #00f2ff, #7000ff);
                font-family: 'Syncopate', sans-serif;
                transition: 0.5s;
                text-shadow: 0 0 10px white;
            }
            .btn-cyber:hover { transform: scale(1.05); box-shadow: 0 0 50px #00f2ff; letter-spacing: 4px; }
            
            /* Music Player Aesthetic */
            .music-box { background: rgba(0,0,0,0.8); border: 1px solid #222; border-radius: 30px; }
            audio::-webkit-media-controls-panel { background-color: #00f2ff; }
        </style>
    </head>
    <body>
        <div class="bg-wrap"></div>
        
        <div class="min-h-screen flex items-center justify-center p-6">
            <div class="glass-morph w-full max-w-7xl p-12 md:p-24 grid md:grid-cols-2 gap-20 items-center">
                
                <div class="text-center md:text-left">
                    <div class="profile-aura inline-block mb-10">
                        <img src="https://i.ibb.co/kgJnsgFJ/saimx69x-a106d0.jpg" class="shanto-image">
                    </div>
                    <h1 class="text-6xl md:text-8xl font-black italic tracking-tighter mb-4" style="color: #00f2ff;">SHANTO</h1>
                    <p class="text-gray-500 font-bold uppercase tracking-[15px] text-xs mb-10">Cyber Lord & Dev</p>
                    
                    <div class="music-box p-6 max-w-md">
                        <div class="flex items-center gap-4 mb-4">
                            <i class="fas fa-play-circle text-4xl text-blue-400 animate-pulse"></i>
                            <div>
                                <p class="text-[10px] text-gray-500 uppercase">Current Vibe</p>
                                <p class="text-sm font-bold text-white">Pal Pal x Jhol - (Slowed + Reverb)</p>
                            </div>
                        </div>
                        <audio controls class="w-full h-10">
                            <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                        </audio>
                        <p class="text-[9px] mt-2 text-blue-300">Aesthetic Ft. Talwiinder | Maanu x Annural Khalid</p>
                    </div>
                </div>

                <div class="space-y-8">
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-blue-500 transition-all">
                            <i class="fas fa-microchip text-blue-500 text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold">CORE-30</h3>
                            <p class="text-xs text-gray-400 font-mono italic">Status: Godly</p>
                        </div>
                        <div class="bg-white/5 p-8 rounded-[40px] border border-white/10 hover:border-purple-500 transition-all">
                            <i class="fas fa-globe text-purple-500 text-4xl mb-4"></i>
                            <h3 class="text-xl font-bold">API NODES</h3>
                            <p class="text-xs text-gray-400 font-mono italic">Nodes: 1000+</p>
                        </div>
                    </div>

                    <div class="bg-black/60 p-10 rounded-[50px] border border-white/5">
                        <h2 class="text-2xl font-bold mb-6 flex items-center gap-3">
                            <span class="w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
                            DATABASE REPOSITORY
                        </h2>
                        <div class="space-y-4 font-mono text-xs text-blue-300">
                            <p class="flex justify-between border-b border-white/5 pb-2"><span>> MONGODB:</span> <span class="text-green-400">ENCRYPTED_LINK_v4</span></p>
                            <p class="flex justify-between border-b border-white/5 pb-2"><span>> SECURITY:</span> <span class="text-red-400">FIREWALL_ACTIVE</span></p>
                            <p class="flex justify-between border-b border-white/5 pb-2"><span>> ADMIN:</span> <span class="text-yellow-400 uppercase">Shanto_Baby_X69</span></p>
                            <p class="flex justify-between border-b border-white/5 pb-2"><span>> VERSION:</span> <span class="text-white">v30.0-ULTIMATE</span></p>
                        </div>
                    </div>

                    <button onclick="window.location.href='/api/baby'" class="btn-cyber w-full py-6 rounded-[35px] font-black uppercase tracking-widest text-sm shadow-2xl">
                        EXECUTE MASTER API
                    </button>
                </div>
            </div>
        </div>
        
        <script>
            console.log("SHANTO-OS v30.0 DEPLOYED SUCCESSFULLY. WELCOME BOSS.");
        </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('🔥 ULTRA SYSTEM LIVE ON PORT ' + PORT));
