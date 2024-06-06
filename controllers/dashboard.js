const Feedback = require("../models/feedback");
const Request = require("../models/request");

const handleGetDashboard = async (req, res) => {
  const user = req.user;
  let status = false;
  if (user) {
    status = true;
  }
  const feedbacks = await Feedback.find({ username: user.username }).sort({
    createdAt: -1,
  });
  const requests = await Request.find({ username: user.username }).sort(
    "-requestedAt"
  );
  res.render("dashboard/dashboard", { status, user, feedbacks, requests });
};

module.exports = { handleGetDashboard };
