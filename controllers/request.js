const Request = require("../models/request");

const handleGetRequest = async (req, res) => {
  const user = req.user;
  let status = false;
  if (user) {
    status = true;
  }
  let requests = [];

  if(user.userType === "admin"){
    requests = await Request.find();                            
  }

  res.render("request/request", { status,user, requests});
};

const handlePostRequest = async (req, res) => {
  const { bookName, authorName, publication } = req.body;
  const username = req.user.username;
      try {
          const newReqest = new Request({ bookName, authorName, publication, username });
          await newReqest.save();
          res.redirect("/request");
      } catch (err) {
          console.error('Error submitting feedback:', err);
          res.status(500).send('Internal Server Error');
      }
};

module.exports = { handleGetRequest, handlePostRequest };
