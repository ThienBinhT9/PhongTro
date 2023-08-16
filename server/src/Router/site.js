const router = require('express').Router()
const SiteControllers = require('../Controllers/siteControllers');
const { insertData } = require('../Utils/insertData')

router.get('/category', SiteControllers.getCategory);

router.get('/province', SiteControllers.getProvince);

router.get('/price', SiteControllers.getPrice);

router.get('/area', SiteControllers.getArea);

router.post('/insert', insertData);


module.exports = router;
