const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    bookName: String,
    author: String,
    publication: String,
    type: String,
    unschooled: Boolean,
    bookThumbnail: String,
    bookPDF: String,
    desc: String,
    check: Boolean,
    tags: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
