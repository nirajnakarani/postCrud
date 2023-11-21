// ----- port -----

var port = 9000;


// ----- express -----

var express = require("express");
var app = express()


// ----- path -----

var path = require("path")


// ----- file system -----

var fs = require("fs")


// ----- for view engine and ejs -----

app.set("view engine", "ejs");


// ----- for view folder path -----

app.set("views", path.join(__dirname, "views"))


// ----- for uploads folder static path -----

app.use("/uploads", express.static(path.join(__dirname, "uploads")))


// ----- for post url encoded -----

app.use(express.urlencoded())


// ----- mongo DB -----

// var db = require("./config/mongoose")

var mongoose = require("mongoose");

mongoose.connect("mongodb+srv://nakaraniniraj87580:niraj87580@cluster0.p4x1fyq.mongodb.net/batch12", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.log(err);
    })


// ----- request to router -----

app.use("/", require("./routes"));
app.use("/post", require("./routes/post"));


// ----- server connection -----

app.listen(port, function (err) {
    err ? console.log(err) : console.log(`server connected on port : ${port}`)
})
