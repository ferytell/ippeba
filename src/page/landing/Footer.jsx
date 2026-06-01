function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-about">
            <h3>VillageConnect</h3>
            <p>
              Empowering our village through community-driven initiatives and
              sustainable development.
            </p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#projects">Projects</a>
              </li>
              <li>
                <a href="#events">Events</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <form>
              <input type="email" placeholder="Your Email" />
              <button type="submit" className="btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; {new Date().getFullYear()} VillageConnect. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
