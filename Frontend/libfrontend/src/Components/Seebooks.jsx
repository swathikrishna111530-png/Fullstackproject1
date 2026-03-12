// import { useEffect, useState } from "react";
// import "./Seebooks.css";

// function ViewBooks() {
//   const [books, setBooks] = useState([]);
//   const [selectedBook, setSelectedBook] = useState(null);

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/api/list_books/")
//       .then(res => res.json())
//       .then(data => setBooks(data))
//       .catch(() => alert("Failed to load books"));
//   }, []);

//   const handleSelectBook = (book) => setSelectedBook(book);

//   const requestBook = async () => {
//     if (!selectedBook) return;

//     const member_id = localStorage.getItem("user_id");
//     if (!member_id) return alert("Member not logged in");

//     const response = await fetch("http://127.0.0.1:8000/api/request_book/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         member_id: parseInt(member_id),
//         book_id: selectedBook.id
//       })
//     });

//     const data = await response.json();
//     alert(data.message || data.error);
//   };

//   return (
//     <div className="books-container">
//       <h2 className="books-title">Available Books</h2>

//       <div className="table-wrapper">
//         {books.length === 0 ? (
//           <p className="no-books">No books available.</p>
//         ) : (
//           <table className="books-table">
//             <thead>
//               <tr>
//                 <th>Title</th>
//                 <th>Author</th>
//                 <th>Category</th>
//                 <th>Total Copies</th>
//                 <th>Available Copies</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {books.map((book) => (
//                 <tr key={book.id}>
//                   <td>{book.title}</td>
//                   <td>{book.author}</td>
//                   <td>{book.category}</td>
//                   <td>{book.total_copies}</td>
//                   <td className={book.available_copies > 0 ? "available" : "not-available"}>
//                     {book.available_copies}
//                   </td>
//                   <td>
//                     <button
//                       className="select-btn"
//                       disabled={book.available_copies <= 0}
//                       onClick={() => handleSelectBook(book)}
//                     >
//                       {book.available_copies > 0 ? "Select" : "Not Available"}
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {selectedBook && (
//         <div className="selected-book-card">
//           <h3>Selected Book</h3>
//           <p><strong>Title:</strong> {selectedBook.title}</p>
//           <p><strong>Author:</strong> {selectedBook.author}</p>
//           <p><strong>Category:</strong> {selectedBook.category}</p>
//           <p><strong>Available:</strong> {selectedBook.available_copies}</p>
//           {selectedBook.available_copies > 0 ? (
//             <button className="request-btn" onClick={requestBook}>
//               Request Issue
//             </button>
//           ) : (
//             <p className="not-available-text">No Copies Available</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewBooks;

import { useEffect, useState } from "react";
import "./Seebooks.css";

function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("https://fullstackproject1-1l7d.onrender.com/api/list_books/")
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => alert("Failed to load books"));
  }, []);

  const handleSelectBook = (book) => setSelectedBook(book);

  const requestBook = async () => {
    if (!selectedBook) return;

    const member_id = localStorage.getItem("user_id");
    if (!member_id) return alert("Member not logged in");

    const response = await fetch("https://fullstackproject1-1l7d.onrender.com/api/request_book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        member_id: parseInt(member_id),
        book_id: selectedBook.id
      })
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <div className="books-container">
      <h2 className="books-title">Available Books</h2>

      <div className="table-wrapper">
        {books.length === 0 ? (
          <p className="no-books">No books available.</p>
        ) : (
          <table className="books-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Total Copies</th>
                <th>Available Copies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>
                    {book.image_url ? (
                      <img
                        src={book.image_url}
                        alt={book.title}
                        style={{ width: "50px", height: "70px", objectFit: "cover" }}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.total_copies}</td>
                  <td className={book.available_copies > 0 ? "available" : "not-available"}>
                    {book.available_copies}
                  </td>
                  <td>
                    <button
                      className="select-btn"
                      disabled={book.available_copies <= 0}
                      onClick={() => handleSelectBook(book)}
                    >
                      {book.available_copies > 0 ? "Select" : "Not Available"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedBook && (
        <div className="selected-book-card">
          {selectedBook.image_url ? (
            <img
              src={selectedBook.image_url}
              alt={selectedBook.title}
              style={{ width: "100px", height: "150px", objectFit: "cover", marginBottom: "10px" }}
            />
          ) : (
            <p>No Image Available</p>
          )}
          <h3>Selected Book</h3>
          <p><strong>Title:</strong> {selectedBook.title}</p>
          <p><strong>Author:</strong> {selectedBook.author}</p>
          <p><strong>Category:</strong> {selectedBook.category}</p>
          <p><strong>Available:</strong> {selectedBook.available_copies}</p>
          {selectedBook.available_copies > 0 ? (
            <button className="request-btn" onClick={requestBook}>
              Request Issue
            </button>
          ) : (
            <p className="not-available-text">No Copies Available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewBooks;