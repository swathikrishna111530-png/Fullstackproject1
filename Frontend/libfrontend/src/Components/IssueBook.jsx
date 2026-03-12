import { useEffect, useState } from "react";

function IssueBooks() {
  const [requests, setRequests] = useState([]);
  const user_id = localStorage.getItem("user_id"); // admin ID

  // Load pending book requests
  const loadRequests = () => {
    fetch(`http://127.0.0.1:8000/api/pending_requests/?user_id=${user_id}`)
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(() => alert("Failed to load pending requests"));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // Issue a book to a member
  // const handleIssue = (request_id) => {
  //   fetch(`http://127.0.0.1:8000/api/issue_book/${request_id}/`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ user_id })
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if (data.error) alert(data.error);
  //       else {
  //         alert(data.message);
  //         loadRequests(); // refresh the pending requests list
  //       }
  //     });
  // };

//   const handleIssue = (member_id, book_id) => {
//   fetch("http://127.0.0.1:8000/api/issue_book/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ member_id, book_id }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.message) alert(data.message);
//       else if (data.error) alert(data.error);
//     })
//     .catch(() => alert("Issue request failed"));
// };
// const handleIssue = (book_id) => {
//   const member_id = localStorage.getItem("user_id"); // <-- get logged-in user

//   if (!member_id) {
//     alert("Member ID not found!");
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/issue_book/", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ member_id, book_id }),
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.message) alert(data.message);
//       else if (data.error) alert(data.error);
//     })
//     .catch(() => alert("Issue request failed"));
// };
// const handleIssue = (book_id) => {
//   const member_id = parseInt(localStorage.getItem("user_id")); // must match Member.id

//   if (!member_id) {
//     alert("Member ID not found!");
//     return;
//   }

//   fetch("http://127.0.0.1:8000/api/issue_book/", {
//     method: "POST",
//     headers: { 
//       "Content-Type": "application/json" 
//     },
//     body: JSON.stringify({ member_id, book_id }), // <-- must stringify
//   })
//     .then(res => res.json())
//     .then(data => {
//       if (data.message) alert(data.message);
//       else if (data.error) alert(data.error);
//     })
//     .catch(() => alert("Issue request failed"));
// };

const handleIssue = (member_id, book_id) => {
  fetch("https://fullstackproject1-1l7d.onrender.com/api/issue_book/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ member_id, book_id }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.message) {
        alert(data.message);
        loadRequests(); // refresh pending requests
      } else if (data.error) {
        alert(data.error);
      }
    })
    .catch(() => alert("Issue request failed"));
};
  return (
    <div style={{ padding: "20px" }}>
      <h2>Issue Books to Members</h2>

      {requests.length === 0 ? (
        <p>No pending book requests.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Member Name</th>
              <th>Requested At</th>
              <th>Available Copies</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.request_id}>
                <td>{req.book_title}</td>
                <td>{req.member_name}</td>
                <td>{new Date(req.requested_at).toLocaleString()}</td>
                <td>{req.available_copies}</td>
                <td>
                  <button
                    disabled={req.available_copies <= 0}
                    onClick={() => handleIssue(req.member_id, req.book_id)}
                  >
                    {req.available_copies > 0 ? "Issue Book" : "Not Available"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default IssueBooks;