const router = require('express').Router(); 
const UserController = require('../controllers/UserController');

// registrar 
router.post('/register', UserController.register); 
router.post('/login', UserController.login);
router.get('/checkuser', UserController.checkUser)

module.exports = router
