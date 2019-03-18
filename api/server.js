require("dotenv").config({ path: "./.env" });
const bcrypt = require("bcrypt");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");

app.use(cors());
app.use(morgan("dev"));
app.use("/", indexRouter);

const jwt = require("jsonwebtoken");
const Location = require("./models/Location");
const User = require("./models/User");

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const mongopath = process.env.MONGOPATH || `localhost`;
const port = process.env.PORT || 8080;

mongoose.connect(`mongodb://${mongopath}:27017/DCI6jsonwebtoken`, {
  useNewUrlParser: true,
  useCreateIndex: true
});
app.set("superSecret", "thisshouldbesupersecret");

app.post("/", function(req, res) {
  console.log("req.body", req.body);

  res.send("Hello! The API is at http://localhost:" + port + "/api");
});

const apiRoutes = express.Router();

apiRoutes.post("/authenticate", async function(req, res) {
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

apiRoutes.post("/signup", async (req, res) => {
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

apiRoutes.use(function(req, res, next) {
  const token = req.headers["x-access-token"];

  if (token) {
    try {
      const decoded = jwt.verify(token, app.get("superSecret"));

      req.decoded = decoded;
      //This actually makes this function to a middleware and forwards to the authenticated routes
      next();
    } catch (e) {
      return res.json({
        success: false,
        message: "Failed to authenticate token."
      });
    }
  } else {
    return res.status(403).send({
      success: false,
      message: "No token provided."
    });
  }
});

apiRoutes.get("/", function(req, res) {
  console.log("req.decoded", req.decoded);

  res.json({
    message: `Welcome ${req.decoded.user} to the coolest API on earth!`
  });
});

apiRoutes.get("/locations", function(req, res) {
  Location.find({}, function(err, locations) {
    res.json(locations);
  });
});

apiRoutes.get("/check", function(req, res) {
  res.json(req.decoded);
});

app.use("/api", apiRoutes);

app.listen(port);
console.log(``);
console.log(`#######################################################`);
console.log("The api-url is localhost:" + port);
console.log(``);
console.log(
  `A user is in the database with name: alice and password: password`
);
