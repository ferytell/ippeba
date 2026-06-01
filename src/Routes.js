// import React from "react";
// import { Routes, Route } from "react-router-dom";
// //import LandingPage from "./page/landing/LandingPage";
// import UsahaEkonomiMesjid from "./page/projects/uem/UsahaEkonomiMesjid";
// import Navigation from "./page/landing/Navigation";
// import Hero from "./page/landing/Hero";
// import About from "./page/landing/About";
// import Projects from "./page/landing/Projects";
// import Events from "./page/landing/Events";
// import Contact from "./page/landing/Contact";
// import Footer from "./page/landing/Footer";

// // Create a Layout component for pages that need the same structure
// const Layout = ({ children }) => {
//   return (
//     <div className="App">
//       {/* Navigation appears on every page */}
//       <Navigation />
//       {children}
//       {/* Footer appears on every page */}
//       <Footer />
//     </div>
//   );
// };

// // Create a LandingPage component that contains all your landing sections
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

// // Main Routes component
// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Home route with full layout */}
//       <Route
//         path="/"
//         element={
//           <Layout>
//             <LandingPage />
//           </Layout>
//         }
//       />

//       {/* Individual page routes */}
//       <Route
//         path="/usaha-ekonomi-mesjid"
//         element={
//           <Layout>
//             <UsahaEkonomiMesjid />
//           </Layout>
//         }
//       />

//       {/* Add more routes here as you create new pages */}
//     </Routes>
//   );
// };

// export default AppRoutes;
