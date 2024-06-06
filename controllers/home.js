const handleGetHome = async (req, res) => {
  const user = req.user;
  let status = false
  if(user){
    status = true;
  }
  res.render('home/home',{status});

}

module.exports = { handleGetHome }