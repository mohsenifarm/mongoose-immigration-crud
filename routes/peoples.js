var router = require("express").Router();

var peoplesCtrl = require("../controllers/peoples");
var visitorsCtrl = require("../controllers/visitors");

// GET /students
router.get("/peoples", peoplesCtrl.index);

router.get("/visitors", visitorsCtrl.index);
router.post("/visitors", visitorsCtrl.create);
router.get("/visitors", visitorsCtrl.new);
router.post("/visitors/:id", visitorsCtrl.delete);


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
module.exports = router;
