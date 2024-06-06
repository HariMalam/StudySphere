const express = require("express");
const router = express.Router();
const {
  handleGetLogin,
  handleGetSignup,
  handlePostLogin,
  handlePostSignup,
} = require("../controllers/auth");

router.get("/login", handleGetLogin);
router.get("/signup", handleGetSignup);
router.post("/login", handlePostLogin);
router.post("/signup", handlePostSignup);

module.exports = router;
