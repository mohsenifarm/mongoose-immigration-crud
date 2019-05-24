var People = require("../models/people");

module.exports = {
  index
};

function index(req, res, next) {
  let modelQuery = req.query.name;
  People.find(modelQuery).exec(function(err, peoples) {
    if (err) return next(err);
    res.render("peoples/index", {
      peoples,
      name: req.query.name,
      user: req.user
    });
  });
}
