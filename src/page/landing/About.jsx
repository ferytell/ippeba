function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2>About Our Organization</h2>
        <div className="about-grid">
          <div className="about-card">
            <div className="icon">🏡</div>
            <h3>Community Focused</h3>
            <p>
              We prioritize the needs of our village residents in all our
              initiatives.
            </p>
          </div>
          <div className="about-card">
            <div className="icon">🌱</div>
            <h3>Sustainable Development</h3>
            <p>
              Our projects focus on long-term benefits for the environment and
              economy.
            </p>
          </div>
          <div className="about-card">
            <div className="icon">👥</div>
            <h3>Inclusive Participation</h3>
            <p>Every villager has a voice in our decision-making processes.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
