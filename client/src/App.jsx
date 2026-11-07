import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <div className="app">
      <header>
        <h1>📚 Bookstore</h1>

        <nav>
          <Link to="/">Books</Link>
          <Link to="/add">Add Book</Link>
        </nav>
      </header>

      <main>
        <div className="page-heading">
          <h2>Your Personal Library</h2>
          <p>Discover, collect, and manage your favorite books.</p>
        </div>

        <Routes>
          <Route path="/" element={<BookList />} />
          <Route path="/add" element={<AddBook />} />
          <Route path="/edit/:id" element={<EditBook />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

