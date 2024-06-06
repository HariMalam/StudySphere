const Feedback = require("../models/feedback");

const handleGetFeedback = async (req, res) => {
  const user = req.user;
  let status = false;
  if (user) {
    status = true;
  }
  let feedbacks = [];
  if(user.userType === "admin"){
    feedbacks = await Feedback.find().sort({createdAt: -1,});
  }
  res.render("feedback/feedback", { status, feedbacks, user });
};

const handlePostFeedback = async (req, res) => {
  const { title, email, feedback } = req.body;
  const username = req.user.username;
  try {
    const newFeedback = new Feedback({ title, email, feedback, username });
    await newFeedback.save();
    res.redirect("/feedback");

  } catch (err) {
    console.error("Error submitting feedback:", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { handleGetFeedback, handlePostFeedback };
