const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const GoogleNewsAggregator = require('./googleNewsAggregator');
const News = require('./News');
const ForumPost = require('./ForumPost');

const app = express();
app.use(express.json());

// 1. Connect to MongoDB (Cached connection for Vercel)
let isConnected = false;
const connectToDatabase = async () => {
    if (isConnected) return;
    try {
        await mongoose.connect(process.env.MONGO_URI); // We will set this variable in Vercel later
        isConnected = true;
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
    }
};

// 2. Serve Static Files (Frontend)
app.use(express.static(path.join(__dirname, '/')));

// 3. API Routes
// Get All News
app.get('/api/news', async (req, res) => {
    await connectToDatabase();
    try {
        const news = await News.find().sort({ publishedAt: -1 }).limit(50);
        res.json({ success: true, data: news });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Vercel Cron Job Route (Replaces node-cron)
app.get('/api/cron/update-news', async (req, res) => {
    await connectToDatabase();
    try {
        // Check for Vercel Cron authentication (Optional but recommended)
        const aggregator = new GoogleNewsAggregator();
        console.log('🔄 Triggering News Aggregation via Cron...');
        await aggregator.aggregateAllNews();
        res.json({ success: true, message: 'News aggregation triggered' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// 4. Catch-all route to serve the frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 5. Start Server
// ADD THIS NEW CODE
const PORT = process.env.PORT || 3000;

// Only listen if running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// Export the app for Vercel
module.exports = app;