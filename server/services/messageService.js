const { MessageModel } = require("../models/message.js");
const {ConversationModel} = require("../models/conversation.js")
const { SellerModel } = require("../models/seller.js");
const { CustomerModel } = require("../models/customer.js");
const { getReceiverSocketId } = require("../socket.js");
const { io } = require("../socket.js")
exports.sendMessage = async (senderId, receiverId, message) => {
   try {
    //Use brute force to find customerId or sellerId
    
    let customerId;
    let sellerId;
    //work on senderId first
    let user1 = await CustomerModel.findById(senderId);
    if(user1){
        customerId = senderId;
    }
    else {
        user1 = await SellerModel.findById(senderId);
        if(user1){
            sellerId = senderId;
        }
        else {
            throw new Error("Sender not found");
        }
    }

    //work on receiverId
    let user2 = await CustomerModel.findById(receiverId);
    if(user2){
        customerId = receiverId;
    }
    else {
        user2 = await SellerModel.findById(receiverId);
        if(user2){
            sellerId = receiverId;
        }
        else {
            throw new Error("Receiver not found");
        }
    }

    //find conversation. No conversation, create one, push message
    // got conversation, push message 

    
    let conversation = await ConversationModel.findOne({
        customerId : customerId,
        sellerId : sellerId,

    })
    if(!conversation){
        conversation = await ConversationModel.create({
            customerId : customerId,
            sellerId : sellerId
    })}

    const newMessage = new MessageModel({
        senderId,
        receiverId,
        customerId,
        sellerId,
        message
    })

    if(newMessage){
        conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()])

    const receiverSocketId = getReceiverSocketId(receiverId);

    if(receiverSocketId){
        //io.emit() is used to send events to all connected clients [BROADCAST]
        io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return newMessage;
    
   
}
catch (error) {
    throw new Error(error.message);
}
}

exports.getMessage = async (senderId, receiverId) => {
    try {
            
    let customerId;
    let sellerId;
    //work on senderId first
    let user1 = await CustomerModel.findById(senderId);
    if(user1){
        customerId = senderId;
    }
    else {
        user1 = await SellerModel.findById(senderId);
        if(user1){
            sellerId = senderId;
        }
        else {
            throw new Error("Sender not found");
        }
    }

    //work on receiverId
    let user2 = await CustomerModel.findById(receiverId);
    if(user2){
        customerId = receiverId;
    }
    else {
        user2 = await SellerModel.findById(receiverId);
        if(user2){
            sellerId = receiverId;
        }
        else {
            throw new Error("Receiver not found");
        }
    }

    //find conversation. No conversation, create one, push message
    // got conversation, push message 

    
    let conversation = await ConversationModel.findOne({
        customerId : customerId,
        sellerId : sellerId,

    }).populate("messages")       

    if(!conversation){
        return [];
    }

    const messages = conversation.messages;
    return messages;

    } catch (error) {
        throw new Error(error.message)
    }
}
