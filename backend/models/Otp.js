const mongoose = require("mongoose");
const validator = require("validator");


const OtpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Not Valid Email")
            }
        }
    },
    otp:{
        type:String,
        required:true
    }
});


// user otp model
const otp = new mongoose.model("otp",OtpSchema);

module.exports = otp;
