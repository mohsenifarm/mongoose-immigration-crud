var passport = require("passport");

var GoogleStrategy = require("passport-google-oauth20").Strategy;

var People = require("../models/people");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
      // callbackURL: "https://payamcrud.herokuapp.com/oauth2callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      People.findOne({ googleId: profile.id }, function(err, people) {
        if (err) return cb(err);
        if (people) {
          return cb(null, people);
        } else {
          var newPeople = new People({
            neme: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
          });
          newPeople.save(function(err) {
            if (err) return cb(err);
            return cb(null, newPeople);
          });
        }
      });
    }
  )
);




passport.serializeUser(function(people, cb) {
  cb(null, people.id);
});

passport.deserializeUser(function(id, cb) {
  People.findById(id, function(err, people) {
    cb(err, people);
  });
});
