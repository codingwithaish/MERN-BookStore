import { Routes, Route, Link } from "react-router-dom";
import BookList from "./pages/BookList";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";

function App() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📚 Bookstore App</h2>
      <nav className="mb-4" style={{ display: 'flex', gap: '18px', justifyContent: 'center' }}>
        <Link to="/" className="lux-btn lux-btn-dark">
          Books
        </Link>
        <Link to="/add" className="lux-btn lux-btn-gold">
          Add Book
        </Link>
      </nav>

      {/* Add appropriate component in element */}
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/add" element={<AddBook />} />
        <Route path="/edit/:id" element={<EditBook />} />
      </Routes>
    </div>
  );
}

export default App;
