let books = [
  { id: 1, title: "Matahari", author: "Tere Liye", image: null }
];

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
  const { title, author } = req.body;

  const newBook = {
    id: books.length + 1,
    title,
    author,
    image: req.file ? req.file.filename : null
  };

  books.push(newBook);

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
