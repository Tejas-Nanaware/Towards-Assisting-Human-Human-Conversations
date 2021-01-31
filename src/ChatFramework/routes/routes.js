var express = require('express');

const loginMethods = require('../controllers/login');
const indexMethods = require('../controllers/index');
const profile = require('../controllers/profile');

const router = express.Router();
router.get('/', indexMethods.index);
router.get('/login', loginMethods.load);
router.post('/login', loginMethods.login);
router.get('/profile', profile.getProfile);

module.exports = router