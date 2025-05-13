function Events() {
  return (
    <section id="events" className="events">
      <div className="container">
        <h2>Upcoming Events</h2>
        <div className="event-cards">
          <div className="event-card">
            <div className="event-date">
              <span className="day">15</span>
              <span className="month">June</span>
            </div>
            <div className="event-details">
              <h3>Village Clean-Up Day</h3>
              <p>
                Join us for a community-wide effort to clean and beautify our
                village.
              </p>
              <button className="btn-secondary">RSVP</button>
            </div>
          </div>
          <div className="event-card">
            <div className="event-date">
              <span className="day">22</span>
              <span className="month">June</span>
            </div>
            <div className="event-details">
              <h3>Farmers Market</h3>
              <p>Support local farmers and artisans at our monthly market.</p>
              <button className="btn-secondary">RSVP</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Events;
