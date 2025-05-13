function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              <strong>Address:</strong> Trunamanggala, Cimalaka, Sumedang
              Regency, West Java
            </p>
            <p>
              <strong>Phone:</strong> +62 (123) 456-7890
            </p>
            <p>
              <strong>Email:</strong> ippeba@email.org
            </p>
            <div className="social-links">
              <a href="https://www.facebook.com/feryfox.bhc?locale=id_ID">
                Facebook
              </a>
              <a href="https://x.com/memefess/status/1922202104132993489">
                Twitter
              </a>
              <a href="https://www.instagram.com/ferytell_/">Instagram</a>
            </div>
          </div>
          <form className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea placeholder="Your Message" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
