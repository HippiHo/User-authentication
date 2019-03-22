const express = require("express");
const router = express.Router();

const { welcomeMessage } = require("../controllers/messagesController");

/* GET home page. */
router.get("/", welcomeMessage);

router.post("/", function(req, res) {
  console.log("req.body", req.body);

  res.send("Hello! The API is at http://localhost:" + port + "/api");
});

module.exports = router;
