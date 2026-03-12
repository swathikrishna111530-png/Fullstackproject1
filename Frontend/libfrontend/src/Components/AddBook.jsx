// import { useState, useEffect } from "react";
// import "./AddBook.css"; // CSS included here

// function AddBook() {
//   const [title, setTitle] = useState("");
//   const [author, setAuthor] = useState("");
//   const [category, setCategory] = useState("");
//   const [totalCopies, setTotalCopies] = useState(5);
//   const [availableCopies, setAvailableCopies] = useState(5);
//   const [categories, setCategories] = useState([]);

//   // Load categories from backend
//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/categories/")
//       .then(res => res.json())
//       .then(data => setCategories(data));
//   }, []);

//   const handleAddBook = (e) => {
//     e.preventDefault();

//     const user_id = localStorage.getItem("user_id");
//     if (!user_id) {
//       alert("Admin not logged in");
//       return;
//     }

//     if (!title || !author || !category) {
//       alert("Please fill all required fields");
//       return;
//     }

//     fetch("http://127.0.0.1:8000/api/add_book/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         title,
//         author,
//         category,
//         total_copies: Number(totalCopies),
//         available_copies: Number(availableCopies),
//         user_id
//       }),
//     })
//       .then(res => res.json())
//       .then(data => {
//         if (data.error) alert(data.error);
//         else {
//           alert(data.message);
//           setTitle(""); setAuthor(""); setCategory(""); setTotalCopies(5); setAvailableCopies(5);
//         }
//       });
//   };

//   return (
//     <div className="addbook-wrapper">
//       <div className="addbook-container">
//         <h2 className="addbook-title">Add Book</h2>
//         <form className="addbook-form" onSubmit={handleAddBook}>
//           <input
//             placeholder="Title"
//             value={title}
//             onChange={e => setTitle(e.target.value)}
//             required
//           />
//           <input
//             placeholder="Author"
//             value={author}
//             onChange={e => setAuthor(e.target.value)}
//             required
//           />
//           <select
//             value={category}
//             onChange={e => setCategory(e.target.value)}
//             required
//           >
//             <option value="">--Select Category--</option>
//             {categories.map(c => (
//               <option key={c.id} value={c.id}>{c.name}</option>
//             ))}
//           </select>
//           <input
//             type="number"
//             min="1"
//             value={totalCopies}
//             onChange={e => setTotalCopies(e.target.value)}
//             required
//           />
//           <input
//             type="number"
//             min="0"
//             value={availableCopies}
//             onChange={e => setAvailableCopies(e.target.value)}
//             required
//           />
//           <button type="submit" className="submit-btn">Add Book</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddBook;


import { useState, useEffect } from "react";
import "./AddBook.css"; // Your CSS file

function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [totalCopies, setTotalCopies] = useState(5);
  const [availableCopies, setAvailableCopies] = useState(5);
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState(null); // ✅ Image state

  // Load categories from backend
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/categories/")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.log(err));
  }, []);

  const handleAddBook = (e) => {
    e.preventDefault();

    const user_id = localStorage.getItem("user_id"); // Admin ID
    if (!user_id) {
      alert("Admin not logged in");
      return;
    }

    if (!title || !author || !category) {
      alert("Please fill all required fields");
      return;
    }

    // ✅ Use FormData to handle file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("category", category);
    formData.append("total_copies", totalCopies);
    formData.append("available_copies", availableCopies);
    formData.append("user_id", user_id);
    if (image) formData.append("image", image);

    fetch("http://127.0.0.1:8000/api/add_book/", {
      method: "POST",
      body: formData, // ✅ FormData automatically sets correct headers
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) alert(data.error);
        else {
          alert(data.message);
          // Reset form
          setTitle("");
          setAuthor("");
          setCategory("");
          setTotalCopies(5);
          setAvailableCopies(5);
          setImage(null);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="addbook-wrapper">
      <div className="addbook-container">
        <h2 className="addbook-title">Add Book</h2>
        <form className="addbook-form" onSubmit={handleAddBook}>
          <input
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="Author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            required
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="">--Select Category--</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={totalCopies}
            onChange={e => setTotalCopies(e.target.value)}
            required
          />
          <input
            type="number"
            min="0"
            value={availableCopies}
            onChange={e => setAvailableCopies(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={e => setImage(e.target.files[0])} // store selected image
          />
          <button type="submit" className="submit-btn">Add Book</button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;