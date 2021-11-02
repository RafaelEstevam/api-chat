const mongoose = require("mongoose");

const Connection = new mongoose.Schema(
    {
        userId:{
            type: Number
        },
        name:{
            type: String
        },
        email:{
            type: String
        },
        hashConnection: {
            type: String
        },
        from: {
            type: String
        },
        disconnect: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Connection", Connection);