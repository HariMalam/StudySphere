const Event = require('../models/event');

const handleGetEvent = async (req, res) => {
  const user = req.user;
  let status = false;
  if (user) {
    status = true;
  }
  const search = "";
  const events = await Event.find({});
  res.render("event/event", { status, user, search, events });
};

const handlePostEvent = async (req, res) => {
  const {eventName, companyName, location, website, date, type, desc, tags} = req.body;
  const thumbnail = req.file.filename;

  const result = await Event.create({
    eventName,
    companyName,
    location,
    location,
    website,
    date,
    type,
    desc,
    tags,
    thumbnail,
  });

  res.redirect("/event");
};

const handleGetEventDetails = (req,res) =>{
  const id = req.params.id
  res.render('event/detail', {id})
}

module.exports = { handleGetEvent, handlePostEvent, handleGetEventDetails };
