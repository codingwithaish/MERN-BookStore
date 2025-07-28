import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditBook() {
  const { id } = useParams();   //get params
  const navigate = useNavigate(); //allows redirecting

  //setBook is function
  //just like constructor, when v pass value,it initializes to 'book'
  //in that Book is like var and it's initial values r null
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
  });

  //Get the book details and setBook
  useEffect(() => {
    axios
      .get("http://localhost:8080/books/" + id)
      .then((res) => setBook(res.data));
  }, [id]);

  function handleChange(e) {
    //initializing chznges to newBook json
    const newBook = { ...book };
    //updating the change done 
    newBook[e.target.name] = e.target.value;
    setBook(newBook);
  }

  //write handleSubmit function
  function handleSubmit(e) {
    //to prevent page refresh by browser
    e.preventDefault();
    //to update books using put api
    axios.put("http://localhost:8080/books/" + id, book).then(() => {
      alert("Book updated");
      // go back to home page
      navigate("/");
    });
  }
  return (
    // connect handleSubmit
    <form onSubmit={handleSubmit}>
      <h3>Edit Book</h3>
      <input
        name="title"
        value={book.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <br />
      <br />
      <input
        name="author"
        value={book.author}
        onChange={handleChange}
        placeholder="Author"
      />{" "}
      <br />
      <br />
      <input
        name="price"
        value={book.price}
        onChange={handleChange}
        placeholder="Price"
        type="number"
      />
      <br />
      <br />
      <button>Update Book</button>
    </form>
  );
}

export default EditBook;
