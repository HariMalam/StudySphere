const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const crypto = require("crypto");
const session = require("express-session");

const homeRouter = require("./routes/home");
const dashboardRouter = require("./routes/dashboard");
const resourceRouter = require("./routes/resource");
const requestRouter = require("./routes/request");
const feedbackRouter = require("./routes/feedback");
const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");
const logout = require("./routes/logout");
const { restrictToLoggedinUserOnly } = require("./middlewares/restrict");
const { setUser } = require("./middlewares/setUser");

mongoose
  .connect("mongodb://127.0.0.1:27017/StudySphere")
  .then(() => {
    console.log("MongoDB localhost database connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex");
};

app.use(
  session({
    secret: generateSecretKey(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(setUser);


app.use("/", homeRouter);
app.use("/auth", authRouter);

app.use(express.static(path.join(__dirname, "public")));

const authenticate = (req, res, next) => {
  if (req.user) {
      next();
  } else {
      res.status(401).send('Unauthorized');
  }
};

app.get('/pdfs/:filename', authenticate, (req, res) => {
  const filename = req.params.filename;
  const pdfPath = path.join(__dirname, 'pdfs', filename);
  res.sendFile(pdfPath);
});

app.use(restrictToLoggedinUserOnly);

app.use("/dashboard", dashboardRouter);
app.use("/resource", resourceRouter);
app.use("/request", requestRouter);
app.use("/event", eventRouter);
app.use("/feedback", feedbackRouter);
app.use("/logout", logout);

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
