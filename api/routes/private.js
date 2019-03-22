const express = require("express");
const router = express.Router();
const Location = require("../models/Location");

router.get("/", function(req, res) {
  console.log("req.decoded", req.decoded);

  res.json({
    message: `Welcome ${req.decoded.user} to the coolest API on earth!`
  });
});

router.get("/locations", function(req, res) {
  Location.find({}, function(err, locations) {
    res.json(locations);
  });
});

router.get("/check", function(req, res) {
  res.json(req.decoded);
});

module.exports = router;
