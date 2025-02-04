/* This JavaScript code is defining a Mongoose schema for a Blacklist collection in a MongoDB database. */

const mongoose = require("mongoose");

const BlacklistSchema = new mongoose.Schema(
  {
    token: {type : String, unique : true, required : true},
    expireAt : {type :Date, index : {expires : 0}, required : true}
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("Blacklist", BlacklistSchema);
