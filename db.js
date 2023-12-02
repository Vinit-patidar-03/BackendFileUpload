const mongoose = require('mongoose');

const connectTomongoDB = async (uri)=>{
    await mongoose.connect(uri);

    console.log("connected to mongo Successfully");
}

module.exports = connectTomongoDB;