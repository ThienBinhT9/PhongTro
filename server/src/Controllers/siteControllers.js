const Category = require('../Model/category');
const Province = require('../Model/province');
const Price = require('../Model/price');
const Area = require('../Model/area');

class SiteControllers{
     
    //[GET] /site/category
    async getCategory(req, res) {
        try {
            const categories = await Category.find({});
            res.status(200).json(categories)
        } catch (error) {
            return res.status(500).json('Lỗi data category')
        }
    }

    //[GET] /site/province
    async getProvince(req, res) {
        try {
            const provinces = await Province.find({})
            res.status(200).json(provinces)
        } catch (error) {
            return res.status(500).json('Lỗi data province')
        }
    }

    async getPrice(req, res) {
        try {
            const prices = await Price.find({})
            res.status(200).json(prices)
        } catch (error) {
            return res.status(500).json('Lỗi data price')
        }
    }

    async getArea(req, res) {
        try {
            const area = await Area.find({})
            res.status(200).json(area)
        } catch (error) {
            return res.status(500).json('Lấy data area lỗi')
        }
    }


}

module.exports = new SiteControllers;
