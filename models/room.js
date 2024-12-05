const  mongoose= require("mongoose");
const bookingSchema = new mongoose.Schema({
    bookingid: String,
    fromdate: String,
    todate: String,
    userid: String,
    status: String
}, { _id: false });

const roomSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    maxcount:{
        type:Number,
        required:true 
    },
    features:{
        type:String,
        required:true
    },
    rentperday:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required: false
    },
    imageurls:{
        type: [String], // This will be an array of strings to hold multiple image URLs
        required: true
    },
    currentbookings : [bookingSchema],
    type:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
        

},{
    timestamps: true,
})

const roomModel = mongoose.model('room',roomSchema)

module.exports = roomModel; 