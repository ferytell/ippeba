import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          Ippeba<span>Connect</span>
        </Link>
        {/* <a href="#home" className="logo">
          Ippeba<span>Connect</span>
        </a> */}
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
          <button className="btn-primary">Join Us</button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
