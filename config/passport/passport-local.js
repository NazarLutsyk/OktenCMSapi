let LocalStrategy = require('passport-local');
let User = require('../../models/User').model;

exports.LocalSignIn = new LocalStrategy({
    usernameField: 'login',
    passwordField: 'password',
}, async function (login, password, done) {
    try {
        let user = await User.findOne({
            login: login,
            password: password
        });
        if (user) {
            done(null, user);
        } else {
            return done(null, false);
        }
    } catch (e) {
        return done(e);
    }
});


exports.LocalSignUp = new LocalStrategy(
    {
        usernameField: 'login',
        passwordField: 'password',
        passReqToCallback: true
    },
    async function (req, login, password, done) {
        try {
            let alreadyExists = await User.count({login});
            if (alreadyExists) {
                return done(null, false);
            } else {
                let user = await User.create({login, password});
                return done(null, user);
            }
        } catch (e) {
            return done(e);
        }
    }
);
