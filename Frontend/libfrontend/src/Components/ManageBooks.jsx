// 

import { useState, useEffect } from "react";
import "./ManageBooks.css";

function ManageBooks() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const user_id = localStorage.getItem("user_id");

  // Load books
  const loadBooks = () => {
    fetch("https://fullstackproject1-1l7d.onrender.com/api/list_books/")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => alert("Failed to load books"));
  };

  // Load categories
  useEffect(() => {
    fetch("https://fullstackproject1-1l7d.onrender.com/api/categories/")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  useEffect(() => {
    loadBooks();
  }, []);

  // Delete book
  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    fetch(`https://fullstackproject1-1l7d.onrender.com/api/delete_book/${id}/?user_id=${user_id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        alert("Book deleted successfully");
        loadBooks();
      })
      .catch(() => alert("Delete failed"));
  };

  // Edit book
  const handleEdit = (book) => {
    setEditingBook({ ...book, category_id: book.category_id || "" });
  };

  // Update book
  const handleUpdate = () => {
    const confirmEdit = window.confirm("Are you sure you want to update this book?");
    if (!confirmEdit) return;

    fetch(`https://fullstackproject1-1l7d.onrender.com/api/update_book/${editingBook.id}/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id,
        title: editingBook.title,
        author: editingBook.author,
        category: editingBook.category_id,
        total_copies: editingBook.total_copies,
        available_copies: editingBook.available_copies
      })
    })
      .then(res => res.json())
      .then(() => {
        alert("Book updated successfully");
        setEditingBook(null);
        loadBooks();
      })
      .catch(() => alert("Update failed"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingBook({ ...editingBook, [name]: value });
  };

  return (
    <div className="managebooks-wrapper">
      <h2>Manage Books</h2>

      <div className="managebooks-container">
        {books.length === 0 ? (
          <p>No books available.</p>
        ) : (
          <table className="managebooks-table">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Total Copies</th>
                <th>Available Copies</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(b => (
                <tr key={b.id}>
                  {/* Display book cover */}
                  <td>
                    {b.image_url ? (
                      <img src={b.image_url} alt={b.title} width="80" />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{b.title}</td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{b.total_copies}</td>
                  <td>{b.available_copies}</td>
                  <td>
                    <button onClick={() => handleEdit(b)}>Edit</button>
                    <button onClick={() => handleDelete(b.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal / Form */}
      {editingBook && (
        <div className="managebooks-form">
          <h3>Edit Book</h3>
          <input name="title" value={editingBook.title} onChange={handleChange} placeholder="Title" />
          <input name="author" value={editingBook.author} onChange={handleChange} placeholder="Author" />
          <select name="category_id" value={editingBook.category_id} onChange={handleChange}>
            <option value="">--Select Category--</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <input type="number" name="total_copies" value={editingBook.total_copies} onChange={handleChange} placeholder="Total Copies" />
          <input type="number" name="available_copies" value={editingBook.available_copies} onChange={handleChange} placeholder="Available Copies" />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingBook(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageBooks;