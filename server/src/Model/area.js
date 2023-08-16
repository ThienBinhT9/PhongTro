const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AreaSchema = new Schema({
    code:String,
    order:String,
    value:String
},{timestamps:true, collection:'area'})

module.exports = mongoose.model('area', AreaSchema);