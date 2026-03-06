// Edit বা Update করার রাস্তা
app.get('/edit', async (req, res) => {
    try {
        const { ask, newAns } = req.query;
        if (!ask || !newAns) return res.status(400).json({ error: "আগের প্রশ্ন (ask) এবং নতুন উত্তর (newAns) দাও জানু!" });

        // ডাটাবেজে আগের প্রশ্নটি খুঁজে তার উত্তর বদলে দেওয়া
        const updatedData = await ShantoData.findOneAndUpdate(
            { ask: ask.toLowerCase() },
            { ans: newAns },
            { new: true } // এটি আপডেট হওয়া নতুন ডেটা রিটার্ন করবে
        );

        if (updatedData) {
            res.json({ msg: "✅ উত্তর পরিবর্তন করা হয়েছে!", ask: updatedData.ask, newAns: updatedData.ans });
        } else {
            res.status(404).json({ error: "❌ এই প্রশ্নটি ডাটাবেজে খুঁজে পাওয়া যায়নি!" });
        }
    } catch (e) {
        res.status(500).json({ error: "সার্ভারে সমস্যা হয়েছে!" });
    }
});
