const express = require('express');
const app = express();
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const API_PORT = 3001;
require('dotenv').config();
const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/tic-tac';
const SECRET_KEY = process.env.SECRET_KEY || 'lasfkjflkafdlfj;afjal;fjfalfjafjkl;f;lafa;lffhafjaf;alfs';

// App Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Database Config
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('db listening on port 27017'))


// Passport Setup

const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection, collection: 'sessions' })

app.use(session({
	secret: SECRET_KEY,
	resave: false,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 30
	}
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());



// API Routes
const authRoutes = require('./api/routes/auth');
const gameRoutes = require('./api/routes/games');
app.use('/api/', authRoutes);
app.use('/api/games', gameRoutes);


// Start App
app.listen(3001, () => console.log(`app listening on port ${API_PORT}`));
