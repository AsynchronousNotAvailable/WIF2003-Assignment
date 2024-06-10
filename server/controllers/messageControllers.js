const MessageModel = require("../models/message");
const ConversationModel = require("../models/conversation")
const MessageService = require("../services/messageService");

exports.sendMessage = async (req, res) => {
    //how do i get the senderid, i am using global context for the current logged in user
    const {id: receiverId} = req.params; //receiverId
    const {message, senderId} = req.body; //senderId
    //Determining which is seller and customer

    try {
        const newMessage = await MessageService.sendMessage(senderId, receiverId, message);
       return res.status(201).json(newMessage);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

exports.getChats = async (req,res) => {
    const {userId} = req.params;
    try {
        const chats = await MessageService.getChats(userId);
        return res.status(200).json(chats);
    } catch (error) {
        return res.status(500).json({error : error.message});
    }
}

exports.getMessages = async (req, res) => {
    const {userId:senderId,tochatId: userToChatId} = req.params; 
    try{
        const messages = await MessageService.getMessage(senderId, userToChatId);
        return res.status(200).json(messages);
    }

    catch(error){
        return res.status(500).json({ error: error.message });
    }
}
