const express = require('express');
const gameController = require('../controllers/games');
const gameRouter = express.Router();


gameRouter.post('/', gameController.save);
gameRouter.patch('/', gameController.delete);

module.exports = gameRouter;
