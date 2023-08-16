const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    phone:{
        type:String,
    },
    name:{
        type:String
    },
    password:{
        type:String
    },
    zalo:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:'https://static2.yan.vn/YanNews/2167221/202102/facebook-cap-nhat-avatar-doi-voi-tai-khoan-khong-su-dung-anh-dai-dien-e4abd14d.jpg'
    },
    email:{
        type:String,
        default:''
    },
    facebook:{
        type:String,
        default:''
    }
}, {
    timestamps:true,
    collection:'user'
})

module.exports = mongoose.model('user', UserSchema);
