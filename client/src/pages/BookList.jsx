import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import "./BookList.css";

function BookList() {
  const [books, setBooks] = useState([]);  
  //1st, create a st var i.e books, use [] to initialize books & later update array with books

  //this is delete book button click handler
  const deleteBook = (id) => {
    api.delete(`/books/${id}`).then(() => {
      //update home page view i.e after deletion remove from array
      setBooks(books.filter((b) => b._id !== id));
    });
  };

  useEffect(() => {
    api
      .get("/books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div className="booklist-container">
      <h3>Book List</h3>
      <div className="book-card-container">
        {books.map((book) => (
          // fill the values
          <div className="book-card" key={book._id}>
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
            <div className="book-price">Price: ₹{book.price}</div>
            <div className="book-actions">
              {/* template expr */}
              <Link to={`/edit/${book._id}`}>Edit</Link>
              {/* connect delete onClick handler */}
              <button onClick={() => deleteBook(book._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;
