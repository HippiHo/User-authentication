const express = require("express");

const router = express.Router();

const { validateUser } = require("../middleware/validation");

const {
  listBooks,
  addBook,
  getBook,
  updateBook,
  deleteBook
} = require("../controllers/booksController");

router
  .route("/")
  .get()
  .post();

router.route("/authenticate").post();

router.route("/signup").post();

router.route("/locations").get();

router.route("/check").get();

module.exports = router;
