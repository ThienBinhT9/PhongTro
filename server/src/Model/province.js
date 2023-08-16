const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProvinceSchema = new Schema({
    code:String,
    value:String
},{
    timestamps:true,
    collection:'province'
})

module.exports = mongoose.model('province', ProvinceSchema);
