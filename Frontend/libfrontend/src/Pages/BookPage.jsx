import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./BookPage.css";

function BookPage() {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://127.0.0.1:8000/api/list_books/")
            .then(res => res.json())
            .then(data => setBooks(data));
    }, []);

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
    };

    return (
        <div className="books-page-container">

            <nav className="navbar">
                <div className="logo">📚 City Central Library</div>
                <div className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/books">Books</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Sign In</Link>
                </div>
            </nav>

            <div className="books-page-wrapper">
                <h2 className="books-page-title">All Books</h2>

                <div className="books-grid">
                    {books.map(book => (
                        <div
                            key={book.id}
                            className="book-card"
                            onClick={() => handleBookClick(book.id)}
                        >
                            {book.image_url ? (
                                <img
                                    src={book.image_url}
                                    alt={book.title}
                                    className="book-image"
                                />
                            ) : (
                                <div className="book-no-image">No Image</div>
                            )}

                            <h3>{book.title}</h3>
                            <p>Author: {book.author}</p>
                            <p>Category: {book.category}</p>

                            {/* ⭐ Average Rating */}
                            <p className="book-rating">
                                ⭐ {book.avg_rating} / 5
                            </p>

                            <p className={book.available_copies > 0 ? "available" : "not-available"}>
                                Available: {book.available_copies}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BookPage;