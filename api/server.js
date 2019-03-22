require("dotenv").config({ path: "./.env" });
// For sensitive information

const app = require("./app");
//This uses Express!

// To seed run "npm run seed"
// Open connection to database

const mongoose = require("mongoose");
const mongopath = process.env.MONGOPATH || `localhost`;
const port = process.env.PORT || 8080;

mongoose.connect(`mongodb://${mongopath}:27017/DCI6jsonwebtoken`, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const baseRoutes = require("./routes/index");
const apiRoutes = require("./routes/authentication");
app.use(baseRoutes);
const validateToken = require("./middlewares/validateToken");
apiRoutes.use(validateToken);
const privateRoutes = require("./routes/private");
apiRoutes.use(privateRoutes);

app.use("/api", apiRoutes);

app.listen(port);
console.log(``);
console.log(`#######################################################`);
console.log("The api-url is localhost:" + port);
console.log(``);
console.log(
  `A user is in the database with name: alice and password: password`
);
