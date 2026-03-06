const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ১. তোমার MongoDB কানেকশন কোড (পাসওয়ার্ড সহ)
const uri = "mongodb+srv://Shantobaby:Shanto123@cluster0.jnmpzmf.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
  }
}
run();

// ২. Baby API Endpoint (এডিট বা ডেটা দেখার জন্য)
app.get('/api/baby', (req, res) => {
  res.json({
    status: "Active",
    message: "Shanto Baby API is working fine!",
    owner: "Shanto",
    database: "Connected",
    version: "1.0.0"
  });
});

// ৩. HTML ড্যাশবোর্ড (সব কোড এখানে ঢুকিয়ে দিয়েছি)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shanto's Virtual Dashboard</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .loader-wrapper {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: #0b0f19; display: flex; justify-content: center;
                align-items: center; z-index: 9999; transition: opacity 1s ease;
            }
            .glass { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(15px); border: 1px solid rgba(255,255,255,0.1); }
            @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
            .profile-anim { animation: float 3s ease-in-out infinite; }
        </style>
    </head>
    <body class="bg-[#0b0f19] text-white overflow-hidden">

        <div id="loader" class="loader-wrapper">
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p class="mt-4 text-blue-400 font-mono tracking-widest">INITIALIZING...</p>
            </div>
        </div>

        <div class="min-h-screen flex flex-col items-center justify-center p-4">
            <div class="glass p-10 rounded-[40px] shadow-2xl max-w-sm w-full text-center relative overflow-hidden">
                <div class="relative inline-block mb-6">
                    <img src="https://i.ibb.co/LzY7sY0/profile.jpg" alt="Shanto" 
                         class="profile-anim w-32 h-32 rounded-full border-4 border-blue-600 object-cover shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                </div>

                <h1 class="text-3xl font-black bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">SHANTO BABY</h1>
                <p class="text-gray-400 text-sm mt-1 mb-8">System Administrator & Developer</p>

                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="bg-white/5 p-4 rounded-2xl">
                        <span class="text-xs text-blue-400 uppercase font-bold">Files</span>
                        <div class="text-xl font-bold">08 Active</div>
                    </div>
                    <div class="bg-white/5 p-4 rounded-2xl">
                        <span class="text-xs text-green-400 uppercase font-bold">Server</span>
                        <div class="text-xl font-bold">Online</div>
                    </div>
                </div>

                <div class="text-left bg-black/30 p-4 rounded-xl mb-6 font-mono text-xs text-blue-300">
                    <div>> Status: Database Connected</div>
                    <div>> API: /api/baby [GET]</div>
                </div>

                <button class="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl font-bold transition-all transform active:scale-95 shadow-lg shadow-blue-900/20">
                    REFRESH DASHBOARD
                </button>
            </div>
        </div>

        <script>
            window.onload = () => {
                setTimeout(() => {
                    const loader = document.getElementById('loader');
                    loader.style.opacity = '0';
                    setTimeout(() => loader.remove(), 1000);
                }, 2500);
            };
        </script>
    </body>
    </html>
  `);
});

// সার্ভার স্টার্ট
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🚀 Server is running on port " + PORT);
});
