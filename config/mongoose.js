// ----- mongoose -----

var mongoose = require("mongoose");


// ----- mongoose connect and database -----

mongoose.connect("mongodb://127.0.0.1/batch12");


// ----- mongoose connection -----

var db = mongoose.connection;


// ----- db open one time and server connetion -----

db.once("open", (err) => {
    err ? console.log(err) : console.log("db connected")
})


// ----- db exports -----

module.exports = db