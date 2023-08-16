const mongoose = require('mongoose');



const connect = async() => {
    try {
        await mongoose.connect('mongodb://127.0.0.1/PhongTro');
        console.log('Connect to DB Successfully');
    } catch (error) {
        console.log('Connect Failed');
    }
}

module.exports = { connect }