const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- ১. মঙ্গোডিবি কানেকশন ---
const uri = "mongodb+srv://Shantobaby:Shanto123@cluster0.jnmpzmf.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function shantoDB() {
  try {
    await client.connect();
    console.log("💎 SHANTO CORE DB: CONNECTED");
  } catch (err) {
    console.error("❌ DB ERROR:", err);
  }
}
shantoDB();

// --- ২. আনলিমিটেড এপিআই ডিরেক্টরি (১০+ এন্ডপয়েন্ট) ---
app.get('/api/baby', (req, res) => res.json({ name: "Shanto Baby", status: "God Level", power: "Infinite" }));
app.get('/api/edit', (req, res) => res.json({ access: "Admin", tools: "Unlocked" }));
app.get('/api/songs', (req, res) => res.json({ current: "Pal Pal x Jhol", artist: "Talwiinder x Maanu" }));
app.get('/api/download', (req, res) => res.json({ server: "Ultra-Fast", location: "Global" }));
app.get('/api/security', (req, res) => res.json({ firewall: "AES-512", protection: "Active" }));
app.get('/api/cloud', (req, res) => res.json({ storage: "Unlimited", sync: "Enabled" }));

// --- ৩. হেভি এইচটিএমএল ও সিএসএস ড্যাশবোর্ড (Ultra Update) ---
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SHANTO ULTIMATE VIRTUAL CLOUD</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&family=Rajdhani:wght@300;700&display=swap');
            
            :root { --neon: #00f2ff; --glow: #7000ff; }
            body { background: #000; color: #fff; font-family: 'Rajdhani', sans-serif; overflow: hidden; }

            /* Heavy CSS Animations */
            .scanline {
                width: 100%; height: 2px; background: rgba(0, 242, 255, 0.1);
                position: fixed; top: 0; z-index: 10; animation: scan 4s linear infinite;
            }
            @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }

            .glass-container {
                background: rgba(255, 255, 255, 0.01);
                backdrop-filter: blur(30px);
                border: 2px solid rgba(255, 255, 255, 0.05);
                border-radius: 60px;
                box-shadow: 0 0 100px rgba(0, 242, 255, 0.1);
            }

            .shanto-image {
                border-radius: 40px; border: 4px solid var(--neon);
                box-shadow: 0 0 30px var(--neon);
                animation: float 4s ease-in-out infinite;
            }
            @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-20px) scale(1.02); } }

            .neon-text { font-family: 'Orbitron', sans-serif; text-shadow: 0 0 15px var(--neon); color: var(--neon); }
            
            .api-card {
                background: rgba(0, 0, 0, 0.6); border: 1px solid rgba(255,255,255,0.05);
                transition: 0.4s; border-radius: 30px;
            }
            .api-card:hover { border-color: var(--neon); box-shadow: 0 0 20px rgba(0, 242, 255, 0.3); transform: translateY(-10px); }

            /* Professional Music Player */
            .music-player {
                background: linear-gradient(90deg, #0f0f1b, #1a1a2e);
                border-left: 5px solid var(--neon); border-radius: 25px;
            }

            /* Custom Matrix Rain Background */
            #matrix { position: fixed; top: 0; left: 0; z-index: -1; opacity: 0.2; }
        </style>
    </head>
    <body>
        <div class="scanline"></div>
        <canvas id="matrix"></canvas>

        <div class="min-h-screen flex items-center justify-center p-6">
            <div class="glass-container w-full max-w-7xl p-10 md:p-20 relative overflow-hidden grid md:grid-cols-2 gap-16">
                
                <div class="text-center md:text-left">
                    <img src="https://i.ibb.co/kgJnsgFJ/saimx69x-a106d0.jpg" class="shanto-image w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 object-cover mb-8">
                    <h1 class="neon-text text-5xl md:text-7xl font-black mb-4 tracking-tighter uppercase">SHANTO BABY</h1>
                    <p class="text-gray-500 font-bold uppercase tracking-[15px] text-xs mb-10">Cyber Overlord v4.0</p>
                    
                    <div class="music-player p-6 max-w-sm">
                        <div class="flex items-center gap-4 mb-4">
                            <i class="fas fa-compact-disc animate-spin text-3xl text-blue-400"></i>
                            <div>
                                <p class="text-[10px] text-blue-300 uppercase font-bold">Now Streaming</p>
                                <p class="text-sm font-bold">Pal Pal x Jhol (Slowed + Reverb)</p>
                            </div>
                        </div>
                        <audio controls class="w-full h-10 opacity-80">
                            <source src="https://files.catbox.moe/p4b6x4.mp3" type="audio/mpeg">
                        </audio>
                    </div>
                </div>

                <div class="flex flex-col justify-center space-y-8">
                    <div class="grid grid-cols-2 gap-6">
                        <div class="api-card p-6 flex flex-col items-center">
                            <i class="fas fa-server text-blue-400 text-3xl mb-3"></i>
                            <h3 class="font-bold text-lg">SYSTEM</h3>
                            <p class="text-[10px] text-green-400">ACTIVE 100%</p>
                        </div>
                        <div class="api-card p-6 flex flex-col items-center">
                            <i class="fas fa-database text-purple-400 text-3xl mb-3"></i>
                            <h3 class="font-bold text-lg">DATABASE</h3>
                            <p class="text-[10px] text-blue-400">MONGO-LINKED</p>
                        </div>
                    </div>

                    <div class="bg-black/60 p-8 rounded-[40px] border border-white/5 font-mono text-xs text-blue-200">
                        <p class="mb-2 text-blue-500">// GLOBAL SYSTEM LOGS</p>
                        <p>> Initializing Baby API... OK</p>
                        <p>> Encrypting Cloud Nodes... OK</p>
                        <p>> Connecting MongoDB Cluster... OK</p>
                        <p>> Firewall Security Level 7... OK</p>
                        <p>> Pal Pal x Jhol Audio Stream... ACTIVE</p>
                    </div>

                    <button onclick="window.location.href='/api/baby'" class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-black py-6 rounded-[30px] uppercase tracking-widest text-sm shadow-2xl transition-all transform hover:scale-105">
                        Launch Global API Mainframe
                    </button>
                </div>
            </div>
        </div>

        <script>
            // Matrix Rain Effect for 1000+ line vibe
            const canvas = document.getElementById('matrix');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const letters = '01SHANTOBABY';
            const fontSize = 16;
            const columns = canvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);

            function drawMatrix() {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#00f2ff';
                ctx.font = fontSize + 'px monospace';
                drops.forEach((y, i) => {
                    const text = letters[Math.floor(Math.random() * letters.length)];
                    ctx.fillText(text, i * fontSize, y * fontSize);
                    if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                    drops[i]++;
                });
            }
            setInterval(drawMatrix, 33);
        </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('🔥 SHANTO MEGA SYSTEM LIVE ON PORT ' + PORT));
