//Node JS express configurations
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

//middleware
app.use(cors());
app.use(express.json());

//connect to bookstore db
mongoose.connect("mongodb://localhost:27017/bookstore");

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

app.listen(8080, () => console.log("Backend running on http://localhost:8080"));

