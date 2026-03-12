// // // import { useParams } from "react-router-dom";
// // // import { useEffect, useState } from "react";

// // // function BookDetail() {
// // //   const { id } = useParams();
// // //   const [book, setBook] = useState(null);

// // //   useEffect(() => {
// // //     fetch(`http://127.0.0.1:8000/api/book_detail/${id}/`) // Make sure this API exists
// // //       .then(res => res.json())
// // //       .then(data => setBook(data))
// // //       .catch(() => alert("Failed to load book details"));
// // //   }, [id]);

// // //   if (!book) return <p>Loading...</p>;

// // //   return (
// // //     <div style={{ padding: 20 }}>
// // //       <h2>{book.title}</h2>
// // //       <img
// // //         src={book.image ? `http://127.0.0.1:8000${book.image}` : "/default-book.png"}
// // //         alt={book.title}
// // //         style={{ width: 200 }}
// // //       />
// // //       <p><strong>Author:</strong> {book.author}</p>
// // //       <p><strong>Category:</strong> {book.category}</p>
// // //       <p><strong>Total Copies:</strong> {book.total_copies}</p>
// // //       <p><strong>Available Copies:</strong> {book.available_copies}</p>
// // //       {/* You can add request button and rating component here */}
// // //     </div>
// // //   );
// // // }

// // // export default BookDetail;

// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";

// // function BookDetail() {
// //   const { id } = useParams();
// //   const [book, setBook] = useState(null);

// //   useEffect(() => {
// //     fetch(`http://127.0.0.1:8000/api/book_detail/${id}/`) // Make sure API exists
// //       .then(res => res.json())
// //       .then(data => setBook(data))
// //       .catch(() => alert("Failed to load book details"));
// //   }, [id]);

// //   if (!book) return <p>Loading...</p>;

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h2>{book.title}</h2>
// //       <img
// //         src={book.image ? book.image : "/default-book.png"} // full URL from Django API
// //         alt={book.title}
// //         style={{ width: 200 }}
// //       />
// //       <p><strong>Author:</strong> {book.author}</p>
// //       <p><strong>Category:</strong> {book.category}</p>
// //       <p><strong>Total Copies:</strong> {book.total_copies}</p>
// //       <p><strong>Available Copies:</strong> {book.available_copies}</p>

// //       {/* Request book button */}
// //       {book.available_copies > 0 ? (
// //         <button>Request Book</button>
// //       ) : (
// //         <p>Not Available</p>
// //       )}

// //       {/* TODO: Add rating component */}
// //     </div>
// //   );
// // }

// // export default BookDetail;

// // import { useParams } from "react-router-dom";
// // import { useEffect, useState } from "react";
// // import "./BookDetail.css";

// // function BookDetail() {
// //   const { id } = useParams();
// //   const [book, setBook] = useState(null);
// //   const [rating, setRating] = useState(0);

// //   useEffect(() => {
// //     fetch(`http://127.0.0.1:8000/api/book_detail/${id}/`)
// //       .then(res => res.json())
// //       .then(data => setBook(data));
// //   }, [id]);

// //   const handleRequest = () => {
// //     const member_id = localStorage.getItem("user_id");
// //     if (!member_id) return alert("Please login as member");

// //     fetch("http://127.0.0.1:8000/api/request_book/", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ member_id: parseInt(member_id), book_id: id })
// //     })
// //       .then(res => res.json())
// //       .then(data => alert(data.message || data.error));
// //   };

// //   const handleRating = () => {
// //     const member_id = localStorage.getItem("user_id");
// //     if (!member_id) return alert("Please login as member");

// //     fetch("http://127.0.0.1:8000/api/rate_book/", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ member_id: parseInt(member_id), book_id: id, rating })
// //     })
// //       .then(res => res.json())
// //       .then(data => alert(data.message || data.error));
// //   };

// //   if (!book) return <p>Loading...</p>;

// //   return (
// //     <div style={{ padding: 20 }}>
// //       <h2>{book.title}</h2>
// //       <img
// //         src={book.image_url || "/default-book.png"}
// //         alt={book.title}
// //         style={{ width: 200 }}
// //       />
// //       <p><strong>Author:</strong> {book.author}</p>
// //       <p><strong>Category:</strong> {book.category}</p>
// //       <p><strong>Total Copies:</strong> {book.total_copies}</p>
// //       <p><strong>Available Copies:</strong> {book.available_copies}</p>

// //       {book.available_copies > 0 && (
// //         <button onClick={handleRequest} style={{ margin: "10px 0" }}>
// //           Request Book
// //         </button>
// //       )}

// //       <div>
// //         <label>Rate this book: </label>
// //         <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
// //           <option value={0}>Select rating</option>
// //           <option value={1}>⭐ 1</option>
// //           <option value={2}>⭐⭐ 2</option>
// //           <option value={3}>⭐⭐⭐ 3</option>
// //           <option value={4}>⭐⭐⭐⭐ 4</option>
// //           <option value={5}>⭐⭐⭐⭐⭐ 5</option>
// //         </select>
// //         <button onClick={handleRating} style={{ marginLeft: 10 }}>Submit Rating</button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default BookDetail;


// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./BookDetail.css";

// function BookDetail() {
//   const { id } = useParams();
//   const [book, setBook] = useState(null);
//   const [rating, setRating] = useState(0);

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/book_detail/${id}/`)
//       .then(res => res.json())
//       .then(data => setBook(data));
//   }, [id]);

//   const handleRequest = () => {
//     const member_id = localStorage.getItem("user_id");
//     if (!member_id) return alert("Please login as member");

//     fetch("http://127.0.0.1:8000/api/request_book/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ member_id: parseInt(member_id), book_id: id })
//     })
//       .then(res => res.json())
//       .then(data => alert(data.message || data.error));
//   };

//   const handleRating = () => {
//     const member_id = localStorage.getItem("user_id");
//     if (!member_id) return alert("Please login as member");

//     fetch("http://127.0.0.1:8000/api/rate_book/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ member_id: parseInt(member_id), book_id: id, rating })
//     })
//       .then(res => res.json())
//       .then(data => alert(data.message || data.error));
//   };

//   if (!book) return <p>Loading...</p>;

//   return (
//     <div className="book-detail-container">
//       <img
//         src={book.image_url || "/default-book.png"}
//         alt={book.title}
//         className="book-detail-image"
//       />
//       <div className="book-detail-info">
//         <h2>{book.title}</h2>
//         <p><strong>Author:</strong> {book.author}</p>
//         <p><strong>Category:</strong> {book.category}</p>
//         <p><strong>Total Copies:</strong> {book.total_copies}</p>
//         <p><strong>Available Copies:</strong> {book.available_copies}</p>

//         {book.available_copies > 0 && (
//           <button className="request-book-btn" onClick={handleRequest}>
//             Request Book
//           </button>
//         )}

//         <div className="book-rating">
//           <label>Rate this book: </label>
//           <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
//             <option value={0}>Select rating</option>
//             <option value={1}>⭐ 1</option>
//             <option value={2}>⭐⭐ 2</option>
//             <option value={3}>⭐⭐⭐ 3</option>
//             <option value={4}>⭐⭐⭐⭐ 4</option>
//             <option value={5}>⭐⭐⭐⭐⭐ 5</option>
//           </select>
//           <button onClick={handleRating} style={{ marginLeft: 10 }}>Submit</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookDetail;

// import { useParams, useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import "./BookDetail.css";

// function BookDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [book, setBook] = useState(null);
//   const [rating, setRating] = useState(0); // current selected rating

//   useEffect(() => {
//     fetch(`http://127.0.0.1:8000/api/book_detail/${id}/`)
//       .then(res => res.json())
//       .then(data => setBook(data));
//   }, [id]);

//   const handleRequest = () => {
//   const member_id = localStorage.getItem("user_id");

//   if (!member_id) {
//     alert("Please login as member");
//     navigate("/login");   // redirect to login
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/request_book/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ member_id: parseInt(member_id), book_id: id })
//   })
//   .then(res => res.json())
//   .then(data => alert(data.message || data.error));
// };
// const submitRating = (rate) => {
//   const member_id = localStorage.getItem("user_id");

//   if (!member_id) {
//     alert("Please login as member");
//     navigate("/login", { state: { from: `/book/${id}` } });
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/rate_book/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       member_id: parseInt(member_id),
//       book_id: id,
//       rating: rate
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     alert(data.message || data.error);
//     setRating(rate);
//   });
// };

//   return (
//     <div className="book-detail-container">
//       <img
//         src={book.image_url || "/default-book.png"}
//         alt={book.title}
//         className="book-detail-image"
//       />
//       <div className="book-detail-info">
//         <h2>{book.title}</h2>
//         <p><strong>Author:</strong> {book.author}</p>
//         <p><strong>Category:</strong> {book.category}</p>
//         <p><strong>Total Copies:</strong> {book.total_copies}</p>
//         <p><strong>Available Copies:</strong> {book.available_copies}</p>

//         {book.available_copies > 0 && (
//           <button className="request-book-btn" onClick={handleRequest}>
//             Request Book
//           </button>
//         )}

//         <div className="book-rating">
//           <span>Rate this book:</span>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <span
//               key={star}
//               className={`star ${star <= rating ? "filled" : ""}`}
//               onClick={() => submitRating(star)}
//             >
//               ★
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookDetail;


import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./BookDetail.css";

function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/book_detail/${id}/`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  // ⭐ Prevent crash before API loads
  if (!book) return <p>Loading...</p>;

  // const handleRequest = () => {
  //   const member_id = localStorage.getItem("user_id");

  //   if (!member_id) {
  //     alert("Please login as member");
  //     navigate("/login", { state: { from: `/book/${id}` } });
  //     return;
  //   }

  //   fetch("http://127.0.0.1:8000/api/request_book/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       member_id: parseInt(member_id),
  //       book_id: id
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => alert(data.message || data.error));
  // };

//   const handleRequest = () => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const member_id = localStorage.getItem("user_id");

//   if (!isLoggedIn || !member_id) {
//     alert("Please login as member");
//     navigate("/login", { state: { from: `/book/${id}` } });
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/request_book/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       member_id: parseInt(member_id),
//       book_id: parseInt(id)
//     })
//   })
//   .then(res => res.json())
//   .then(data => alert(data.message || data.error));
// };

  // const submitRating = (rate) => {
  //   const member_id = localStorage.getItem("user_id");

  //   if (!member_id) {
  //     alert("Please login as member");
  //     navigate("/login", { state: { from: `/book/${id}` } });
  //     return;
  //   }

  //   fetch("http://127.0.0.1:8000/api/rate_book/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       member_id: parseInt(member_id),
  //       book_id: parseInt(id),
  //       rating: rate
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       alert(data.message || data.error);
  //       setRating(rate);
  //     });
  // };
//   const handleRequest = () => {
//   const member_id = localStorage.getItem("user_id");

//   if (!member_id) {
//     alert("Please login as member");
//     navigate("/login", { state: { from: `/book/${id}` } });
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/request_book/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       member_id: parseInt(member_id),
//       book_id: parseInt(id)
//     })
//   })
//   .then(res => res.json())
//   .then(data => alert(data.message || data.error));
// };

//   const submitRating = (rate) => {
//   const isLoggedIn = localStorage.getItem("isLoggedIn");
//   const member_id = localStorage.getItem("user_id");

//   if (!isLoggedIn || !member_id) {
//     alert("Please login as member");
//     navigate("/login", { state: { from: `/book/${id}` } });
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/rate_book/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       member_id: parseInt(member_id),
//       book_id: parseInt(id),
//       rating: rate
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     alert(data.message || data.error);
//     setRating(rate);
//   });
// };

// const submitRating = (rate) => {
//   const member_id = localStorage.getItem("user_id");

//   if (!member_id) {
//     alert("Please login as member");
//     navigate("/login", { state: { from: `/book/${id}` } });
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/rate_book/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       member_id: parseInt(member_id),
//       book_id: parseInt(id),
//       rating: rate
//     })
//   })
//   .then(res => res.json())
//   .then(data => {
//     alert(data.message || data.error);
//     setRating(rate);
//   });
// };

const handleRequest = () => {
  const member_id = localStorage.getItem("user_id");
  const role = localStorage.getItem("role");

  if (!member_id || role !== "member") {
    alert("Please login as member");
    navigate("/login", { state: { from: `/book/${id}` } });
    return;
  }

  fetch("http://127.0.0.1:8000/api/request_book/", {
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

  fetch("http://127.0.0.1:8000/api/rate_book/", {
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
      </div>
    </div>
  );
}

export default BookDetail;