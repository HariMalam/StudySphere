const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventName: String,
    companyName: String,
    location: String,
    website: String,
    date: Date,
    thumbnail: String,
    type: String,
    desc: String,
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
