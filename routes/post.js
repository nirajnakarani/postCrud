const { model } = require("mongoose");
var postController = require("../controller/postController");
var post = require("../models/post")
var express = require("express");

var router = express.Router();

router.get("/", postController.add);
router.post("/addData", post.uploadImg, postController.addData);
router.get("/viewPost", postController.viewPost);
router.get("/deletePost", postController.deletePost);
router.get("/updatePost", postController.updatePost);
router.post("/updatePostData", post.uploadImg, postController.updatePostData);

module.exports = router;