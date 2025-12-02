const express = require('express');
const path = require('path');
const app = express();

// ---------------------------------------------------------
// KEY LINE 1: This allows the server to "see" your style.css and JS files
app.use(express.static(path.join(__dirname, '/')));
// ---------------------------------------------------------

// Your other API routes (like News aggregation) go here...
// app.get('/api/news', ...)

// ---------------------------------------------------------
// KEY LINE 2: When someone goes to the homepage, send them index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
// ---------------------------------------------------------

// KEY LINE 3: Vercel assigns a port automatically, so use process.env.PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});