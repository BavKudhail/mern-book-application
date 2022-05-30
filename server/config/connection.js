const mongoose = require("mongoose");

mongoose.connect(
  // in heroku - connect to MONGODB_URI
  process.env.MONGODB_URI || "mongodb://localhost:27017/googlebooks_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  }
);

module.exports = mongoose.connection;
