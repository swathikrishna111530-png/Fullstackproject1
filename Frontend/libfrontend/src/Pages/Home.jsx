// import { Link } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   return (
//     <div className="home-container">
//       <div className="home-card">
//         <h1>Library Management System</h1>
//         <p>
//           Manage books, members, and library activities efficiently.
//         </p>

//         <div className="home-buttons">
//           <Link to="/login">
//             <button className="login-btn">Login</button>
//           </Link>

//           <Link to="/register">
//             <button className="register-btn">Register</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;

// import { Link } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   return (
//     <div className="home-container">

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">📚 City Central Library</div>

//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           <a href="#about">About</a>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Sign In</Link>
//         </div>
//       </nav>

//       {/* Books Section */}
//       <section className="books-section">
//         <h2>Books Available in Our Library</h2>

//         <div className="book-cards">
//           <div className="book-card">
//             <img src="https://covers.openlibrary.org/b/id/8228691-L.jpg" alt="book" />
//             <p>Python Programming</p>
//           </div>

//           <div className="book-card">
//             <img src="https://covers.openlibrary.org/b/id/10523338-L.jpg" alt="book" />
//             <p>Data Science Basics</p>
//           </div>

//           <div className="book-card">
//             <img src="https://covers.openlibrary.org/b/id/10594765-L.jpg" alt="book" />
//             <p>Web Development</p>
//           </div>
//         </div>
//       </section>

//       {/* About Section */}
//       <section id="about" className="about-section">
//         <h2>About Our Library</h2>
//         <p>
//           Our library provides a wide range of academic and professional books.
//           We aim to promote learning and knowledge sharing among students.
//         </p>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>📍 City Central Library, MG Road, Trichur, Kerala</p>
//         <p>📞 +91 9876543210 | ✉ library@email.com</p>
//       </footer>

//     </div>
//   );
// }

// export default Home;

// import { Link } from "react-router-dom";
// import "./Home.css";

// function Home() {
//   const quotes = [
//     "“A reader lives a thousand lives before he dies.” – George R.R. Martin",
//     "“The more that you read, the more things you will know.” – Dr. Seuss",
//     "“Reading is essential for those who seek to rise above the ordinary.” – Jim Rohn",
//     "“Once you learn to read, you will be forever free.” – Frederick Douglass",
//     "“Books are a uniquely portable magic.” – Stephen King"
//   ];

//   return (
//     <div className="home-container">

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">📚 City Central Library</div>
//         <div className="nav-links">
//           <Link to="/">Home</Link>
//           <a href="#about">About</a>
//           <Link to="/login">Login</Link>
//           <Link to="/register">Sign In</Link>
//         </div>
//       </nav>

//       {/* Quotes Section */}
//       <section className="quotes-section">
//         <h2>Inspiring Quotes About Reading</h2>
//         <ul>
//           {quotes.map((quote, index) => (
//             <li key={index} className="quote-item">"{quote}"</li>
//           ))}
//         </ul>
//       </section>

//       {/* About Section */}
//       <section id="about" className="about-section">
//         <h2>About Our Library</h2>
//         <p>
//           Our library provides a wide range of academic and professional books.
//           We aim to promote learning and knowledge sharing among students.
//         </p>
//       </section>

//       {/* Footer */}
//       <footer className="footer">
//         <p>📍 City Central Library, MG Road, Trichur, Kerala</p>
//         <p>📞 +91 9876543210 | ✉ library@email.com</p>
//       </footer>

//     </div>
//   );
// }

// export default Home;

import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const quotes = [
    "A reader lives a thousand lives before he dies. – George R.R. Martin",
    "The more that you read, the more things you will know. – Dr. Seuss",
    "Reading is essential for those who seek to rise above the ordinary. – Jim Rohn",
    "Once you learn to read, you will be forever free. – Frederick Douglass",
    "Books are a uniquely portable magic. – Stephen King"
  ];

  return (
    <div className="home-container">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">📚 City Central Library</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <a href="#about">About</a>
          <Link to="/login">Login</Link>
          <Link to="/register">Sign In</Link>
        </div>
      </nav>

      {/* Quotes Section */}
      <section className="quotes-section">
        <h2>Inspiring Quotes About Reading</h2>
        <div className="quote-cards">
          {quotes.map((quote, index) => (
            <div key={index} className="quote-card">
              <p>“{quote}”</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Our Library</h2>
        <p>
          Our library provides a wide range of academic and professional books.
          We aim to promote learning and knowledge sharing among students.
        </p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>📍 City Central Library, MG Road, Trichur, Kerala</p>
        <p>📞 +91 9876543210 | ✉ library@email.com</p>
      </footer>

    </div>
  );
}

export default Home;