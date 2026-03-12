

import { useState, useEffect } from "react";
import "./DonateBook.css";

function DonateBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [totalCopies, setTotalCopies] = useState(1);
  const [image, setImage] = useState(null); // image state

  const member_id = localStorage.getItem("user_id");

  // load categories
  useEffect(() => {
    fetch("https://fullstackproject1-1l7d.onrender.com/api/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !author || !category) {
      alert("Fill all fields!");
      return;
    }

    const formData = new FormData();
    formData.append("member", member_id);
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("total_copies", totalCopies);

    if (image) {
      formData.append("image", image);
    }

    fetch("https://fullstackproject1-1l7d.onrender.com/api/donate_book/", {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Book donated successfully!");

        // reset form
        setTitle("");
        setAuthor("");
        setCategory("");
        setTotalCopies(1);
        setImage(null);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="donatebook-container">
      <h2>Donate a Book</h2>

      <form onSubmit={handleSubmit}>

        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <input
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Author"
          required
        />

        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        >
          <option value="">--Select Category--</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={totalCopies}
          onChange={e => setTotalCopies(e.target.value)}
          placeholder="Copies"
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={e => setImage(e.target.files[0])}
        />

        <button type="submit">Donate</button>

      </form>
    </div>
  );
}

export default DonateBook;