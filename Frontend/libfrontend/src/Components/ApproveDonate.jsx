
import React, { useEffect, useState } from "react";
import axios from "axios";

function ApproveDonatedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending donated books
  const fetchPendingBooks = async () => {
    try {
      const res = await axios.get("https://fullstackproject1-1l7d.onrender.com/api/pending_donated_books/");
      console.log("Pending books:", res.data);
      setBooks(res.data);
    } catch (err) {
      console.error("Failed to fetch pending books:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingBooks();
  }, []);

  // Approve a book
  const approveBook = async (bookId) => {
    try {
      await axios.patch(`https://fullstackproject1-1l7d.onrender.com/api/approve_donated_book/${bookId}/`);
      alert("Book approved successfully!");
      setBooks((prevBooks) => prevBooks.filter((b) => b.id !== bookId));
    } catch (err) {
      console.error("Failed to approve book:", err);
      alert("Failed to approve book. Try again.");
    }
  };

  if (loading) return <p>Loading pending donations...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Pending Books for Approval</h2>

      {books.length === 0 ? (
        <p>No pending donated books.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Member</th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Total Copies</th>
              <th>Image</th> {/* ✅ New column for image */}
              <th>Submitted At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.member_name || "Unknown"}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category_name || "None"}</td>
                <td>{book.total_copies}</td>
                <td>
                  {book.image_url ? (
                    <img src={book.image_url} alt={book.title} width="80" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{new Date(book.submitted_at).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => approveBook(book.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApproveDonatedBooks;