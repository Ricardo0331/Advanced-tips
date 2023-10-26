const path = require("path");
const notes = require(path.resolve("src/data/notes-data"));
const ratings = require(path.resolve("src/data/ratings-data"));

function create(req, res) {
  const { data: { text } = {} } = req.body;
  const newNote = {
    id: notes.length + 1,
    text,
  };
  notes.push(newNote);
  res.status(201).json({ data: newNote });
}

function destroy(req, res) {
  const { noteId } = req.params;
  const index = notes.findIndex((note) => note.id === Number(noteId));
  if (index > -1) {
    notes.splice(index, 1);
  }
  res.sendStatus(204);
}

function hasText(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next();
  }
  next({ status: 400, message: "A 'text' property is required." });
}

function list(req, res) {
  res.json({ data: notes });
}

function noteExists(req, res, next) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  if (foundNote) {
    return next();
  }
  next({
    status: 404,
    message: `Note id not found: ${req.params.noteId}`,
  });
}

function read(req, res) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  res.json({ data: foundNote });
}

function update(req, res) {
  const noteId = Number(req.params.noteId);
  const foundNote = notes.find((note) => note.id === noteId);
  const { data: { text } = {} } = req.body;
  foundNote.text = text;
  res.json({ data: foundNote });
}

function listNoteRatings(req, res, next) {
  const noteId = Number(req.params.noteId);
  const noteRatings = ratings.filter((rating) => rating.noteId === noteId);
  res.json({ data: noteRatings });
}

function readNoteRating(req, res, next) {
  const noteId = Number(req.params.noteId);
  const ratingId = Number(req.params.ratingId);
  const foundRating = ratings.find((rating) => rating.id === ratingId && rating.noteId === noteId);
  if (foundRating) {
    res.json({ data: foundRating });
  } else {
    next({
      status: 404,
      message: `Rating id not found for note: ${req.params.ratingId}`,
    });
  }
}

function listAllRatings(req, res, next) {
  res.json({ data: ratings });
}

function readSpecificRating(req, res, next) {
  const ratingId = Number(req.params.ratingId);
  const foundRating = ratings.find((rating) => rating.id === ratingId);
  if (foundRating) {
    res.json({ data: foundRating });
  } else {
    next({
      status: 404,
      message: `Rating id not found: ${req.params.ratingId}`,
    });
  }
}

function methodNotAllowed(req, res, next) {
  next({
    status: 405,
    message: `${req.method} not allowed for ${req.originalUrl}`,
  });
}

module.exports = {
  create: [hasText, create],
  list,
  read: [noteExists, read],
  update: [noteExists, hasText, update],
  delete: destroy,
  listNoteRatings,
  readNoteRating,
  listAllRatings,
  readSpecificRating,
  methodNotAllowed,
};
