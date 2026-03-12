
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://fullstackproject1-1l7d.onrender.com/api/books/${id}/`)
      .then(res => res.json())
      .then(data => setBook(data));
  }, [id]);

  const requestBook = async () => {
    const member_id = localStorage.getItem("member_id");

    const response = await fetch("http://127.0.0.1:8000/api/request_book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id,
        book_id: id
      })
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Available Copies: {book.available_copies}</p>

      {book.available_copies > 0 ? (
        <button onClick={requestBook}>Request Issue</button>
      ) : (
        <p>No Copies Available</p>
      )}
    </div>
  );
}

export default BookDetail;