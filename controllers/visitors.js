var Visitor = require("../models/visitor");

module.exports = {
  create,
  new: newVisitor,
  index,
  delete: deleteOne,
  update,
  indexEdit
};
function create(req, res) {
  var visitor = new Visitor(req.body);
  visitor.save(function(err) {
    if (err) res.render("visitors/visitors");
    res.redirect("back");
  });
}

function newVisitor(req, res) {
  res.render("visitors/visitors");
}

function index(req, res) {
  Visitor.find({}, function(err, visitors) {
    // console.log();
    // console.log(visitors[0]);
    if (err) res.render("/visitors");
    res.render("visitors/visitors", { visitors });
  });
}
function deleteOne(req, res) {
  // console.log("************");
  Visitor.findByIdAndDelete({ _id: req.params.id }, function(err, visitor) {
    // console.log(visitor)
    visitor.save(function(err) {
      if (err) redirect("back");
    });
    res.redirect("back");
  });
}

function indexEdit(req, res) {
  res.render("visitors/edit");
}
// function update(req, res) {
//   Visitor.findByIdAndUpdate({ _id: req.params.id }, function(err, visitors) {
//     if (err) redirect("back");
//     visitors.comment = req.body.comment;
//     // visitors.comment.push(req.body);
//     visitors.save();
//     res.redirect("back");
//   });
// }
function update(req, res) {
  Visitor.findById({ _id: req.params.id }, function(err, visitors) {
    visitors.content = req.body.editContent;
    visitors.save(function(err) {
      if (err) res.redirect("back");
    });
    res.redirect("back");
  });
}
