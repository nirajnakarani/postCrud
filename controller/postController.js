var post = require("../models/post");
var path = require("path")
var fs = require("fs")

module.exports.add = async (req, res) => {
    return res.render("addpost")
}

module.exports.addData = async (req, res) => {
    var imgPath = "";
    if (req.file) {
        imgPath = post.imgPath + "/" + req.file.filename
    }
    req.body.postImg = imgPath

    await post.create(req.body)
    return res.redirect("back")
}

module.exports.viewPost = async (req, res) => {
    var postData = await post.find({})
    return res.render("viewpost", {
        post: postData
    })
}

module.exports.deletePost = async (req, res) => {

    var oldPost = await post.findById(req.query.id);
    console.log(oldPost)

    if (oldPost.postImg) {

        var fullPath = path.join(__dirname, "..", oldPost.postImg);
        fs.unlinkSync(fullPath)

    }
    await post.findByIdAndDelete(req.query.id)
    return res.redirect("back")

}

module.exports.updatePost = async (req, res) => {

    var oldData = await post.findById(req.query.id);
    return res.render("updatepost", {
        updateData: oldData
    })

}

module.exports.updatePostData = async (req, res) => {

    var oldData = await post.findById(req.body.editid)

    if (req.file) {

        if (oldData.postImg) {
            var fullPath = path.join(__dirname, "..", post.imgPath);
            fs.unlinkSync(fullPath);
        }

    }
    else {

        req.body.postImg = oldData.postImg
    }

    await post.findByIdAndUpdate(req.body.editid, req.body)
    return res.redirect("/post/viewPost")
}