var express = require("express");
var router = express.Router();
var passport = require("passport");

/* GET home page. */
router.get("/", function(req, res) {
  res.redirect("/peoples");
});
// Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/peoples",
    failureRedirect: "/peoples"
  })
);

router.get("/logout", function(req, res) {
  req.logOut();
  res.redirect("/peoples");
});

module.exports = router;
