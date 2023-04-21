const router = require('express').Router(); 
const UserController = require('../controllers/UserController');

// registrar 
router.post('/register', UserController.register); 

module.exports = router
