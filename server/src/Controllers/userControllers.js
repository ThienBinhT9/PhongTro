const User = require('../Model/user');
const Post = require('../Model/post');
const bcrypt = require('bcrypt');


class UserControllers {

    async update(req, res) {
        try {
            const user = await User.findById(req.params.id) 

            if(req.body.password){

                const {passwordOld, passwordNew} = req.body.password;
                
                const passwordCompare = await bcrypt.compare(passwordOld, user.password);

                if(!passwordCompare){
                    return res.status(401).json('Mật khẩu cũ không đúng')
                }else{
                    const salt = await bcrypt.genSalt(10);
                    const hashedPassword = await bcrypt.hash(passwordNew, salt)

                    const newUser = await User.findByIdAndUpdate(req.params.id,{
                        $set:{password: hashedPassword}
                    },{new: true})

                    const {password, ...others} = newUser._doc;

                    return res.status(200).json(others)
                }
            }else if(req.body.phone){

                const newUser = await User.findByIdAndUpdate(req.params.id, {
                    $set:{phone:req.body.phone}
                },{new:true})

                const {password, ...others} = newUser._doc;
                return res.status(200).json(others)
            }else{

                const newUser = await User.findByIdAndUpdate(req.params.id, {
                    $set:req.body
                },{new:true})

                if(req.body.name || req.body.avatar){
                    try {
                        await Post.updateMany({userId:user._id},{
                            $set:{userAvatar:req.body.avatar, username:req.body.name}
                        })
                    } catch (error) {
                        return res.status(500).json('Lỗi server_02')
                    }
                }

                const {password, ...others} = newUser._doc;

                res.status(200).json(others)
            
            }

        } catch (error) {
            return res.status('Lỗi server');
        }
    }
}

module.exports = new UserControllers;
