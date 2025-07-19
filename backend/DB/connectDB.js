const mongoose = require("mongoose");

function connectedDB() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("DB is connected");
    })
    .catch(() => {
      console.log("DB not connected");
    });
}

module.exports = connectedDB;
