const User = require("../models/user");
const bcrypt = require("bcrypt");

const handleGetLogin = (req, res) => {
  const invalid = req.session.invalid || false;
  const success = req.session.success || false;
  delete req.session.invalid;
  delete req.session.success;

  const user = req.user;
  let status = false;
  if (user) {
    status = true;
  }
  res.render("login", { invalid, success, status });
};

const handleGetSignup = (req, res) => {
  const user = req.user;
  let status = false;
  if (user) {
    status = true;
  }
  res.render("signup", {status, error:""});
};

const handlePostLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      req.session.invalid = true;
      req.session.success = false;
      return res.redirect("/auth/login");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.session.invalid = true;
      req.session.success = false;
      return res.redirect("/auth/login");
    }

    req.session.uid = user._id;

    return res.redirect("/");
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const handlePostSignup = async (req, res) => {
  const {
    name,
    username,
    mobile,
    email,
    password,
    gender,
    dob,
    address,
    university,
    college,
    branch,
    semester,
    enrollment,
  } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({
    name,
    username: username.trim(),
    mobile,
    email,
    password: hashedPassword,
    gender,
    dob,
    address,
    university,
    college,
    branch,
    semester,
    enrollment,
  });

  req.session.success = true;
  return res.redirect("/auth/login");
};

module.exports = {
  handleGetLogin,
  handleGetSignup,
  handlePostLogin,
  handlePostSignup,
};
