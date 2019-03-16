const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imagePath: { type: String, required: true }
});

// untuk create data or create model object based on postschema definition, buat models
// first param what kind of data storing
// the second is the schema yang dipakai
module.exports = mongoose.model('Post',postSchema)