// ----- express -----

var express = require("express");


// ----- router -----

var router = express.Router();


// ----- admin controller -----

var adminController = require("../controller/adminController");


// ----- model -----

var student = require("../models/Student");


// ----- addSt page routing -----

router.get("/", async (req, res) => {
    return res.render("addSt")
})


// ----- Add Data In Server -----

router.post("/insertSt", student.uploadImg, adminController.insertSt);


// ----- View Data From Server & Fetch From Server-----

router.get("/viewSt", adminController.viewSt)


// ----- Delete routing -----

router.get("/deleteSt", adminController.deleteSt)


// ----- Update Page Routing -----

router.get("/updateSt", adminController.updateSt)


// ----- Update Data -----

router.post("/upadateStdetails", student.uploadImg, adminController.updateStdetails)


// ----- export routes -----

module.exports = router;