var mongoose = require("mongoose");
const multer = require("multer");

var path = require("path")
var imgPath = "/uploads"

var studentSchema = mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    gender: {
        required: true,
        type: String
    },
    hobby: {
        required: true,
        type: Array
    },
    city: {
        required: true,
        type: String
    },
    msg: {
        required: true,
        type: String
    },
    adminImg: {
        required: true,
        type: String
    }
})

var storeimg = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "..", imgPath))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now())
    }
})

studentSchema.statics.uploadImg = multer({ storage: storeimg }).single("adminImg")
studentSchema.statics.imgPath = imgPath

var student = mongoose.model('student', studentSchema)

module.exports = student;