import { Link } from "react-router-dom";

function MemberSidebar() {
  return (
    <div className="sidebar">
      <h2>Member Panel</h2>

      <ul>
        <li><Link to="/member">Dashboard</Link></li>
        <li><Link to="/member/view-books">View Books</Link></li>
        <li><Link to="/member/my-books">My Books</Link></li>
        <li><Link to="/member/return-book">Return Book</Link></li>
      </ul>
    </div>
  );
}

export default MemberSidebar;