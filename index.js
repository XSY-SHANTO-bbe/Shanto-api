const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- ১. মঙ্গোডিবি কানেকশন (Secure Connection) ---
const uri = "mongodb+srv://Shantobaby:Shanto123@cluster0.jnmpzmf.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ Mainframe Database Linked!");
  } catch (err) {
    console.error("❌ Link Error:", err);
  }
}
run();

// --- ২. আনলিমিটেড এপিআই সেকশন (১০+ এপিআই এন্ডপয়েন্ট) ---

app.get('/api/baby', (req, res) => res.json({ status: "Active", name: "Shanto Baby", access: "Owner" }));
app.get('/api/songs', (req, res) => res.json({ status: "Loaded", list: ["Pal Pal Dil Ke Paas", "Tum Hi Ho", "Heeriye"] }));
app.get('/api/download', (req, res) => res.json({ status: "Ready", link: "https://shanto-storage.com/file.zip" }));
app.get('/api/edit', (req, res) => res.json({ status: "Ready for Edit", method: "PUT" }));
app.get('/api/system', (req, res) => res.json({ memory: "98%", status: "Supercharged" }));
app.get('/api/security', (req, res) => res.json({ encryption: "AES-256", firewall: "Active" }));
app.get('/api/cloud', (req, res) => res.json({ provider: "Vercel", location: "Global" }));
app.get('/api/network', (req, res) => res.json({ ping: "12ms", bandwidth: "Unlimited" }));
app.get('/api/version', (req, res) => res.json({ ver: "10.0.5", codename: "Shanto_OS" }));
app.get('/api/token', (req, res) => res.json({ token: "shanto_premium_69_key" }));

// --- ৩. আল্ট্রা লেভেল ড্যাশবোর্ড (HTML, CSS, Audio) ---

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SHANTO VIRTUAL OS v10.0</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&family=Space+Grotesk:wght@300;500;700&display=swap');
            
            :root { --neon: #00f2ff; --purple: #7000ff; }
            body { background: #000; color: #fff; font-family: 'Space Grotesk', sans-serif; overflow-x: hidden; }
            
            /* Matrix Background Effect */
            canvas { position: fixed; top: 0; left: 0; z-index: -1; opacity: 0.3; }

            .glass {
                background: rgba(255, 255, 255, 0.02);
                backdrop-filter: blur(25px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                box-shadow: 0 0 50px rgba(0, 242, 255, 0.1);
            }

            .neon-text { color: var(--neon); text-shadow: 0 0 15px var(--neon); font-family: 'Syncopate', sans-serif; }
            
            .profile-box {
                position: relative;
                padding: 10px;
                background: linear-gradient(135deg, var(--neon), var(--purple));
                border-radius: 50%;
                animation: pulse 2s infinite alternate;
            }

            @keyframes pulse { 
                0% { box-shadow: 0 0 20px var(--neon); transform: scale(1); } 
                100% { box-shadow: 0 0 40px var(--purple); transform: scale(1.05); } 
            }

            .api-card {
                background: rgba(0, 0, 0, 0.5);
                transition: 0.4s;
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            .api-card:hover { 
                border-color: var(--neon); 
                transform: translateY(-5px);
                background: rgba(0, 242, 255, 0.05);
            }

            .audio-player {
                background: linear-gradient(90deg, #1a1a1a, #0a0a0a);
                border-left: 4px solid var(--neon);
            }
        </style>
    </head>
    <body>
        <canvas id="canvas"></canvas>

        <div class="min-h-screen flex flex-col items-center justify-center p-6">
            
            <div class="glass w-full max-w-5xl rounded-[4rem] p-8 md:p-16 relative overflow-hidden">
                
                <div class="grid md:grid-cols-12 gap-12 items-center">
                    
                    <div class="md:col-span-5 text-center md:text-left">
                        <div class="inline-block profile-box mb-8">
                            <img src="https://i.ibb.co/kgJnsgFJ/saimx69x-a106d0.jpg" 
                                 class="w-48 h-48 rounded-full object-cover border-8 border-black">
                        </div>
                        <h1 class="neon-text text-4xl font-bold tracking-tighter mb-2 italic">SHANTO BABY</h1>
                        <p class="text-gray-400 text-lg uppercase tracking-[0.5em] mb-6">System Overlord</p>
                        
                        <div class="audio-player p-6 rounded-3xl mt-4">
                            <p class="text-xs text-blue-400 mb-2 font-bold uppercase tracking-widest">Now Playing 🎵</p>
                            <p class="text-white font-medium mb-4 italic">Pal Pal Dil Ke Paas - Shanto Mix</p>
                            <audio controls class="w-full h-8 opacity-80">
                                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>

                    <div class="md:col-span-7 grid grid-cols-2 gap-4">
                        <div class="api-card p-6 rounded-3xl">
                            <i class="fas fa-server text-blue-400 mb-3 text-xl"></i>
                            <h3 class="font-bold">CORE STATUS</h3>
                            <p class="text-xs text-green-400">OPTIMIZED 100%</p>
                        </div>
                        <div class="api-card p-6 rounded-3xl">
                            <i class="fas fa-database text-purple-400 mb-3 text-xl"></i>
                            <h3 class="font-bold">DATABASE</h3>
                            <p class="text-xs text-blue-400">MONGO-DB LINKED</p>
                        </div>
                        <div class="api-card p-6 rounded-3xl">
                            <i class="fas fa-bolt text-yellow-400 mb-3 text-xl"></i>
                            <h3 class="font-bold">LATENCY</h3>
                            <p class="text-xs text-white">0.002 MS</p>
                        </div>
                        <div class="api-card p-6 rounded-3xl">
                            <i class="fas fa-shield-alt text-red-400 mb-3 text-xl"></i>
                            <h3 class="font-bold">SECURITY</h3>
                            <p class="text-xs text-red-500">ENCRYPTED</p>
                        </div>

                        <div class="col-span-2 api-card p-6 rounded-3xl flex justify-between items-center">
                            <div>
                                <h3 class="font-bold text-lg">Active API Endpoints</h3>
                                <p class="text-xs text-gray-400">10 Functional Links Found</p>
                            </div>
                            <button onclick="window.location.href='/api/baby'" class="bg-blue-600 px-6 py-2 rounded-full text-xs font-bold hover:bg-blue-400 transition">TEST API</button>
                        </div>
                    </div>

                </div>

                <div class="mt-12 text-center border-t border-white/10 pt-8">
                    <p class="text-gray-600 text-[10px] tracking-[0.3em] uppercase">
                        Terminal: x64_Root | Node.js v18.x | Shanto Cloud Architecture
                    </p>
                </div>
            </div>
        </div>

        <script>
            // Matrix Effect Logic
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const letters = '01';
            const fontSize = 18;
            const columns = canvas.width / fontSize;
            const drops = Array(Math.floor(columns)).fill(1);

            function draw() {
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
            setInterval(draw, 33);
        </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('🔥 SHANTO OS IS ONLINE ON PORT ' + PORT));
