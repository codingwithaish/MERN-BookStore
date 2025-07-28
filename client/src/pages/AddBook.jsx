import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const [book, setBook] = useState({ title: "", author: "", price: "" });
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    const updatedBook = { ...book };
    updatedBook[e.target.name] = e.target.value;
    setBook(updatedBook);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.price) {
      alert("Please fill in all fields");
      return;
    }
    axios
      .post("http://localhost:8080/books/", book)  //pass JSON book
      .then(() => {
        alert("Book added successfully");
        navigate("/");
      })
      .catch((err) => {
        console.log("Error in adding book", err);
        alert("Something went wrong");
      });
  };

  return (
    <div className="container mt-4">
      <h3>Add New Book</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Title"
          className="form-control mb-2"
        />
        <input
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
          className="form-control mb-2"
        />
        <input
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="form-control mb-2"
        />
        <button className="btn btn-success">Add Book</button>
      </form>
    </div>
  );
}

export default AddBook;
