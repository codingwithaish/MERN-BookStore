const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/bookstore";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

const corsOptions =
  CORS_ORIGIN === "*"
    ? {}
    : {
        origin: CORS_ORIGIN.split(",").map((origin) => origin.trim()),
      };

app.use(cors(corsOptions));
app.use(express.json());

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  price: Number,
});

const Book = mongoose.model("Book", bookSchema);

//get all books
app.get("/books", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

//get one book
app.get("/books/:id", async (req, res) => {
  try{
    const book = await Book.findById(req.params.id);
    res.json(book);
  }catch(err) {
    console.log(err);
    res.status(404).send('Book not found');
  }
});

//create new book
app.post("/books", async (req, res) => {
  try{
    const newBook = new Book(req.body);
    await newBook.save();  //Saves this document by inserting a new document into the database
    res.status(201).send('Book added');
  }catch(err) {
    console.log(err);
    res.status(500).send('Error adding book');
  }
});

//update a book
app.put("/books/:id", async (req, res) => {
  try{
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).send("Book updated");
  }catch(err) {
    console.log(err);
    res.status(500).send('Update failed');
  }
});

//delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(201).send("Book deleted");
  } catch (err) {
    console.log(err);
    res.status(500).send("Delete failed");
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
