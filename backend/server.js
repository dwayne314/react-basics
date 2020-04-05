const express = require('express');
const mongoose = require('mongoose');

const app = express();
const API_PORT = 3001;
const DB_URI = 'mongodb://localhost:27017/tic-tac';


// App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database Config
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('db listening on port 27017'))

// API Routes
const authRoutes = require('./api/routes/auth');
const gameRoutes = require('./api/routes/games');
app.use('/api/', authRoutes);
app.use('/api/games', gameRoutes);


// Start App
app.listen(3001, () => console.log(`app listening on port ${API_PORT}`));
