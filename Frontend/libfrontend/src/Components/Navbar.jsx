// function Navbar() {
//   return (
//     <div style={{ background: "#34495e", color: "white", padding: "15px" }}>
//       <h2>Admin Dashboard</h2>
//     </div>
//   );
// }

// export default Navbar;

import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const name = localStorage.getItem("user_name");

  const handleLogout = () => {

    fetch("http://127.0.0.1:8000/api/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {

      alert(data.message);

      localStorage.removeItem("user_id");
      localStorage.removeItem("user_name");

      navigate("/");
    });

  };

  return (
    <div className="navbar">

      <h2>Welcome {name} (Admin)</h2>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>

    </div>
  );
}

export default Navbar;