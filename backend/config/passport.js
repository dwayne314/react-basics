const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('../api/models/users');
const validatePassword = require('../api/validators/auth').validatePassword;


module.exports = passport => {
	passport.use('local', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
	},
	(username, password, done) => {
		Users.findOne({ username: username }, (err, user) => {
			if (err) return done(err)
			if (!user) return done(null, false)

			const isValid = validatePassword(password, user.password)//validatePassword(password, user.password);

			if (isValid) return done(null, user)
			else return done(null, false);
		})
	}));

	passport.serializeUser(function(user, done) {
	    done(null, user.id);
	});


	passport.deserializeUser(function(id, done) {
	    Users.findById(id, function (err, user) {
	        if (err) { return done(err); }
	        done(null, user);
	    });
	});
};
