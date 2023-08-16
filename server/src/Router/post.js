const router = require('express').Router()
const postControllers = require('../Controllers/postControllers');

router.get('/outstanding', postControllers.getOutstandingPosts)

router.get('/detail/:id', postControllers.getDetailPost);

router.get('/:cate/', postControllers.getPosts);

router.get('/', postControllers.getPosts)

module.exports = router;
