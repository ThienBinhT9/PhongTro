const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    code:String,
    path:String,
    value:String,
    header:String,
    subheader:String
}, {
    timestamps:true,
    collection:'category'
})

module.exports = mongoose.model('category', CategorySchema);