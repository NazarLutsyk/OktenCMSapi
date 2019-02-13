let passport = require('passport');
let {LocalSignIn, LocalSignUp} = require('./passport-local');
let User = require('../../models/User').model;

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
passport.deserializeUser(async function (id, done) {
    try {
        let user = await User.findById(id);
        return done(null, user);
    } catch (e) {
        return done(e);
    }
});

passport.use('local.signin', LocalSignIn);
passport.use('local.signup', LocalSignUp);
