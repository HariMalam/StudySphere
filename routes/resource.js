const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  handleGetResource,
  handlePostResource,
  handleGetDelete,
  handleSearch,
} = require("../controllers/resource");

router.get("/", handleGetResource);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./pdfs/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

const upload = multer({ storage: storage });

router.use("/books", express.static("public"));

router.post("/", upload.single("pdfFile"), handlePostResource);

router.post("/search",handleSearch);

router.get("/delete/:id", handleGetDelete);

module.exports = router;
