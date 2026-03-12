import { useEffect, useState } from "react";

function ApproveMembers() {
  const [pendingMembers, setPendingMembers] = useState([]);
  const [approvedMembers, setApprovedMembers] = useState([]);

  const fetchMembers = () => {
    // Fetch pending members
    fetch("https://fullstackproject1-1l7d.onrender.com/api/pending_members/")
      .then(res => res.json())
      .then(data => setPendingMembers(data))
      .catch(err => console.error("Error fetching pending members:", err));

    // Fetch approved members
    fetch("https://fullstackproject1-1l7d.onrender.com/api/approved_members/") // create this API if not yet
      .then(res => res.json())
      .then(data => setApprovedMembers(data))
      .catch(err => console.error("Error fetching approved members:", err));
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const approveMember = (id) => {
    // Only admin can approve, send admin_id in body if needed
    fetch(`https://fullstackproject1-1l7d.onrender.com/api/approve_member/${id}/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1 }) // assuming admin_id=1
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Member approved ✅");
        fetchMembers(); // Refresh lists
      })
      .catch(err => console.error("Error approving member:", err));
  };

  return (
    <div>
      <h2>Pending Members</h2>
      {pendingMembers.length === 0 ? (
        <p>No pending members.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingMembers.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>
                  <button onClick={() => approveMember(member.id)}>Approve</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Approved Members</h2>
      {approvedMembers.length === 0 ? (
        <p>No approved members.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {approvedMembers.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApproveMembers;