const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// তোমার MongoDB কানেকশন স্ট্রিং
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
    console.log("MongoDB Connected Successfully!");
  } finally {
    // প্রয়োজন ছাড়া কানেকশন ক্লোজ করবেন না
  }
}
run().catch(console.dir);

// Baby API Endpoint
app.get('/api/baby', (req, res) => {
  res.json({
    status: "Active",
    message: "Shanto Baby API is running",
    owner: "Shanto",
    files_count: 5 // তোমার ফাইলের সংখ্যা এখানে লিখতে পারো
  });
});

// ড্যাশবোর্ড সার্ভ করা
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

module.exports = app;
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shanto Baby Dashboard</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .loader-wrapper {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #0f172a; display: flex; justify-content: center;
            align-items: center; z-index: 9999; transition: opacity 1s ease;
        }
        .glass { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
        .profile-img { animation: float 4s ease-in-out infinite; }
    </style>
</head>
<body class="bg-slate-900 text-white font-sans">

    <div id="loader" class="loader-wrapper">
        <div class="text-3xl font-bold animate-pulse text-blue-400">Loading Shanto's World...</div>
    </div>

    <div class="min-h-screen flex flex-col items-center justify-center p-6">
        <div class="glass p-8 rounded-3xl border border-white/20 shadow-2xl max-w-md w-full text-center">
            <img src="https://via.placeholder.com/150" alt="Profile" class="profile-img w-32 h-32 rounded-full mx-auto border-4 border-blue-500 shadow-lg mb-4">
            
            <h1 class="text-3xl font-bold mb-2">Shanto Baby</h1>
            <p class="text-blue-300 mb-6">Full Stack Developer & API Master</p>

            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-white/5 p-4 rounded-xl">
                    <span class="block text-2xl font-bold">12</span>
                    <span class="text-xs uppercase text-gray-400">Total Files</span>
                </div>
                <div class="bg-white/5 p-4 rounded-xl">
                    <span class="block text-2xl font-bold text-green-400">Online</span>
                    <span class="text-xs uppercase text-gray-400">Database</span>
                </div>
            </div>

            <button onclick="alert('API Connection Active!')" class="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-xl font-semibold transition">
                Check API Status
            </button>
        </div>
    </div>

    <script>
        window.onload = () => {
            setTimeout(() => {
                document.getElementById('loader').style.opacity = '0';
                setTimeout(() => document.getElementById('loader').remove(), 1000);
            }, 2000);
        };
    </script>
</body>
</html>
