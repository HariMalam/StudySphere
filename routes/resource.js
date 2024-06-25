const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require('fs');

const {
  handleGetResource,
  handlePostResource,
  handleGetDelete,
  handleSearch,
} = require("../controllers/resource");

router.get("/", handleGetResource);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    if (file.fieldname === 'image') {
      uploadPath = './public/thumbnails/';
    } else if (file.fieldname === 'pdfFile') {
      uploadPath = './pdfs/';
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  }
});

const uploadfile = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).fields([
  { name: 'image', maxCount: 1 },
  { name: 'pdfFile', maxCount: 1 }
]);

router.use("/books", express.static("public"));

router.post("/", uploadfile, handlePostResource);

router.post("/search",handleSearch);

router.get("/delete/:id", handleGetDelete);

module.exports = router;
