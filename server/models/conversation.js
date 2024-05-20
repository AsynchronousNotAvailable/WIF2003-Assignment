const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema({
   messages : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Message",
        default : [],
    }
   ],

   sellerId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Seller",
    required : true,
   },

   customerId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Customer",
    required : true,
   }

}, {timestamps : true});

exports.ConversationModel = mongoose.model("Conversation", ConversationSchema);

