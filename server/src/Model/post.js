const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    
    images:{
        type:Array,
        default:[]
    },

    star:{
        type:String,
        default:'0'
    },

    title:String,
    labelCode:String,
    address:String,

    rent:String,
    acreage:String,

    description:String,

    area:String,
    type:String,
    target:String,

    userId:String,
    username:String,
    userphone:String,
    userAva:String,

    categoryCode:String,
    priceCode:String,
    areaCode:String,
    provinceCode:String

},
{timestamps:true, collection:'post'});

module.exports = mongoose.model('post', PostSchema);
