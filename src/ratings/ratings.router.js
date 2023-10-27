const router = require("express").Router();
const controller = require("./ratings.controller");

router.route("/")
  .get(controller.list);

router.route("/:ratingId")
  .get(controller.read);

module.exports = router;
