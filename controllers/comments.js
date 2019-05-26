var Visitor = require("../models/visitor");

module.exports = {
  create
};

function create(req, res) {
//   console.log("**************");
  Visitor.findById(req.params.id, function(err, visitors) {
    visitors.comment.push({ comment: req.body.comment });
    visitors.save(function(err) {
      if (err) res.redirect("/visitors");
      res.redirect("/visitors");
    });
  });
  //   console.log("visitor****:::", visitor);
}
