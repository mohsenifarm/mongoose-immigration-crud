var router = require("express").Router();

var commentsCtrl = require("../controllers/comments");

router.post("/visitors/:id/comment", commentsCtrl.create);
router.post('/visitors/:id/:cId/delete', commentsCtrl.delete)

module.exports = router;
