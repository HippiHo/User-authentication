const mongoose = require("mongoose");
const mongopath = process.env.MONGOPATH || `localhost`;
const Location = require("../models/Location");
const User = require("../models/User");

(async () => {
  mongoose.connect(`mongodb://${mongopath}:27017/DCI6jsonwebtoken`, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  mongoose.connection.on("error", console.error);

  const locations = await Location.find({});
  if (locations.length == 0) {
    console.log(`No locations in database, lets create some`);
    const titles = [
      "Oranienburg",
      "Potsdam",
      "Eisenhuettenstadt",
      "Stuttgart",
      "Rostock",
      "Hamburg"
    ];
    for (let i = 0; i < titles.length; i++) {
      Location.create({
        name: titles[i]
      });
    }
  }
  const users = await User.find({});
  if (users.length == 0) {
    console.log(`No user in database, lets create some`);
    const user = new User({
      name: "alice",
      password: "$2b$10$h/rbnvKp1KuAdTv3ZgE6JeFC5le51MwJKFGSnSZwP5nnDqSB1EpBW", // "password"
      admin: true
    });
    await user.save();
    console.log("User saved successfully");
  }

  mongoose.connection.close();
})();
