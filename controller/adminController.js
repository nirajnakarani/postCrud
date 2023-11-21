// ----- model -----

var student = require("../models/Student");


// ----- path -----

var path = require("path")


// ----- file system -----

var fs = require("fs")


// ----- Add Data In Server -----

module.exports.insertSt = async function (req, res) {

    var storepath = ""
    if (req.file) {
        storepath = student.imgPath + "/" + req.file.filename
    }
    req.body.adminImg = storepath;

    var data = await student.create(req.body)

    if (data) {
        console.log("record added success");
        return res.redirect("back")
    }
    else {
        console.log("something wrong");
        return res.redirect("back")
    }

}


// ----- View Data From Server & Fetch From Server -----

module.exports.viewSt = async (req, res) => {
    var data = await student.find({})
    return res.render("viewSt", {
        stdetails: data
    })
}


// ----- Delete -----

module.exports.deleteSt = async (req, res) => {

    var oldData = await student.findById(req.query.id);

    if (oldData.adminImg) {
        var fullPath = path.join(__dirname, "..", oldData.adminImg);
        await fs.unlinkSync(fullPath);
    }

    await student.findByIdAndDelete(req.query.id)
    return res.redirect("back")
}


// ----- Update page -----

module.exports.updateSt = async (req, res) => {
    var record = await student.findById(req.query.id);

    return res.render("update", {
        oldSt: record
    })
}


// ----- Update Data -----

module.exports.updateStdetails = async (req, res) => {

    var oldData = await student.findById(req.body.editID);
    // console.log(oldData)

    // img change 

    if (req.file) {

        // delete from folder 

        if (oldData.adminImg) {
            var fullPath = path.join(__dirname, "..",oldData.adminImg)
            await fs.unlinkSync(fullPath)
        }

        // new img in folder 

        var storePath = "";
        storePath = student.imgPath + "/" + req.file.filename;
        req.body.adminImg = storePath

    }


    // img not change 

    else {
        req.body.adminImg = oldData.adminImg
    }


    await student.findByIdAndUpdate(req.body.editID, req.body)

    return res.redirect("/viewSt");

}