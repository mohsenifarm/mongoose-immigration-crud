var router = require("express").Router();
var visitorsCtrl = require("../controllers/visitors");


router.get("/", isLoggedIn, visitorsCtrl.index);
router.post("/", isLoggedIn, visitorsCtrl.create);
router.get("/", visitorsCtrl.new);
router.post("/:id", visitorsCtrl.delete);
router.post("/:id/edit", visitorsCtrl.update);
router.get('/:id', isLoggedIn, visitorsCtrl.getPost);




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
module.exports = router;
