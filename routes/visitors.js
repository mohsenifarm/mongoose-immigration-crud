var router = require("express").Router();
var visitorsCtrl = require("../controllers/visitors");


router.get("/:category", isLoggedIn, visitorsCtrl.index);
router.get('/edit/:id', isLoggedIn, visitorsCtrl.getPost);
router.post("/", isLoggedIn, visitorsCtrl.create);
router.get("/", visitorsCtrl.new);
router.post("/:id", visitorsCtrl.delete);
router.post("/edit/:id", visitorsCtrl.update);




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
module.exports = router;
