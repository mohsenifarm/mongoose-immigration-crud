var router = require("express").Router();

var peoplesCtrl = require("../controllers/peoples");
var visitorsCtrl = require("../controllers/visitors");



router.get("/", peoplesCtrl.index);




function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
module.exports = router;
