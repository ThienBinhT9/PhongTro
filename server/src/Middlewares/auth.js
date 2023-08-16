const jwt = require('jsonwebtoken')

const verifyToken = async(req, res, next) => {
    try {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(' ')[1]
            jwt.verify(accessToken, 'access_token', (err, user) => {
                
                if(err){
                    return res.status(400).json('Token không hợp lệ')
                }else{

                    req.user = user;
                    next();
                }
            })
        }
        else{
            return res.status(401).json('Bạn chưa đăng nhập')
        }
    } catch (error) {
        return res.status(500).json('Lỗi')
    }
}


module.exports = { verifyToken }