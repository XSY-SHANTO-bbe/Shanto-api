const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ১. মঙ্গোডিবি কানেকশন (তোমার পাসওয়ার্ড সহ)
const uri = "mongodb+srv://Shantobaby:Shanto123@cluster0.jnmpzmf.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true }
});

let db;
async function connectDB() {
  try {
    await client.connect();
    db = client.db("shanto_database"); // তোমার ডাটাবেস নাম
    console.log("✅ MongoDB Connected!");
  } catch (err) {
    console.error("❌ MongoDB Error:", err);
  }
}
connectDB();

// ২. BABY API (GET)
app.get('/api/baby', (req, res) => {
  res.json({ status: "Active", message: "Hello Shanto Baby!", owner: "Shanto" });
});

// ৩. SONG API (GET - Sample)
app.get('/api/songs', async (req, res) => {
  // এখানে তুমি মঙ্গোডিবি থেকে গান রিড করতে পারো
  res.json({ status: "Active", songs: ["Song 1", "Song 2"], message: "Song API is ready" });
});

// ৪. EDIT API (POST/PUT - ডেটা এডিট করার জন্য)
app.post('/api/edit', async (req, res) => {
  const data = req.body;
  // এখানে ডাটাবেসে এডিট করার লজিক থাকবে
  res.json({ message: "Data updated successfully!", received: data });
});

// ৫. প্রিমিয়াম ড্যাশবোর্ড (HTML + CSS + Animation)
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Shanto's Virtual Cloud</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
            .loader { position: fixed; inset: 0; background: #020617; display: flex; justify-content: center; align-items: center; z-index: 99; transition: 0.8s; }
            .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
            @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
            .profile-img { animation: float 4s ease-in-out infinite; border: 4px solid #3b82f6; }
        </style>
    </head>
    <body class="bg-[#020617] text-slate-200">

        <div id="loader" class="loader">
            <div class="text-center">
                <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p class="animate-pulse font-mono text-blue-400">LOADING SHANTO'S SYSTEM...</p>
            </div>
        </div>

        <div class="min-h-screen flex items-center justify-center p-6">
            <div class="glass max-w-md w-full rounded-[2.5rem] p-10 text-center shadow-2xl">
                
                <div class="relative inline-block mb-6">
                    <img src="https://i.ibb.co/LzY7sY0/profile.jpg" class="profile-img w-32 h-32 rounded-full object-cover shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                </div>

                <h1 class="text-3xl font-black text-white tracking-tight">SHANTO BABY</h1>
                <p class="text-blue-400 font-medium mb-8">Full Stack Developer</p>

                <div class="grid grid-cols-2 gap-4 mb-8">
                    <div class="bg-white/5 p-4 rounded-3xl">
                        <p class="text-xs text-slate-400">FILES ADDED</p>
                        <p class="text-xl font-bold">15 Active</p>
                    </div>
                    <div class="bg-white/5 p-4 rounded-3xl">
                        <p class="text-xs text-green-400">DATABASE</p>
                        <p class="text-xl font-bold">Connected</p>
                    </div>
                </div>

                <div class="space-y-3 text-sm font-mono">
                    <div class="bg-black/40 p-3 rounded-xl border border-white/5">GET /api/baby</div>
                    <div class="bg-black/40 p-3 rounded-xl border border-white/5">GET /api/songs</div>
                </div>

                <button onclick="location.reload()" class="mt-8 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition shadow-lg shadow-blue-900/40">
                    REFRESH SYSTEM
                </button>
            </div>
        </div>

        <script>
            window.onload = () => {
                setTimeout(() => {
                    const l = document.getElementById('loader');
                    l.style.opacity = '0';
                    setTimeout(() => l.remove(), 800);
                }, 2000);
            };
        </script>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running on port ' + PORT));
