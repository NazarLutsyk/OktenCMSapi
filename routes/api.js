let UsersRouter = require('./users.router');

let router = require('express').Router();

router.use('/users', UsersRouter);

module.exports = router;
