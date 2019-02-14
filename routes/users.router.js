let controllers = require('../controllers/controllers');
let Guard = require('node-auth-guard');

let router = require('express').Router();

router.post('/login', Guard.rules.isNotAuthenticated, controllers.user.login);
router.post('/register', Guard.rules.isNotAuthenticated, controllers.user.register);
router.get('/logout', Guard.rules.isAuthenticated, controllers.user.logout);
router.get('/principal', controllers.user.principal);

router.get('/principal/pages/:id', Guard.rules.isAuthenticated, controllers.user.getPrincipalPageById);
router.get('/principal/pages', Guard.rules.isAuthenticated, controllers.user.getPrincipalPages);
router.post('/principal/pages', Guard.rules.isAuthenticated, controllers.user.createPage);
router.put('/principal/pages/:id', Guard.rules.isAuthenticated, controllers.user.updatePage);
router.delete('/principal/pages/:id', Guard.rules.isAuthenticated, controllers.user.deletePage);

router.get('/principal/pages/:id/blocks/:blockId', Guard.rules.isAuthenticated, controllers.user.getPageBlockById);
router.get('/principal/pages/:id/blocks', Guard.rules.isAuthenticated, controllers.user.getPageBlocks);
router.post('/principal/pages/:id/blocks', Guard.rules.isAuthenticated, controllers.user.createBlock);
router.put('/principal/pages/:id/blocks/:blockId', Guard.rules.isAuthenticated, controllers.user.updateBlock);
router.delete('/principal/pages/:id/blocks/:blockId', Guard.rules.isAuthenticated, controllers.user.deleteBlock);


module.exports = router;
