const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sellerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Seller"
    },

    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "Customer"
    },

    message : {
        type : String,
        required : true,
    },

    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        
    },

    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    }
    }, 
    
    {timestamps : true}

)

exports.MessageModel = mongoose.model("Message", MessageSchema);

