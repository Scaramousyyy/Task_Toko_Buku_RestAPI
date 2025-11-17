const express = require("express");
const path = require("path");

const logger = require("./middleware/logger");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
const PORT = 3000;

// Middleware built-in
app.use(express.json());

// Custom logger middleware
app.use(logger);

// Menyajikan folder image
app.use("/images", express.static(path.join(__dirname, "images")));

// Route Buku
app.use("/books", bookRoutes);

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err.message);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
