const router = require('express').Router()
const AuthControllers = require('../Controllers/authControllers');
const { verifyToken } = require('../Middlewares/auth')

router.post('/login', AuthControllers.login);

router.post('/register', AuthControllers.register);

router.post('/logout', verifyToken, AuthControllers.logout);

router.post('/refresh', AuthControllers.refreshToken);

module.exports = router;
