import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./page/landing/Navigation";
import Hero from "./page/landing/Hero";
import About from "./page/landing/About";
import Projects from "./page/landing/Projects";
import Events from "./page/landing/Events";
import Contact from "./page/landing/Contact";
import Footer from "./page/landing/Footer";
import UsahaEkonomiMesjid from "./page/projects/uem/UsahaEkonomiMesjid";
import Login from "./components/Login";
import "./App.css";

// Layout component
const Layout = ({ children }) => {
  return (
    <div className="App">
      <Navigation />
      {children}
      <Footer />
    </div>
  );
};

// Landing page component
const LandingPage = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Events />
      <Contact />
    </>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const handleAuthSuccess = () => {
    console.log("✅ Auth success!");
    setIsAuthenticated(true);
  };

  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <LandingPage />
            </Layout>
          }
        />
        <Route
          path="/usaha-ekonomi-mesjid"
          element={
            <Layout>
              <UsahaEkonomiMesjid isAuthenticated={isAuthenticated} />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login onLoginSuccess={handleAuthSuccess} />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

// import React from "react";
// import "./App.css";
// import Navigation from "./page/landing/Navigation";
// import Hero from "./page/landing/Hero";
// import About from "./page/landing/About";
// import Projects from "./page/landing/Projects";
// import Events from "./page/landing/Events";
// import Contact from "./page/landing/Contact";
// import Footer from "./page/landing/Footer";

// function App() {
//   return (
//     <div className="App">
//       {/* Navigation */}
//       <Navigation />
//       {/* Hero Section */}
//       <Hero />
//       {/* About Section */}
//       <About />
//       {/* Projects Section */}
//       <Projects />
//       {/* Events Section */}
//       <Events />

//       {/* Contact Section */}
//       <Contact />

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// }

// export default App;
