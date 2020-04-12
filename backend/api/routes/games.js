const express = require('express');
const gameController = require('../controllers/games');
const gameRouter = express.Router();


gameRouter.post('/', gameController.save);
gameRouter.post('/delete', gameController.delete);
gameRouter.get('/', gameController.get);

module.exports = gameRouter;
