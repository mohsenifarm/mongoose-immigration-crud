var Visitor = require("../models/visitor");
var People = require("../models/people");

module.exports = {
  create,
  new: newVisitor,
  index,
  delete: deleteOne,
  update,
  indexEdit,
  getPost
};
function getPost(req, res) {
  console.log('inside the right function')
  Visitor.findById(req.params.id)
    .populate("user")
    .exec((err, visitor) => {
      console.log("visitor: ", visitor);
      res.render("visitors/editPost", { visitor });
    });
}

function create(req, res) {
  var visitor = new Visitor(req.body);
  visitor.user = req.user.id;
  People.findById(req.user.id, function(err, people) {
    people.posts.push(visitor.id);
    people.save();
  });
  visitor.save(function(err) {
    if (err) res.render("categories/categories");
  });
  // let category = new Category;
  // category.post = visitor;
  // category.name = req.body.category;
  // category.save();
  res.redirect(`/visitors/${req.body.category}`);
}

function newVisitor(req, res) {
  res.render("visitors/visitors");
}

function index(req, res) {
  Visitor.find({category: req.params.category})
    .populate("comment.user")
    .populate("user")
    .exec((err, visitors) => {
      res.render("visitors/visitors", { visitors, user: req.user });
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
    visitors.title = req.body.edittitle;
    visitors.content = req.body.editContent;
    visitors.save(function(err) {
      if (err) res.redirect("back");
    });
    res.redirect(`/visitors/${visitors.category}`);
  });
}
