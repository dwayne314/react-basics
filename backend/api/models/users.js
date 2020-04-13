const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const customHooks = require('./hooks');

const UserSchema = new mongoose.Schema({
	first_name: {
		type: String,
		trim: true,
		required: true,
	},
	last_name: {
		type: String,
		trim: true,
		required: true,
	},
	username: {
		type: String,
		trim: true,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		trim: true,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}

});

UserSchema.pre('update', customHooks.setUpdatedAt);
UserSchema.pre('save', customHooks.hashPassword);

module.exports = mongoose.model('Users', UserSchema);
