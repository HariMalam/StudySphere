const Book = require("../models/book");
const pdf2img = require("pdf2img");
const fs = require("fs");

const handleGetResource = async (req, res) => {
  const user = req.user;
  let status = false;
  if (user) {
    status = true;
  }

  let books = [];
  let pyqs = [];
  let sylabuss = [];
  let search = "";

  if (req.session.search) {
    search = req.session.search;
    delete req.session.search;
    const regex = new RegExp(search, "i");

    let query = {};

    query.$or = [
      { bookName: { $regex: regex.source, $options: "i" } },
      { author: { $regex: regex.source, $options: "i" } },
      { publication: { $regex: regex.source, $options: "i" } },
      { desc: { $regex: regex.source, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
    ];

    allBooks = await Book.find(query).sort({createdAt: -1});
    books = allBooks.filter(book => book.type === 'book');
    pyqs = allBooks.filter(book => book.type === 'pyq');
    sylabuss = allBooks.filter(book => book.type === 'sylabuss');
  } else {
    books = await Book.find({ type: "book" }).sort({ createdAt: -1 });
    pyqs = await Book.find({ type: "pyq" }).sort({ createdAt: -1 });
    sylabuss = await Book.find({ type: "sylabuss" }).sort({ createdAt: -1 });
  }

  res.render("resource/resource", { status, books, user, pyqs, sylabuss, search });
};

const handlePostResource = async (req, res) => {
  const pdfPath = `./pdfs/${req.file.filename}`;
  const outname = `${Date.now()}`;

  pdf2img.setOptions({
    type: "png",
    size: 1024,
    density: 600,
    outputdir: "./public/books",
    outputname: outname,
    page: 1,
  });

  pdf2img.convert(pdfPath, async function (err, info) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error converting PDF to image");
    }

    try {
      const bookName = req.body.bookName;
      const author = req.body.author;
      const publication = req.body.publication;
      const type = req.body.type;
      const desc = req.body.desc;
      const bookThumbnail = `${outname}_1.png`;
      const bookPDF = req.file.filename;
      const check = req.body.check === "on";
      const tag = req.body.tags;

      const tags = JSON.parse(tag);

      await Book.create({
        bookName,
        author,
        publication,
        type,
        desc,
        bookThumbnail,
        bookPDF,
        check,
        tags,
      });

      res.redirect("/resource");
    } catch (createError) {
      console.error(createError);
      res.status(500).send("Error saving book to database");
    }
  });
};

const handleGetDelete = async (req, res) => {
  const _id = req.params.id;
  const book = await Book.findOne({ _id });
  fs.unlinkSync(`pdfs/${book.bookPDF}`);
  fs.unlinkSync(`public/books/${book.bookThumbnail}`);
  const apply = await Book.deleteOne({ _id });
  res.redirect("/resource");
};

const handleSearch = async (req, res) => {
  const search = req.body.search;
  req.session.search = search;
  res.redirect("/resource");
};

module.exports = { handleGetResource, handlePostResource, handleGetDelete, handleSearch };
