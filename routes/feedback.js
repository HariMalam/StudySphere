const express = require("express");
const router = express.Router();
const { handleGetFeedback, handlePostFeedback } = require("../controllers/feedback");

router.get("/", handleGetFeedback);
router.post("/", handlePostFeedback);

module.exports = router;
