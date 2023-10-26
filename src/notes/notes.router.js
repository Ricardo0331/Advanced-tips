const router = require("express").Router();
const controller = require("./notes.controller");

function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}


router
  .route("/:noteId")
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

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
