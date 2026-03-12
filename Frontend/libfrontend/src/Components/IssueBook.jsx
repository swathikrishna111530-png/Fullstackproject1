import { useEffect, useState } from "react";

function IssueBooks() {
  const [requests, setRequests] = useState([]);
  const user_id = localStorage.getItem("user_id"); // admin ID

  // Load pending book requests
  const loadRequests = () => {
    fetch(`https://fullstackproject1-1l7d.onrender.com/api/pending_requests/?user_id=${user_id}`)
      .then(res => res.json())
      .then(data => setRequests(data))
      .catch(() => alert("Failed to load pending requests"));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  

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