
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