const Post = require('../Model/post');
const User = require('../Model/user');

class postControllers{

    //[GET] /post/:cate/price=?&area=?&?page=??
    async getPosts(req, res) {

        try {
            const { cate } = req.params
            let {page, price, area} = req.query

            let query = {}

            if(price && area) query = {priceCode:price, areaCode:area}
            else if(price) query = {priceCode:price}
            else if(area) query = {areaCode:area}

            if(cate === 'cho-thue-can-ho'){
                if(price && area) query = {categoryCode:'CTCH', priceCode:price, areaCode:area}
                else if(price) query = {categoryCode:'CTCH', priceCode:price}
                else if(area) query = {categoryCode:'CTCH', areaCode:area}
                else  query = {categoryCode:'CTCH'}
            }else if(cate === 'cho-thue-mat-bang'){
                if(price && area) query = {categoryCode:'CTMB', priceCode:price, areaCode:area}
                else if(price) query = {categoryCode:'CTMB', priceCode:price}
                else if(area) query = {categoryCode:'CTMB', areaCode:area}
                else query = {categoryCode:'CTMB'}
            }else if(cate === 'nha-cho-thue'){
                if(price && area) query = {categoryCode:'NCT', priceCode:price, areaCode:area}
                else if(price) query = {categoryCode:'NCT', priceCode:price}
                else if(area) query = {categoryCode:'NCT', areaCode:area}
                else query = {categoryCode:'NCT'}
            }else if(cate === 'cho-thue-phong-tro'){
                if(price && area) query = {categoryCode:'CTPT', priceCode:price, areaCode:area}
                else if(price) query = {categoryCode:'CTPT', priceCode:price}
                else if(area) query = {categoryCode:'CTPT', areaCode:area}
                else query = {categoryCode:'CTPT'}
            }

            if(!page){
                page = 1
            }
            const skip = (page - 1) * 5
            const posts = await Post.find(query)
            .limit(5)
            .skip(skip)
            .select('title description images address rent acreage username userphone userAval')
            .sort({createdAt:-1})

            const totalDocs = await Post.countDocuments(query)

            res.status(200).json({posts,totalDocs})
        } catch (error) {
            return res.status(500).json('Lỗi server')
        }
    }

    //[GET] /post/outstanding
    async getOutstandingPosts(req, res) {
        try {
            const posts = await Post.find()
            .limit(8)
            .sort({createdAt:-1})
 
            res.status(200).json(posts)

        } catch (error) {
            return res.status(500).json('Lỗi server')
        }
    }

    //[POST] /post/detail/:id
    async getDetailPost(req, res) {
        try {
            const { id } = req.params;
            const post = await Post.findById(id)
            res.status(200).json(post)
        } catch (error) {
            return res.status(500).json('Lỗi server')
        }
    }
    
    
}

module.exports = new postControllers;
