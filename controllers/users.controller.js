let passport = require('passport');
let ControllerError = require('../errors/ControllerError');
let User = require('../models/User').model;
let ObjectHelper = require('../helpers/object.helper');

let controller = {};

controller.login = async (req, res, next) => {
    passport.authenticate('local.signin', function (err, user, info) {
        if (err) {
            return res.status(400).send(err);
        }
        if (!user) {
            return res.sendStatus(400);
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).json(req.user);
        });
    })(req, res, next);
};

controller.register = async (req, res, next) => {
    passport.authenticate('local.signup', function (err, user, info) {
        if (err) {
            return res.status(400).send(err);
        }
        if (!user) {
            return res.sendStatus(400);
        }
        req.logIn(user, async function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).json(req.user);
        });

    })(req, res, next);
};

controller.principal = async (req, res, next) => {
    try {
        res.json(req.user ? req.user : {});
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.logout = async (req, res, next) => {
    req.logout();
    res.json({ok: true});
};

controller.getPrincipalPageById = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        return res.json(user.pages.id(req.params.id));
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.getPrincipalPages = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        return res.json(user.pages);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.createPage = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        let newPage = user.pages.create(req.body);
        user.pages ? user.pages.push(newPage) : [];
        await user.save();
        return res.json(newPage);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.updatePage = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        let page = user.pages.id(req.params.id);
        ObjectHelper.load(page, req.body);
        await user.save();
        return res.json(page);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.deletePage = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        let page = user.pages.id(req.params.id);
        page.remove();
        await user.save();
        return res.json(page);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.getPageBlockById = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        return res.json(user.pages.id(req.params.id).listBlocks.id(req.params.blockId));
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.getPageBlocks = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        return res.json(user.pages.id(req.params.id).listBlocks);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.createBlock = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        let page = user.pages.id(req.params.id);
        let newBlock = page.listBlocks.create(req.body);
        page ? page.listBlocks.push(newBlock) : [];
        await user.save();
        return res.json(newBlock);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.updateBlock = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        let block = user.pages.id(req.params.id).listBlocks.id(req.params.blockId);
        ObjectHelper.load(block, req.body);
        await user.save();
        return res.json(block);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

controller.deleteBlock = async (req, res, next) => {
    try {
        let user = await User.findById(req.user._id);
        let block = user.pages.id(req.params.id).listBlocks.id(req.params.blockId);
        block.remove();
        await user.save();
        return res.json(block);
    } catch (e) {
        return next(new ControllerError(e.message, 400, 'User Controller'))
    }
};

module.exports = controller;
