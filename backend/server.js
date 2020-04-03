const express = require('express');
const app = express();
const apiPort = 3001;



// API Routes
const authRoutes = require('./api/routes/auth');
const gameRoutes = require('./api/routes/games');
app.use('/api/', authRoutes);
app.use('/api/games', gameRoutes);


// Start App
app.listen(3001, () => console.log(`app listening on port ${apiPort}`));
