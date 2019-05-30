var router = require("express").Router();

var peoplesCtrl = require("../controllers/peoples");
var visitorsCtrl = require("../controllers/visitors");



router.get("/peoples", peoplesCtrl.index);

router.get("/visitors", isLoggedIn, visitorsCtrl.index);
router.post("/visitors", isLoggedIn, visitorsCtrl.create);
router.get("/visitors", visitorsCtrl.new);
router.post("/visitors/:id", visitorsCtrl.delete);
router.post("/visitors/:id/edit", visitorsCtrl.update);





function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
module.exports = router;
