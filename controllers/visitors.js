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
function getPost(req, res){
  Visitor.findById(req.params.id).populate('user').exec( (err, visitor) => {
    console.log('visitor: ', visitor)
    res.render('visitors/editPost', {visitor})
  })
}
function create(req, res) {
  var visitor = new Visitor(req.body);
  console.log("req.user: ", req.user);
  visitor.user = req.user.id;
  People.findById(req.user.id, function(err, people) {
    console.log("people: ", people);
    people.posts.push(visitor.id);
    people.save();
  });
  visitor.save(function(err) {
    if (err) res.render("visitors/visitors");
    console.log("visitor: ", visitor);
  });
  res.redirect("back");
}

function newVisitor(req, res) {
  res.render("visitors/visitors");
}

function index(req, res) {
  Visitor.find({})
    .populate('comment.user').populate('user')
    .exec( (err, visitors) => {
      res.render("visitors/visitors", {visitors, user: req.user});
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
    res.redirect("/visitors");
  });
}
