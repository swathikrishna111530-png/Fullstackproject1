// // // 


// // import { Routes, Route, Navigate } from "react-router-dom";

// // import Home from "./Pages/Home";
// // import Login from "./Pages/Login";
// // import BooksPage from "./Pages/BookPage";
// // import Register from "./Pages/Register";

// // /* 👑 Admin Layout */
// // import Adminlayout from "./Components/Adminlayout";

// // /* 👤 Member Layout */
// // import MemberLayout from "./Components/MemberLayout";

// // /* 🔒 Protected Route for Admin */
// // const ProtectedAdmin = ({ children }) => {
// //   const role = localStorage.getItem("role"); // role stored on login
// //   if (!role || role !== "admin") return <Navigate to="/login" />;
// //   return children;
// // };

// // /* 🔒 Protected Route for Members */
// // const ProtectedMember = ({ children }) => {
// //   const role = localStorage.getItem("role");
// //   if (!role || role !== "member") return <Navigate to="/login" />;
// //   return children;
// // };

// // function App() {
// //   return (
// //     <Routes>
// //       {/* 🌐 Public Pages */}
// //       <Route path="/" element={<Home />} />
// //       <Route path="/books" element={<BooksPage />} />
// //       <Route path="/login" element={<Login />} />
// //       <Route path="/register" element={<Register />} />

// //       {/* 👑 Admin Dashboard (Protected) */}
// //       <Route
// //         path="/dashboard/*"
// //         element={
// //           <ProtectedAdmin>
// //             <Adminlayout />
// //           </ProtectedAdmin>
// //         }
// //       />

// //       {/* 👤 Member Dashboard (Protected) */}
// //       <Route
// //         path="/member/*"
// //         element={
// //           <ProtectedMember>
// //             <MemberLayout />
// //           </ProtectedMember>
// //         }
// //       />
// //     </Routes>
// //   );
// // }

// // export default App;


// import { Routes, Route, Navigate } from "react-router-dom";

// import Home from "./Pages/Home";
// import Login from "./Pages/Login";
// import BooksPage from "./Pages/BookPage"; // make sure the filename matches
// import BookDetail from "./Pages/BookDetail"; // new detail page
// import Register from "./Pages/Register"; // fix typo

// /* 👑 Admin Layout */
// import Adminlayout from "./Components/Adminlayout";

// /* 👤 Member Layout */
// import MemberLayout from "./Components/MemberLayout";

// /* 🔒 Protected Route for Admin */
// const ProtectedAdmin = ({ children }) => {
//   const role = localStorage.getItem("role"); 
//   if (!role || role !== "admin") return <Navigate to="/login" />;
//   return children;
// };

// /* 🔒 Protected Route for Members */
// const ProtectedMember = ({ children }) => {
//   const role = localStorage.getItem("role");
//   if (!role || role !== "member") return <Navigate to="/login" />;
//   return children;
// };

// function App() {
//   return (
//     <Routes>
//       {/* 🌐 Public Pages */}
//       <Route path="/" element={<Home />} />
//       <Route path="/books" element={<BooksPage />} />
//       <Route path="/books/:id" element={<BookDetail />} /> {/* Book detail route */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* 👑 Admin Dashboard (Protected) */}
//       <Route
//         path="/dashboard/*"
//         element={
//           <ProtectedAdmin>
//             <Adminlayout />
//           </ProtectedAdmin>
//         }
//       />

//       {/* 👤 Member Dashboard (Protected) */}
//       <Route
//         path="/member/*"
//         element={
//           <ProtectedMember>
//             <MemberLayout />
//           </ProtectedMember>
//         }
//       />
//     </Routes>
//   );
// }

// export default App;


import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import BookPage from "./Pages/BookPage";
import BookDetail from "./Pages/BookDetail";

/* 👑 Admin Layout */
import Adminlayout from "./Components/Adminlayout";

/* 👤 Member Layout */
import MemberLayout from "./Components/MemberLayout";

/* 🔒 Protected Route for Admin */
const ProtectedAdmin = ({ children }) => {
  const role = localStorage.getItem("role");
  if (!role || role !== "admin") return <Navigate to="/login" />;
  return children;
};

/* 🔒 Protected Route for Members */
const ProtectedMember = ({ children }) => {
  const role = localStorage.getItem("role");
  if (!role || role !== "member") return <Navigate to="/login" />;
  return children;
};

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookPage />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedAdmin>
            <Adminlayout />
          </ProtectedAdmin>
        }
      />

      {/* Member Dashboard */}
      <Route
        path="/member/*"
        element={
          <ProtectedMember>
            <MemberLayout />
          </ProtectedMember>
        }
      />
    </Routes>
  );
}

export default App;