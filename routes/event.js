const express = require("express");
const router = express.Router();
const multer = require('multer');
const { handleGetEvent, handlePostEvent, handleGetEventDetails } = require("../controllers/event");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/events");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "_")}`);
  },
});

const upload = multer({ storage: storage });

router.get("/", handleGetEvent);
router.get("/:id", handleGetEventDetails);
router.post("/", upload.single("image"), handlePostEvent);

module.exports = router;
