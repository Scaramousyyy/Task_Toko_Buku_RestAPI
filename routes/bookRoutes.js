const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const validateBook = require("../middleware/validateBook");

const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// GET all books
router.get("/", getBooks);

// GET book by ID
router.get("/:id", getBookById);

// POST book + upload image + validation
router.post("/", upload.single("cover"), validateBook, createBook);

// PUT update book
router.put("/:id", upload.single("cover"), updateBook);

// DELETE book
router.delete("/:id", deleteBook);

module.exports = router;
