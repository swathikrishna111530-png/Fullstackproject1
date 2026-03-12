
import { useParams, useNavigate , Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookDetail.css";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch(`https://fullstackproject1-1l7d.onrender.com/api/book_detail/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  // ⭐ Prevent crash before API loads
  if (!book) return <p>Loading...</p>;

  

  const handleRequest = () => {
    const member_id = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    if (!member_id || role !== "member") {
      alert("Please login as member");
      navigate("/login", { state: { from: `/book/${id}` } });
      return;
    }

    fetch("https://fullstackproject1-1l7d.onrender.com/api/request_book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id: parseInt(member_id),
        book_id: parseInt(id)
      })
    })
      .then(res => res.json())
      .then(data => alert(data.message || data.error));
  };

  const submitRating = (rate) => {
    const member_id = localStorage.getItem("user_id");
    const role = localStorage.getItem("role");

    if (!member_id || role !== "member") {
      alert("Please login as member");
      navigate("/login", { state: { from: `/book/${id}` } });
      return;
    }

    fetch("https://fullstackproject1-1l7d.onrender.com/api/rate_book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id: parseInt(member_id),
        book_id: parseInt(id),
        rating: rate
      })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || data.error);
        setRating(rate);
      });
  };

  return (
    <div className="book-detail-container">
      <img
        src={book.image_url || "/default-book.png"}
        alt={book.title}
        className="book-detail-image"
      />

      <div className="book-detail-info">
        <h2>{book.title}</h2>

        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Category:</strong> {book.category}</p>
        <p><strong>Total Copies:</strong> {book.total_copies}</p>
        <p><strong>Available Copies:</strong> {book.available_copies}</p>

        {book.available_copies > 0 && (
          <button className="request-book-btn" onClick={handleRequest}>
            Request Book
          </button>
        )}

        <div className="book-rating">
          <span>Rate this book:</span>

          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star ${star <= rating ? "filled" : ""}`}
              onClick={() => submitRating(star)}
            >
              ★
            </span>
          ))}
        </div>
        <p className="home-redirect">
          ← <Link to="/">Back to Home</Link>
        </p>

      </div>
    </div>
  );
}

export default BookDetail;