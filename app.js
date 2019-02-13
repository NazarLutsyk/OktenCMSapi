let express = require('express');
let path = require('path');
let logger = require('morgan');
let session = require('express-session');
let ControllerError = require('./errors/ControllerError');
let mongoose = require('mongoose');
let Guard = require('node-auth-guard');

require('./config/passport/passport');
let passport = require('passport');

let ApiRouter = require('./routes/api');

mongoose.connect('mongodb://localhost:27017/oktencmsdb', {useNewUrlParser: true});

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'adas5SDasd5SD5sd5Sd8Sd85',
    saveUninitialized: false,
    resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(Guard.initialize({}));

app.get('/', (req, res, next) => {
    res.end('Hello mutherfucker!');
});
app.use('/api', ApiRouter);


app.use(function (req, res, next) {
    return next(new ControllerError('Not found', 404));
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send({message: err.msg, name: err.name});
});


module.exports = app;
