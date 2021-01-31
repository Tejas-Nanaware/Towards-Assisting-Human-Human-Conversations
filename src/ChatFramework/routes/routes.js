var express = require('express');

const indexMethods = require('../controllers/index');
const loginMethods = require('../controllers/login');
const registerMethods = require('../controllers/register');
const profile = require('../controllers/profile');

const router = express.Router();
router.get('/', indexMethods.index);

router.get('/login', loginMethods.load);
router.post('/login', loginMethods.login);
router.get('/register', registerMethods.load);
router.post('/register', registerMethods.register);

router.get('/profile', profile.getProfile);

module.exports = router