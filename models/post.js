var mongoose = require("mongoose");
var imgPath = "/uploads/postImg"
var multer = require("multer");
var fs = require("fs");
var path = require("path")

var postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: true
    },
    postImg: {
        type: String,
        required: true
    }
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})
postSchema.statics.uploadImg = multer({ storage: storage }).single("postImg");
postSchema.statics.imgPath = imgPath;


var post = mongoose.model("post", postSchema);

module.exports = post;