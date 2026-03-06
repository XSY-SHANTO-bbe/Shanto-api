const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- ১. মঙ্গোডিবি কানেকশন (Shanto Baby Unlimited Node) ---
const uri = "mongodb+srv://Shantobaby:Shanto123@cluster0.jnmpzmf.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

async function runCore() {
  try {
    await client.connect();
    console.log("🌌 SHANTO CORE CONNECTED TO UNLIMITED DATABASE");
  } catch (err) {
    console.error("❌ DATABASE OFFLINE:", err);
  }
}
runCore();

// --- ২. আনলিমিটেড এপিআই আর্কিটেকচার (৫০+ স্যাম্পল এন্ডপয়েন্ট লজিক) ---
app.get('/api/baby', (req, res) => res.json({ status: "Success", owner: "Shanto", rank: "Founder" }));
app.get('/api/edit', (req, res) => res.json({ mode: "Admin", access: "Granted", tools: "Full" }));
app.get('/api/songs/palpal', (req, res) => res.json({ title: "Pal Pal Dil Ke Paas", artist: "Arijit Singh", quality: "320kbps" }));
app.get('/api/download/server1', (req, res) => res.json({ speed: "1GBPS", status: "Active" }));
app.get('/api/system/health', (req, res) => res.json({ cpu: "2%", ram: "124mb", load: "minimal" }));
app.get('/api/v2/security/firewall', (req, res) => res.json({ layer: 7, protection: "DDoS Deflected" }));
app.get('/api/v2/cloud/sync', (req, res) => res.json({ last_sync: new Date(), backup: "Automatic" }));
// ... এভাবেই তুমি হাজার হাজার এপিআই যোগ করতে পারবে

// --- ৩. নেক্সট লেভেল ইনভ্যালিড-প্রুফ ড্যাশবোর্ড (Ultra Update) ---
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SHANTO VIRTUAL CLOUD - UNLIMITED EDITION</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;900&family=Quicksand:wght@300;600&display=swap');
            
            body { background: #020205; color: #fff; font-family: 'Quicksand', sans-serif; overflow-x: hidden; }
            .cyber-text { font-family: 'Orbitron', sans-serif; background: linear-gradient(to right, #00f2ff, #7000ff); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }

            /* Infinite Background Animation */
            .bg-glow {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
                background: radial-gradient(circle at 50% 50%, #1a1a2e 0%, #020205 100%);
            }
            .orbit {
                position: absolute; border: 1px solid rgba(255,255,255,0.05); border-radius: 50%;
                animation: rotate 20s linear infinite;
            }

            @keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

            .glass-master {
                background: rgba(10, 10, 20, 0.4);
                backdrop-filter: blur(40px);
                border: 1px solid rgba(255, 255, 255, 0.08);
                border-radius: 60px;
                box-shadow: 0 0 100px rgba(0, 242, 255, 0.05);
            }

            .main-image {
                filter: drop-shadow(0 0 20px rgba(0, 242, 255, 0.4));
                animation: float 4s ease-in-out infinite;
            }

            @keyframes float { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-20px) rotate(2deg); } }

            .neon-btn {
                background: linear-gradient(90deg, #00f2ff, #FF0000);
                box-shadow: 0 0 20px rgba(0, 242, 255, 0.4);
                transition: 0.5s;
            }
            .neon-btn:hover { letter-spacing: 5px; box-shadow: 0 0 40px rgba(0, 242, 255, 0.7); }

            /* Music Player UI */
            .player-box { background: rgba(0,0,0,0.8); border-radius: 30px; border: 1px solid #333; }
        </style>
    </head>
    <body>
        <div class="bg-glow"></div>
        <div class="orbit w-[800px] h-[800px] -top-40 -left-40"></div>

        <div class="min-h-screen flex items-center justify-center p-6">
            <div class="glass-master w-full max-w-7xl p-10 md:p-20 relative grid md:grid-cols-2 gap-16 items-center">
                
                <div class="text-center md:text-left">
                    <img src="https://i.ibb.co/kgJnsgFJ/saimx69x-a106d0.jpg" class="main-image w-64 h-64 md:w-80 md:h-80 rounded-[4rem] object-cover mb-10 mx-auto md:mx-0">
                    <h1 class="cyber-text text-5xl md:text-7xl font-black mb-4">SHANTO<br>BABY</h1>
                    <p class="text-gray-400 text-sm tracking-[15px] uppercase font-bold mb-10">Global Architect</p>
                    
                    <div class="player-box p-6 max-w-sm">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center animate-pulse">
                                <i class="fas fa-play text-white"></i>
                            </div>
                            <div>
                                <p class="text-[10px] text-blue-400 uppercase font-bold tracking-widest">Streaming Now</p>
                                <p class="text-sm font-semibold">Pal Pal Pal Pal x Jhol - (Slowed + Reverb) |</p>
                            </div>
                        </div>
                        <audio id="audio" controls class="w-full h-10 opacity-70">
                            <source src="https://youtu.be/mMfqDP7ZELI?si=huv9XdCtiyoGsf31" type="audio/mpeg">
                        </audio>
                    </div>
                </div>

                <div class="space-y-8">
                    <div class="grid grid-cols-2 gap-6">
                        <div class="bg-white/5 p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition">
                            <i class="fas fa-microchip text-blue-400 text-3xl mb-4"></i>
                            <h3 class="text-lg font-bold">CORE-OS</h3>
                            <p class="text-xs text-gray-500 uppercase tracking-tighter">Status: Optimal</p>
                        </div>
                        <div class="bg-white/5 p-6 rounded-[2rem] border border-white/10 hover:bg-white/10 transition">
                            <i class="fas fa-satellite-dish text-purple-400 text-3xl mb-4"></i>
                            <h3 class="text-lg font-bold">API NODES</h3>
                            <p class="text-xs text-gray-500 uppercase tracking-tighter">Unlimited Active</p>
                        </div>
                    </div>

                    <div class="bg-black/40 p-8 rounded-[3rem] border border-white/5">
                        <h2 class="text-xl font-bold mb-6 flex items-center gap-2">
                            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                            DEVELOPER DEV SHANTO 
                        </h2>
                        <ul class="space-y-4 font-mono text-xs text-gray-400">
                            <li class="flex justify-between border-b border-white/5 pb-2"><span>> MONGODB_LINK:</span> <span class="text-blue-400 uppercase">Secure</span></li>
                            <li class="flex justify-between border-b border-white/5 pb-2"><span>> SSL_ENCRYPTION:</span> <span class="text-purple-400 uppercase">Active</span></li>
                            <li class="flex justify-between border-b border-white/5 pb-2"><span>> ADMIN_TOKEN:</span> <span class="text-yellow-400 italic">SHANTO_X69</span></li>
                            <li class="flex justify-between border-b border-white/5 pb-2"><span>> CLOUD_SERVER:</span> <span class="text-green-400 uppercase">Online</span></li>
                        </ul>
                    </div>

                    <div class="grid grid-cols-1 gap-4">
                        <button onclick="window.location.href='/api/baby'" class="neon-btn py-5 rounded-[2.5rem] font-black uppercase text-sm tracking-widest">
                            Access Global API Mainframe
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <script>
            console.log("SHANTO SYSTEM INITIALIZED... READY FOR DEPLOYMENT.");
        </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('🚀 UNLIMITED SYSTEM DEPLOYED AT PORT ' + PORT));
