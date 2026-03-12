


// import { useEffect, useState } from "react";

// function MyBooks() {
//   const [books, setBooks] = useState([]);
//   const member_id = localStorage.getItem("user_id");
//   console.log("Member ID:", member_id);

//   const fetchBooks = () => {
//     fetch(`http://127.0.0.1:8000/api/my_books/${member_id}/`)
//       .then(res => res.json())
//       .then(data => setBooks(data))
//       .catch(() => alert("Failed to load your books"));
//   };

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   // const handleReturn = (book_id) => {
//   //   if (!window.confirm("Are you sure you want to return this book?")) return;

//   //   fetch(`http://127.0.0.1:8000/api/return_book/`, {
//   //     method: "POST",
//   //     headers: {
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify({ member_id, book_id }),
//   //   })
//   //     .then(res => res.json())
//   //     .then(data => {
//   //       alert(data.message || "Book returned successfully!");
//   //       fetchBooks(); // refresh list
//   //     })
//   //     .catch(() => alert("Failed to return the book."));
//   // };
// const handleReturn = (book_id) => {
//   const member_id = localStorage.getItem("user_id");

//   fetch("http://127.0.0.1:8000/api/return_book/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       member_id: member_id,
//       book_id: book_id
//     }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.message) {
//         alert(data.message);
//         // Optionally remove the returned book from the table
//         setBooks(prev => prev.filter(b => b.book_id !== book_id));
//       } else if (data.error) {
//         alert(data.error);
//       }
//     })
//     .catch(() => alert("Return request failed"));
// };
//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>My Issued Books</h2>

//       {books.length === 0 ? (
//         <p>No books issued yet.</p>
//       ) : (
//         <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Author</th>
//               <th>Category</th>
//               <th>Issued At</th>
//               <th>Return Date</th>
//               <th>Action</th> {/* New column */}
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book.book_id}>
//                 <td>{book.title}</td>
//                 <td>{book.author}</td>
//                 <td>{book.category}</td>
//                 <td>{new Date(book.issued_at).toLocaleString()}</td>
//                 <td>{new Date(book.return_date).toLocaleDateString()}</td>
//                 <td>
//                   <button onClick={() => handleReturn(book.book_id)}>Return</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default MyBooks;


import { useEffect, useState } from "react";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const member_id = localStorage.getItem("user_id");

  const fetchBooks = () => {
    fetch(`https://fullstackproject1-1l7d.onrender.com/api/my_books/${member_id}/`)
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(() => alert("Failed to load your books"));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleReturn = (book_id) => {
    fetch("https://fullstackproject1-1l7d.onrender.com/api/return_book/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member_id, book_id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert(`${data.message}\nFine: ₹${data.fine || 0}`);
          setBooks(prev => prev.filter(b => b.book_id !== book_id));
        } else if (data.error) {
          alert(data.error);
        }
      })
      .catch(() => alert("Return request failed"));
  };

  // Function to calculate fine on frontend
  const calculateFine = (return_date) => {
    const today = new Date();
    const dueDate = new Date(return_date);
    if (today <= dueDate) return 0;

    const daysLate = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
    const fineUnits = Math.floor(daysLate / 10);
    return fineUnits * 10; // ₹10 per 10 days
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Issued Books</h2>

      {books.length === 0 ? (
        <p>No books issued yet.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Issued At</th>
              <th>Return Date</th>
              <th>Fine</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{new Date(book.issued_at).toLocaleString()}</td>
                <td>{new Date(book.return_date).toLocaleDateString()}</td>
                <td>₹{calculateFine(book.return_date)}</td>
                <td>
                  <button onClick={() => handleReturn(book.book_id)}>Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyBooks;