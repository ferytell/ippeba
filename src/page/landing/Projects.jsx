import { Link } from "react-router-dom";

function Projects() {
  // const navigate = useNavigate();

  const handleLinkClick = (e) => {
    console.log("Link clicked");
    console.log("Current pathname:", window.location.pathname);
    console.log("Link target:", e.target.href);

    // Check if navigation is working
    // navigate("/usaha-ekonomi-mesjid");
    console.log("Navigation function called");
  };

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
              <button className="btn-primary">Support</button>
            </div>
          </div>
          <div className="project-card">
            <img
              src="https://minio.ferytell.site/api/v1/download-shared-object/aHR0cDovL21pbmlvLWFwaS5mZXJ5dGVsbC5zaXRlL3B1YmxpYy1idWNrL2NsZWFuX3dhdGVyLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUVTOEY0QjRQRVFWUVZFM1hWWEdUJTJGMjAyNTExMTElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUxMTExVDE4NTE1MVomWC1BbXotRXhwaXJlcz00MzIwMCZYLUFtei1TZWN1cml0eS1Ub2tlbj1leUpoYkdjaU9pSklVelV4TWlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKaFkyTmxjM05MWlhraU9pSkZVemhHTkVJMFVFVlJWbEZXUlROWVZsaEhWQ0lzSW1WNGNDSTZNVGMyTWpreU9Ea3dNU3dpY0dGeVpXNTBJam9pYldsdWFXOWhaRzFwYmlKOS5KRkc4bDA1bFVFVk1QRm1ycmUwWF9uT3huOWZ3T19SQVR0OGU0cjFJY1BSckFpVzRRc2pvWGw0bW5BYjdVS2NDWklHZGhjWk15Z1Fhdkh5XzZpalJOZyZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPWQ0MTUzZWZlZTU2ZTA5MzU5NmMzNmQ1NDllNTQwMjUxNzZjN2YyNGRkYWE3NzU3MDE2MGNkNDg1N2IzYTA4Njg"
              alt="17 an"
            />
            <div className="project-info">
              <h3>Acara 17 Agustusan</h3>
              <p>Nya kitu we lah, ngaranage barudak.</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: "45%" }}></div>
                <span>45% funded</span>
              </div>
              <button className="btn-primary">Support</button>
            </div>
          </div>
          <div className="project-card">
            <img
              src="https://minio.ferytell.site/api/v1/download-shared-object/aHR0cDovL21pbmlvLWFwaS5mZXJ5dGVsbC5zaXRlL3B1YmxpYy1idWNrL2VkdWNhdGlvbi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1FUzhGNEI0UEVRVlFWRTNYVlhHVCUyRjIwMjUxMTExJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MTExMVQxODUxMjhaJlgtQW16LUV4cGlyZXM9NDMxOTkmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUpGVXpoR05FSTBVRVZSVmxGV1JUTllWbGhIVkNJc0ltVjRjQ0k2TVRjMk1qa3lPRGt3TVN3aWNHRnlaVzUwSWpvaWJXbHVhVzloWkcxcGJpSjkuSkZHOGwwNWxVRVZNUEZtcnJlMFhfbk94bjlmd09fUkFUdDhlNHIxSWNQUnJBaVc0UXNqb1hsNG1uQWI3VUtjQ1pJR2RoY1pNeWdRYXZIeV82aWpSTmcmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JnZlcnNpb25JZD1udWxsJlgtQW16LVNpZ25hdHVyZT1kZWJhYmMxZmNiZDQ5YzY0NzkyYTRhMmQwNWNjOTZiMmM3Y2JjMzNjYWQ2YTIwNjA1YmEyYTgyYWQ5N2MzNThi"
              alt="UEM"
            />
            <div className="project-info">
              <h3>Usaha Eonomi Mesjid</h3>
              <p>B2B tanpa bunga.</p>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: "45%" }}></div>
                <span>45% funded</span>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="btn-primary">Support</button>
                <Link
                  to="/usaha-ekonomi-mesjid"
                  className="btn-primary"
                  onClick={handleLinkClick}
                >
                  Lebih Lanjut
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Projects;
