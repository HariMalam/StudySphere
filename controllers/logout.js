const handleLogout = (req, res) => {
  delete req.session.uid;
  req.user = null;
  res.redirect("/");
};

module.exports = {
  handleLogout,
};
