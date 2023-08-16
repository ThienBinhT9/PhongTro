const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Model/user');

const refreshsToken = []
class AuthControllers{

    async login(req, res){
        try {
            const { phone, password } = req.body;
            
            const user = await User.findOne({phone:phone});

            if(!user){
                return res.status(404).json('Tài khoản không tồn tại')
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if(!passwordCompare){
                return res.status(401).json('Mật khẩu không đúng')
            }

            if(user && passwordCompare){

                const access_token = jwt.sign({id:user._id}, 'access_token', {expiresIn:'2h'})
                const refresh_token = jwt.sign({id:user._id}, 'refresh_token', {expiresIn:'365d'})
                refreshsToken.push(refresh_token)
                res.cookie('refreshToken', refresh_token)

                const {password, ...others} = user._doc

                const returnUser = {
                    ...others,
                    access_token
                }
                res.status(200).json(returnUser)
            }

        } catch (error) {
            return res.status(500).json(error)
        }
    }

    async register(req, res) {
        try {
            const {name, password, phone} = req.body;

            if(!name || !password || !phone) return res.status(400).json({
                err:1,
                msg:'Gửi thiếu thông tin'
            })

            const _user = await User.findOne({phone})
            if(_user) {
                return res.status(400).json({
                    err:1,
                    msg:'Số điện thoại đã được dùng để đăng kí trước đó!'
                })
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)

            //create
            const newUser = await new User({
                name,
                phone,
                password:hashedPassword
            })

            //save
            const user = await newUser.save() 
            res.status(200).json(user)

        } catch (error) {
            return res.status(500).json({
                err:-1,
                msg:'Lỗi server ' + error
            })
        }
    }

    async logout(req, res) {
        try {
            refreshsToken.pop()
            await res.clearCookie('refreshToken')
            res.status(200).json('Logout Successfully')
        } catch (error) {
            res.status(500).json('Lỗi')
        }
    }

    async refreshToken(req, res) {
        try {
            const refreshToken = req.cookies.refreshToken

            if(!refreshToken){
                return res.status(400).json('Bạn chưa đăng nhập')
            }

            if(!refreshsToken.includes(refreshToken)){
                return res.status(400).json('Bạn chưa đăng nhập_')
            }

            jwt.verify(refreshToken,'refresh_token', (err, user) => {
                if(err){
                    return res.status(401).json('Token không hợp lệ')
                }
                else{
                    refreshsToken.pop()

                    const newAccessToken = jwt.sign({id:user.id}, 'access_token', {expiresIn:'2h'})
                    const newRefreshToken = jwt.sign({id:user.id}, 'refresh_token', {expiresIn:'365d'})
                    refreshsToken.push(newRefreshToken)
                    res.cookie('refreshToken', newRefreshToken)

                    res.status(200).json(newAccessToken)
                }
            })

            
        } catch (error) {
            return res.status(500).json('Lỗi')
        }
    }
}

module.exports = new AuthControllers;
