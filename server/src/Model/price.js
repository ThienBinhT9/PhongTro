const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    code:String,
    order:Number,
    value:String
},{
    timestamps:true,
    collection:'price'
})

module.exports = mongoose.model('price', PriceSchema);
