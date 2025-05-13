function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2>Our Current Projects</h2>
        <div className="project-cards">
          <div className="project-card">
            <img
              src="https://via.placeholder.com/400x250?text=Clean+Water"
              alt="Clean Water Project"
            />
            <div className="project-info">
              <h3>Hidroponik feat UEM</h3>
              <p>
                mengkondisikan Barudak biar punya usaha hodroponik yg
                sustainable cerintanya bang.
              </p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: "75%" }}></div>
                <span>75% funded</span>
              </div>
              <button className="btn-primary">Support This Project</button>
            </div>
          </div>
          <div className="project-card">
            <img
              src="https://via.placeholder.com/400x250?text=Education"
              alt="Education Project"
            />
            <div className="project-info">
              <h3>Acara 17 Agustusan</h3>
              <p>Nya kitu we lah, ngaranage barudak.</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: "45%" }}></div>
                <span>45% funded</span>
              </div>
              <button className="btn-primary">Support This Project</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
