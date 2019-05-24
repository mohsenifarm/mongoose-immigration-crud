var router = require("express").Router();
var peoplesCtrl = require("../controllers/peoples");

// GET /students
router.get("/peoples", peoplesCtrl.index);

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/auth/google");
}
module.exports = router;
