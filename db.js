const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://fanwi:12345@cluster0.fb9uc.mongodb.net/Hostly_Del'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true});

var connection= mongoose.connection

connection.on("error",()=>{
    console.log("Connection failed")
})
connection.on("connected",()=>{
    console.log("Connection successful")
})

module.export = mongoose