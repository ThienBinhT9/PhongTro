const routes = require('express').Router()
const UserControllers = require('../Controllers/userControllers');
const { verifyToken } = require('../Middlewares/auth')

routes.put('/:id', verifyToken, UserControllers.update);


module.exports = routes;
