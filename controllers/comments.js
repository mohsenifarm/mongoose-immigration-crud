var Visitor = require("../models/visitor");

module.exports = {
  create,
  delete: deleteOne
};

function create(req, res) {
  console.log('req.user: ', req.user)
  Visitor.findById(req.params.id, function(err, visitors) {
    visitors.comment.unshift({ comment: req.body.comment, user: req.user.id });
    visitors.save(function(err) {
      if (err) res.render("visitors/visitors");
      res.redirect(`back`);
    });
  });
}
function deleteOne(req, res) {
  Visitor.findById({ _id: req.params.id }, function(err, vis) {
    // let comments = vis.comment.filter(c => {
    //   console.log("c._id: ", c._id);
    //   console.log("req.params.cId: ", req.params.cId);
    //   if (JSON.stringify(c._id) !== JSON.stringify(req.params.cId)) {
    //     console.log('c: ', c)
    //     return c;
    //   }
    // });
    // vis.comment = comments;
    // vis.save();

    vis.comment.forEach(function(c, idx){
      // console.log(c)
      if(JSON.stringify(c._id) === JSON.stringify(req.params.cId)){
        console.log(c)
        vis.comment.splice(idx, 1);
      }
    })
    console.log('vis: ', vis)
    vis.save();
    res.redirect("back");
  });
}
