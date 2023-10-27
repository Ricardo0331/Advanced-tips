const path = require("path");
const ratings = require(path.resolve("src/data/ratings-data"));

function list(req, res) {
  res.json({ data: ratings });
}

function read(req, res) {
  const { ratingId } = req.params;
  const foundRating = ratings.find((rating) => rating.id === Number(ratingId));

  if (foundRating) {
    res.json({ data: foundRating });
  } else {
    res.status(404).json({ error: "Rating ID not found" });
  }
}

module.exports = {
  list,
  read,
};
