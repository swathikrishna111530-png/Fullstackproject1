// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom"; // Import Link
// import "./Login.css";

// function Login() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch("http://127.0.0.1:8000/api/login/", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.error) {
//           alert(data.error);
//         } else {
//           localStorage.setItem("email", formData.email);
//           localStorage.setItem("role", data.role);
//           localStorage.setItem("user_id", data.user_id);

//           if (data.role === "admin") navigate("/dashboard");
//           else navigate("/member");
//         }
//       })
//       .catch(() => alert("Login failed, check backend"));
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Login</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>

//         {/* Link back to homepage */}
//         <div style={{ marginTop: "15px", textAlign: "center" }}>
//           <Link to="/" style={{ color: "#3498db", textDecoration: "none" }}>
//             ← Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();   // ⭐ added

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://fullstackproject1-1l7d.onrender.com/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          localStorage.setItem("email", formData.email);
          localStorage.setItem("role", data.role);
          localStorage.setItem("user_id", data.user_id);

          // ⭐ check where user came from
          const redirectPath = location.state?.from;

          if (redirectPath) {
            navigate(redirectPath);
          } 
          else if (data.role === "admin") {
            navigate("/dashboard");
          } 
          else {
            navigate("/member");
          }
        }
      })
      .catch(() => alert("Login failed, check backend"));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/" style={{ color: "#3498db", textDecoration: "none" }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;