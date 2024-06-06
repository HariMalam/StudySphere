const express = require("express");
const router = express.Router();
const {
  handleGetRequest,
  handlePostRequest,
} = require("../controllers/request");

router.get("/", handleGetRequest);
router.post("/", handlePostRequest);

module.exports = router;
