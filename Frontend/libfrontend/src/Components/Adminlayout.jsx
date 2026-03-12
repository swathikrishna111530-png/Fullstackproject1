// import { Routes, Route } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";
// import Dashboard from "./Dashboard";
// import AddBook from "./AddBook";
// import ManageBooks from "./ManageBooks";
// import ApproveMembers from "./ApproveMembers";
// import IssueBook from "./IssueBook";
// import  ApproveDonatedBooks from "./ApproveDonate"


// import "./Adminlayout.css";

// function AdminLayout() {
//   return (
//     <div className="admin-container">
//       <Sidebar />

//       <div className="admin-main">
//         <Navbar />

//         <div className="admin-content">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="add-book" element={<AddBook />} />
//             <Route path="manage-books" element={<ManageBooks />} />
//             <Route path="approve-members" element={<ApproveMembers />} />
//             <Route path="issue-book" element={<IssueBook />} />
//             <Route path="approve-donations" element={<ApproveDonatedBooks />} />
        
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;


import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import AddBook from "./AddBook";
import ManageBooks from "./ManageBooks";
import ApproveMembers from "./ApproveMembers";
import IssueBook from "./IssueBook";
import ApproveDonatedBooks from "./ApproveDonate";

import "./Adminlayout.css";

function AdminLayout() {
  return (
    <div className="admin-container">
      <Sidebar />

      <div className="admin-main">
        <Navbar />

        <div className="admin-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="add-book" element={<AddBook />} />
            <Route path="manage-books" element={<ManageBooks />} />
            <Route path="approve-members" element={<ApproveMembers />} />
            <Route path="issue-book" element={<IssueBook />} />
            <Route path="approve-donations" element={<ApproveDonatedBooks />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;