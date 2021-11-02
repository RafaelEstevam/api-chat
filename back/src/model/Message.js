const mongoose = require("mongoose");

const Message = new mongoose.Schema(
    {
        message:{
            type: String
        },
        isAttendant:{
            type: Boolean
        },
        name:{
            type: String
        },
        email:{
            type: String
        },
        to:{
            type: String
        },
        from:{
            type: String
        },
        hashConnection: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Message", Message);