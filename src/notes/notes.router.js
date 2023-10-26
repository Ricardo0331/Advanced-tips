const router = require("express").Router();
const controller = require("./notes.controller");

router
  .route("/:noteId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(controller.methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(controller.methodNotAllowed);

router
  .route("/:noteId/ratings")
  .get(controller.listNoteRatings)
  .all(controller.methodNotAllowed);

router
  .route("/:noteId/ratings/:ratingId")
  .get(controller.readNoteRating)
  .all(controller.methodNotAllowed);

router
  .route("/ratings")
  .get(controller.listAllRatings)
  .all(controller.methodNotAllowed);

router
  .route("/ratings/:ratingId")
  .get(controller.readSpecificRating)
  .all(controller.methodNotAllowed);

module.exports = router;
