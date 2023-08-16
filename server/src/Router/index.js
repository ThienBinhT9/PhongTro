const authRouter = require('./auth');
const siteRouter = require('./site');
const postRouter = require('./post');
const userRouter = require('./user');

const router = (app) => {

    app.use('/auth', authRouter);

    app.use('/user', userRouter);

    app.use('/post', postRouter);

    app.use('/', siteRouter);
}



module.exports = router;
