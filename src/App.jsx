import React from "react";
import "./App.css";
import Navigation from "./page/Navigation";
import Hero from "./page/Hero";
import About from "./page/About";
import Projects from "./page/Projects";
import Events from "./page/Events";
import Contact from "./page/Contact";
import Footer from "./page/Footer";

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <Navigation />
      {/* Hero Section */}
      <Hero />
      {/* About Section */}
      <About />
      {/* Projects Section */}
      <Projects />
      {/* Events Section */}
      <Events />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
