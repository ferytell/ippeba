import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Provider as JotaiProvider } from "jotai";

import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme"; // Your custom theme
import Navigation from "./page/landing/Navigation";
import Hero from "./page/landing/Hero";
import About from "./page/landing/About";
import Projects from "./page/landing/Projects";
import Events from "./page/landing/Events";
import Contact from "./page/landing/Contact";
import Footer from "./page/landing/Footer";
import UsahaEkonomiMesjid from "./page/projects/uem/UsahaEkonomiMesjid";
import Login from "./components/Login";
import "./App.css"; // Keep for now, we'll remove gradually

// Layout component - Updated
const Layout = ({ children }) => {
  return (
    <div className="App">
      <Navigation />
      <div style={{ marginTop: "64px" }}>
        {" "}
        {/* Space for fixed AppBar */}
        {children}
      </div>
      <Footer />
    </div>
  );
};

// Landing page component - Keep as is for now
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

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    console.log("✅ Auth success!");
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS to match MUI */}
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
    </ThemeProvider>
  );
}

function App() {
  return (
    <JotaiProvider>
      <AppContent />
    </JotaiProvider>
  );
}

export default App;

// import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navigation from "./page/landing/Navigation";
// import Hero from "./page/landing/Hero";
// import About from "./page/landing/About";
// import Projects from "./page/landing/Projects";
// import Events from "./page/landing/Events";
// import Contact from "./page/landing/Contact";
// import Footer from "./page/landing/Footer";
// import UsahaEkonomiMesjid from "./page/projects/uem/UsahaEkonomiMesjid";
// import Login from "./components/Login";
// import "./App.css";

// // Layout component
// const Layout = ({ children }) => {
//   return (
//     <div className="App">
//       <Navigation />
//       {children}
//       <Footer />
//     </div>
//   );
// };

// // Landing page component
// const LandingPage = () => {
//   return (
//     <>
//       <Hero />
//       <About />
//       <Projects />
//       <Events />
//       <Contact />
//     </>
//   );
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const handleAuthSuccess = () => {
//     console.log("✅ Auth success!");
//     setIsAuthenticated(true);
//   };

//   return (
//     <Router basename="/">
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Layout>
//               <LandingPage />
//             </Layout>
//           }
//         />
//         <Route
//           path="/usaha-ekonomi-mesjid"
//           element={
//             <Layout>
//               <UsahaEkonomiMesjid isAuthenticated={isAuthenticated} />
//             </Layout>
//           }
//         />
//         <Route
//           path="/login"
//           element={
//             <Layout>
//               <Login onLoginSuccess={handleAuthSuccess} />
//             </Layout>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
