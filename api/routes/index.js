const express = require("express");
const router = express.Router();

const { welcomeMessage } = require("../controllers/messagesController");

/* GET home page. */
router.get("/", welcomeMessage);

module.exports = router;
