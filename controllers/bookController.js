const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "../data/books.json");

exports.getBooks = (req, res) => {
  res.json(books);
};

exports.getBookById = (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find(b => b.id === id);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  res.json(book);
};

exports.createBook = (req, res) => {
  const books = loadBooks();

  const { title, author } = req.body;

  const newBook = {
    id: getAvailableId(books),
    title,
    author,
    image: req.file ? req.file.filename : null
  };

  books.push(newBook);
  saveBooks(books);

  res.status(201).json(newBook);
};

exports.updateBook = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, author } = req.body;

  const bookIndex = books.findIndex(b => b.id === id);

  if (bookIndex === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  books[bookIndex] = {
    id,
    title: title || books[bookIndex].title,
    author: author || books[bookIndex].author,
    image: req.file ? req.file.filename : books[bookIndex].image
  };

  res.json(books[bookIndex]);
};

exports.deleteBook = (req, res) => {
  const id = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Book not found" });
  }

  const deleted = books.splice(index, 1);

  res.json({
    message: "Book deleted successfully",
    data: deleted[0]
  });
};

function getAvailableId(books) {
  if (books.length === 0) return 1;

  const usedIds = books.map(b => b.id).sort((a, b) => a - b);

  let expectedId = 1;
  for (const id of usedIds) {
    if (id !== expectedId) {
      return expectedId;
    }
    expectedId++;
  }

  return expectedId;
}

function loadBooks() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

function saveBooks(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), "utf-8");
}