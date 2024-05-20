const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageControllers");

router.post("/send/:id", messageController.sendMessage);
router.get("/get/:id", messageController.getMessages);

//fetch review for product
module.exports = router;