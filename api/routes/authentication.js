// For routing with express:
const express = require("express");
const router = express.Router();

const User = require("../models/User");

const app = require("../app");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
//const uuidv4 = require("uuid/v4");

// For emails:
//const sendVerificationMail = require("../helpers/mailer");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

router.post("/authenticate", async function(req, res) {
  try {
    const user = await User.findOne({ name: req.body.name });
    console.log("user", user);
    if (!user) {
      res.json({
        success: false,
        message: "Authentication failed. User not found."
      });
    } else if (user) {
      const hashedPW = bcrypt.compareSync(req.body.password, user.password); // true

      if (!hashedPW) {
        return res.json({
          success: false,
          message: "Authentication failed. Wrong password."
        });
      } else {
        const payload = {
          user: user.name,
          admin: user.admin
        };
        const token = jwt.sign(payload, app.get("superSecret"), {
          expiresIn: 86400
        });

        return res.json({
          success: true,
          user: user,
          message: "Enjoy your token!",
          token: token
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signup", async (req, res) => {
  const user = await User.findOne({ name: req.body.name });

  if (user) {
    return res.json({
      success: false,
      status: 409,
      message: "Username already exists."
    });
  } else {
    const hash = bcrypt.hashSync(req.body.password, salt);
    const user = new User({
      name: req.body.name,
      password: hash
    });
    await user.save();

    return res.json({
      success: true,
      status: 201,
      message: `User created`
    });
  }
});

// const { authenticateUser } = require("../middleware/authentication");

// const {
//   listBooks,
//   addBook,
//   getBook,
//   updateBook,
//   deleteBook
// } = require("../controllers/booksController");

// router
//   .route("/")
//   .get()
//   .post();

// router.route("/authenticate").post(authenticateUser);

// router.route("/signup").post();

// router.route("/locations").get();

// router.route("/check").get();

module.exports = router;
