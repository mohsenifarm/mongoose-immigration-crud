var router = require("express").Router();

var commentsCtrl = require("../controllers/comments");

router.post("/visitors/:id/comment", commentsCtrl.create);
