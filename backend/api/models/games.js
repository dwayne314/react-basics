const mongoose = reuqire('mongoose');
const customHooks = require('./hooks');


const GameSchema = new mongoose.Schema({
	win: {
		type: Boolean,
		required: true,
	},
	human_first: {
		type: Boolean,
		required: true,
	},
	aiActive: {
		type: Boolean,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	}
});

GameSchema.pre('update', customHooks.setUpdatedAt)

module.exports = mongoose.model('Games', GameSchema);
