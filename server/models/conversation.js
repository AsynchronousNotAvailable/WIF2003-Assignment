const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
   messages : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "MessageModel",
        default : []
    }
        ],
    
    participants : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CustomerModel",
            required : true
        },
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "SellerModel",
            required : true
        }
    ]
   
   
}, {timestamps : true})

exports.ConversationModel = mongoose.model("Conversation", ConversationSchema);
