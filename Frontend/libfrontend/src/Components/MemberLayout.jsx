// // import { Routes, Route, Link } from "react-router-dom";
// // import MemberDashboard from "./MemberDashboard";
// // import Seebooks from "./Seebooks";
// // import MyBooks from "./MyBooks";
// // import "./Memberlayout.css";

// // function MemberLayout() {
// //   return (
// //     <div className="member-container">

// //       {/* Member Panel */}
// //       <div className="member-panel">
// //         <h1>Welcome to Member Panel</h1>
// //       </div>

// //       {/* Navigation Buttons */}
// //       <div className="member-buttons">
// //         <Link to="view-books">
// //           <button className="member-btn">View Books</button>
// //         </Link>

// //         <Link to="my-books">
// //           <button className="member-btn">My Books</button>
// //         </Link>
// //       </div>

// //       {/* Content */}
// //       <div className="member-content">
// //         <Routes>
// //           <Route index element={<MemberDashboard />} />
// //           <Route path="view-books" element={<Seebooks />} />
// //           <Route path="my-books" element={<MyBooks />} />
// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MemberLayout;

// // import { Routes, Route, Link } from "react-router-dom";
// // import MemberDashboard from "./MemberDashboard";
// // import Seebooks from "./Seebooks";
// // import MyBooks from "./MyBooks";
// // import "./Memberlayout.css";

// // function MemberLayout() {
// //   return (
// //     <div className="admin-container">

// //       {/* Member Panel */}
// //       <div className="member-panel">
// //         <h2>Welcome to Member Panel</h2>
// //       </div>

// //       {/* Buttons */}
// //       <div className="member-buttons">
// //         <Link to="view-books">
// //           <button className="member-btn">View Books</button>
// //         </Link>

// //         <Link to="my-books">
// //           <button className="member-btn">My Books</button>
// //         </Link>
// //       </div>

// //       {/* Page Content */}
// //       <div className="admin-content">
// //         <Routes>
// //           <Route index element={<MemberDashboard />} />
// //           <Route path="view-books" element={<Seebooks />} />
// //           <Route path="my-books" element={<MyBooks />} />
// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MemberLayout;

// // import { Routes, Route, Link } from "react-router-dom";
// // import MemberDashboard from "./MemberDashboard";
// // import Seebooks from "./Seebooks";
// // import MyBooks from "./MyBooks";
// // import "./Memberlayout.css";

// // function MemberLayout() {
// //   return (
// //     <div className="admin-container">

// //       {/* Member Panel */}
// //       <div className="member-panel">
// //         <h2>Member Panel</h2>
// //       </div>

// //       {/* Vertical Menu */}
// //       <div className="member-menu">
// //         <Link to="view-books" className="menu-btn">View Books</Link>
// //         <Link to="my-books" className="menu-btn">My Books</Link>
// //       </div>

// //       {/* Content Area */}
// //       <div className="admin-content">
// //         <Routes>
// //           <Route index element={<MemberDashboard />} />
// //           <Route path="view-books" element={<Seebooks />} />
// //           <Route path="my-books" element={<MyBooks />} />
// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MemberLayout;


// // import { Routes, Route, Link } from "react-router-dom";
// // import MemberDashboard from "./MemberDashboard";
// // import Seebooks from "./Seebooks";
// // import MyBooks from "./MyBooks";
// // import "./Memberlayout.css";

// // function MemberLayout() {
// //   return (
// //     <div className="member-container">

// //       <div className="member-header">
// //         <h2>Member Panel</h2>
// //       </div>

// //       <div className="member-buttons">
// //         <Link to="/member/view-books" className="btn">View Books</Link>
// //         <Link to="/member/my-books" className="btn">My Books</Link>
// //       </div>

// //       <div className="member-content">
// //         <Routes>
// //           <Route index element={<MemberDashboard />} />
// //           <Route path="view-books" element={<Seebooks />} />
// //           <Route path="my-books" element={<MyBooks />} />
// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MemberLayout;

// // import { Routes, Route, Link } from "react-router-dom";
// // import MemberDashboard from "./MemberDashboard";
// // import Seebooks from "./Seebooks";
// // import MyBooks from "./MyBooks";
// // import "./Memberlayout.css";

// // function MemberLayout() {
// //   return (
// //     <div className="member-container">

// //       <div className="member-header">
// //         <h1>Welcome to Member Dashboard</h1>
// //       </div>

// //       <div className="member-buttons">
// //         <Link to="/member/view-books" className="btn">View Books</Link>
// //         <Link to="/member/my-books" className="btn">My Books</Link>
// //       </div>

// //       <div className="member-content">
// //         <Routes>
// //           <Route index element={<MemberDashboard />} />
// //           <Route path="view-books" element={<Seebooks />} />
// //           <Route path="my-books" element={<MyBooks />} />
// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MemberLayout;

// // import { Routes, Route, Link, useNavigate } from "react-router-dom";
// // import MemberDashboard from "./MemberDashboard";
// // import Seebooks from "./Seebooks";
// // import MyBooks from "./MyBooks";
// // import "./Memberlayout.css";

// // function MemberLayout() {

// //   const navigate = useNavigate();
// //   const name = localStorage.getItem("user_name");

// //   const handleLogout = () => {

// //     fetch("http://127.0.0.1:8000/api/logout/", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json"
// //       }
// //     })
// //       .then(res => res.json())
// //       .then(data => {
// //         alert(data.message);

// //         localStorage.removeItem("user_id");
// //         localStorage.removeItem("user_name");

// //         navigate("/");
// //       });
// //   };

// //   return (
// //     <div className="member-container">

// //       {/* Header */}
// //       <div className="member-header">
// //         <h2>Welcome {name} to Member Dashboard</h2>

// //         <p className="quote">
// //           "Reading is to the mind what exercise is to the body."
// //         </p>

// //         <button className="logout-btn" onClick={handleLogout}>
// //           Logout
// //         </button>
// //       </div>

// //       {/* Navigation Buttons */}
// //       <div className="member-buttons">

// //         <Link to="/member/view-books" className="nav-btn">
// //           View Books
// //         </Link>

// //         <Link to="/member/my-books" className="nav-btn">
// //           My Books
// //         </Link>

// //       </div>

// //       {/* Page Content */}
// //       <div className="member-content">
// //         <Routes>
// //           <Route index element={<MemberDashboard />} />
// //           <Route path="view-books" element={<Seebooks />} />
// //           <Route path="my-books" element={<MyBooks />} />
// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MemberLayout;

// // import { Routes, Route, Link, useNavigate } from "react-router-dom";
// // import MemberDashboard from "./MemberDashboard";
// // import Seebooks from "./Seebooks";
// // import MyBooks from "./MyBooks";
// // import "./Memberlayout.css";

// // function MemberLayout() {

// //   const navigate = useNavigate();
// //   const name = localStorage.getItem("user_name");

// //   const handleLogout = () => {

// //     fetch("http://127.0.0.1:8000/api/logout/", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json"
// //       }
// //     })
// //     .then(res => res.json())
// //     .then(data => {

// //       alert(data.message);

// //       localStorage.removeItem("user_id");
// //       localStorage.removeItem("user_name");

// //       navigate("/");
// //     });

// //   };

// //   return (
// //     <div className="member-container">

// //       {/* Header */}
// //       <div className="member-header">
// //         <h2>Welcome {name} to Member Dashboard</h2>
// //       </div>

// //       {/* Navigation Buttons */}
// //       <div className="member-buttons">

// //         <Link to="/member/view-books" className="nav-btn">
// //           View Books
// //         </Link>

// //         <Link to="/member/my-books" className="nav-btn">
// //           My Books
// //         </Link>

// //         <button className="logout-btn" onClick={handleLogout}>
// //           Logout
// //         </button>

// //       </div>

// //       {/* Page Content */}
// //       <div className="member-content">
// //         <Routes>
// //           <Route index element={<MemberDashboard />} />
// //           <Route path="view-books" element={<Seebooks />} />
// //           <Route path="my-books" element={<MyBooks />} />
// //         </Routes>
// //       </div>

// //     </div>
// //   );
// // }

// // export default MemberLayout;


// import { Routes, Route, Link, useNavigate } from "react-router-dom";
// import MemberDashboard from "./MemberDashboard";
// import Seebooks from "./Seebooks";
// import MyBooks from "./MyBooks";
// import "./Memberlayout.css";

// function MemberLayout() {

//   const navigate = useNavigate();
//   const name = localStorage.getItem("user_name");

//   const handleLogout = () => {

//     fetch("http://127.0.0.1:8000/api/logout/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     .then(res => res.json())
//     .then(data => {

//       alert(data.message);

//       localStorage.removeItem("user_id");
//       localStorage.removeItem("user_name");

//       navigate("/");
//     });

//   };

//   return (
//     <div className="member-container">

//       {/* Header */}
//       <div className="member-header">
//         <h2>Welcome {name} to Member Dashboard</h2>
//       </div>

//       {/* Navigation Buttons */}
//       <div className="member-buttons">

//         <Link to="/member/view-books" className="nav-btn">
//           View Books
//         </Link>

//         <Link to="/member/my-books" className="nav-btn">
//           My Books
//         </Link>
//         <Link to="/member/donate-book" className="nav-btn">
//         Donate Book
//         </Link>

//         <button className="nav-btn" onClick={handleLogout}>
//           Logout
//         </button>

//       </div>

//       {/* Page Content */}
//       <div className="member-content">
//         <Routes>
//           <Route index element={<MemberDashboard />} />
//           <Route path="view-books" element={<Seebooks />} />
//           <Route path="my-books" element={<MyBooks />} />
//           <Route path="donate-book" element={<DonateBook />} />
//         </Routes>
//       </div>

//     </div>
//   );
// }

// export default MemberLayout;

// MemberLayout.jsx
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import MemberDashboard from "./MemberDashboard";
import Seebooks from "./Seebooks";
import MyBooks from "./MyBooks";
import DonateBook from "./DonateBook"; // ✅ import donate book
import "./Memberlayout.css";

function MemberLayout() {
  const navigate = useNavigate();
  const name = localStorage.getItem("user_name");

  const handleLogout = () => {
    fetch("https://fullstackproject1-1l7d.onrender.com/api/logout/", {
      method: "POST",
      headers: { "Content-Type": "application/json" }
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
    <div className="member-container">
      <div className="member-header">
        <h2>Welcome {name} to Member Dashboard</h2>
      </div>

      <div className="member-buttons">
        <Link to="/member/view-books" className="nav-btn">View Books</Link>
        <Link to="/member/my-books" className="nav-btn">My Books</Link>
        <Link to="/member/donate-book" className="nav-btn">Donate Book</Link> {/* ✅ New button */}
        <button className="nav-btn logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      <div className="member-content">
        <Routes>
          <Route index element={<MemberDashboard />} />
          <Route path="view-books" element={<Seebooks />} />
          <Route path="my-books" element={<MyBooks />} />
          <Route path="donate-book" element={<DonateBook />} /> {/* ✅ Route */}
        </Routes>
      </div>
    </div>
  );
}

export default MemberLayout;