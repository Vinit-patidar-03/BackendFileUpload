const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    fileUrl:{
        type: String,
        default: "No Url"
    }
})

const Files = mongoose.model('Files',fileSchema);

module.exports = Files;
