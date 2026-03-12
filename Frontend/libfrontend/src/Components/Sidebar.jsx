import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>

      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/dashboard/add-book">Add Book</Link></li>
        <li><Link to="/dashboard/manage-books">Manage Books</Link></li>
        <li><Link to="/dashboard/approve-members">Approve Members</Link></li>
        <li><Link to="/dashboard/issue-book">Issue Book</Link></li>
        <Link to="/dashboard/approve-donations">Approve Donations</Link> {/* ✅ New button */}
      </ul>
    </div>
  );
}

export default Sidebar;